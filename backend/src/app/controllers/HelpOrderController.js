import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class HelpOrderController {
  async indexUnanswered(req, res) {
    const { page = 1, per_page = 5 } = req.query;

    const { rows: unanswered, count } = await HelpOrder.findAndCountAll({
      where: {
        answer: null,
      },
      limit: per_page,
      offset: (page - 1) * per_page,
      attributes: ['id', 'student_id', 'question', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.set({ num_pages: Math.ceil(count / per_page) }).json(unanswered);
  }

  async indexByUser(req, res) {
    const { page = 1, per_page = 5 } = req.query;
    const { id: student_id } = req.params;

    const { rows: helpOrders, count } = await HelpOrder.findAndCountAll({
      where: { student_id },
      order: [['created_at', 'DESC']],
      offset: (page - 1) * per_page,
      limit: per_page,
      attributes: ['id', 'student_id', 'question', 'created_at', 'answer'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.set({ num_pages: Math.ceil(count / per_page) }).json(helpOrders);
  }

  async storeQuestion(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id: student_id } = req.params;

    const enrolled = await Enrollment.findOne({
      where: {
        student_id,
        start_date: { [Op.lte]: startOfDay(new Date()) },
        end_date: { [Op.gt]: endOfDay(new Date()) },
      },
    });

    if (!enrolled) {
      return res
        .status(401)
        .json({ error: 'The student does not have an active subscription' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: parseInt(student_id),
      question: req.body.question,
    });

    return res.json(helpOrder);
  }

  async storeAnswer(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const enrolled = await Enrollment.findOne({
      where: {
        student_id: helpOrder.student_id,
        start_date: {
          [Op.lte]: startOfDay(new Date()),
        },
        end_date: {
          [Op.gt]: endOfDay(new Date()),
        },
      },
    });

    if (!enrolled) {
      return res.status(401).json({ error: 'Student is no longer enrolled' });
    }

    const { answer } = req.body;

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();

    helpOrder.save();

    await Queue.add(AnswerMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();

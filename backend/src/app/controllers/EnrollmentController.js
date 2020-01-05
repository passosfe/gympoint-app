import * as Yup from 'yup';
import { parseISO, addMonths, startOfDay, endOfDay, isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Subscription from '../models/Subscription';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

class EnrollmentController {
  async index(req, res) {
    const { page = 1, per_page = 5 } = req.query;

    const { rows: enrollments, count } = await Enrollment.findAndCountAll({
      where: {
        canceled_at: null,
      },
      order: ['end_date'],
      offset: (page - 1) * per_page,
      limit: per_page,
      attributes: ['id', 'start_date', 'end_date', 'price', 'is_valid'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res
      .set({ num_pages: Math.ceil(count / per_page) })
      .json(enrollments);
  }

  async get(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const parsedStartDate = startOfDay(parseISO(start_date));

    const enrolled = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (enrolled && !enrolled.canceled_at) {
      return res.status(401).json({ error: 'The student is already enrolled' });
    }

    const subscription = await Subscription.findByPk(plan_id);

    const end_date = endOfDay(
      addMonths(parsedStartDate, subscription.duration)
    );

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price: subscription.total_price,
    });

    const enrollmentData = await Enrollment.findByPk(enrollment.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['title', 'price'],
        },
      ],
    });

    await Queue.add(WelcomeMail.key, {
      enrollment: enrollmentData,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    const { start_date, student_id } = req.body;

    const parsedStartDate = startOfDay(parseISO(start_date));

    if (isBefore(parsedStartDate, enrollment.end_date)) {
      return res.status(401).json({
        error: 'The student already has a valid enrollment for that period',
      });
    }

    const { plan_id = enrollment.plan_id } = req.body;

    const subscription = await Subscription.findByPk(plan_id);

    const end_date = endOfDay(
      addMonths(parsedStartDate, subscription.duration)
    );

    await enrollment.update({
      plan_id,
      student_id,
      start_date: parsedStartDate,
      end_date,
      price: subscription.total_price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      attributes: ['id', 'price', 'canceled_at', 'is_valid', 'end_date'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    enrollment.canceled_at = new Date();

    await enrollment.save();

    await Queue.add(CancellationMail.key, {
      enrollment,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();

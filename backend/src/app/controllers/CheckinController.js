import { Op } from 'sequelize';
import { startOfDay, subDays, isBefore } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const student_id = parseInt(req.params.id);
    const { page = 1, per_page = 10 } = req.query;

    const { rows: checkins, count } = await Checkin.findAndCountAll({
      where: {
        student_id,
      },
      offset: (page - 1) * per_page,
      limit: per_page,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'student_id', 'createdAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res
      .set({ num_pages: Math.ceil(count / per_page), count })
      .json(checkins);
  }

  async store(req, res) {
    const student_id = parseInt(req.params.id);

    const enrolled = await Enrollment.findOne({
      where: {
        student_id,
        end_date: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!enrolled) {
      return res
        .status(401)
        .json({ error: "The student doesn't have a valid enrollment" });
    }

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.gt]: subDays(startOfDay(new Date()), 7),
        },
      },
    });

    if (checkins.count >= 5) {
      return res.status(401).json({
        error: 'The student can only checkin 5 times in a 7 days period',
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();

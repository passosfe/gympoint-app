import Enrollment from '../models/Enrollment';
import { Op } from 'sequelize';

export default async (req, res, next) => {
  const { id } = req.params;

  const student = await Enrollment.findOne({
    where: {
      student_id: id,
      canceled_at: null,
      start_date: {
        [Op.lt]: new Date(),
      },
      end_date: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!student) {
    return res.status(400).json({ error: 'The student is not enrolled' });
  }

  return next();
};

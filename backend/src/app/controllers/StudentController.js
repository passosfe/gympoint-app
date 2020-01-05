import * as Yup from 'yup';
import Student from '../models/Student';

import { Op } from 'sequelize';

class StudentController {
  async index(req, res) {
    const { page = 1, per_page = 5, name = '' } = req.query;

    const { rows: students, count } = await Student.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { email: { [Op.iLike]: `%${name}%` } },
        ],
      },
      offset: (page - 1) * per_page,
      limit: per_page,
      order: [['updated_at', 'DESC']],
    });

    return res.set({ num_pages: Math.ceil(count / per_page) }).json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const exists = await Student.findOne({ where: { email } });

    if (exists) {
      return res.status(401).json({ error: 'Student already exists' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      new_email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { new_email } = req.body;

    if (new_email) {
      const new_email_exists = await Student.findOne({
        where: { email: new_email },
      });

      if (new_email_exists) {
        return res.status(401).json({ error: 'E-mail already exists' });
      }
    }

    req.body.email = req.body.new_email;

    const { id, name, email, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async get(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Student.destroy({ where: { id } });

    res.json({ response: 'Student deleted successfully' });
  }
}

export default new StudentController();

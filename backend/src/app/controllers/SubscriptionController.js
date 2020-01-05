import * as Yup from 'yup';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const { page = 1, per_page = 5, name: title = '' } = req.query;

    const { rows: subscriptions, count } = await Subscription.findAndCountAll({
      where: {
        discontinued_at: null,
        title: { [Op.iLike]: `%${title}%` },
      },
      offset: (page - 1) * per_page,
      limit: per_page,
      order: ['duration'],
    });

    return res
      .set({ num_pages: Math.ceil(count / per_page) })
      .json(subscriptions);
  }

  async get(req, res) {
    const { id } = req.params;

    const subscription = await Subscription.findByPk(id);

    return res.json(subscription);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title } = req.body;

    const exists = await Subscription.findOne({ where: { title } });

    if (exists) {
      return res
        .status(401)
        .json({ error: 'This subscription type already exists' });
    }

    const { duration, price } = await Subscription.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title } = req.body;

    const subscription = await Subscription.findByPk(req.params.id);

    if (title && title !== subscription.title) {
      const exists = await Subscription.findOne({
        where: { title },
      });

      if (exists) {
        return res
          .status(401)
          .json({ error: `The ${title} subscription already exists` });
      }
    }

    const { duration, price } = await subscription.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    subscription.discontinued_at = new Date();

    await subscription.save();

    return res.json(subscription);
  }
}

export default new SubscriptionController();

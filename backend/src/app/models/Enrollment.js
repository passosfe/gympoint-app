import { isBefore, isAfter } from 'date-fns';

import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        canceled_at: Sequelize.DATE,
        is_valid: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              isAfter(this.end_date, new Date()) &&
              isBefore(this.start_date, new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Subscription, {
      foreignKey: 'plan_id',
      as: 'subscription',
    });
  }
}

export default Enrollment;

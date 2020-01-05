import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        discontinued_at: Sequelize.DATE,
        total_price: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.price * this.duration;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Subscription;

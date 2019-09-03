import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
                banner_id: Sequelize.INTEGER,
                user_id: Sequelize.INTEGER,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    }
                }
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, {
            through: 'meetup_user',
            as: 'users',
            foreignKey: 'meetup_id',
            timestamps: false
        });
    }
}

export default Meetup;

import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
                banner_id: Sequelize.INTEGER,
                user_id: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );

        return this;
    }
}

export default Meetup;

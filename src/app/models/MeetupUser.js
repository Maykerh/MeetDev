import Sequelize, { Model } from 'sequelize';

class MeetupUser extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.STRING,
                meetup_id: Sequelize.STRING
            },
            { timestamps: false, sequelize }
        );

        return this;
    }
}

export default MeetupUser;

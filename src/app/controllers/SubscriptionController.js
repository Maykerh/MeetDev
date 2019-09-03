import Meetup from '../models/Meetup';
import User from '../models/User';
import { differenceInHours, isEqual } from 'date-fns';
import MeetupValidations from '../validations/MeetupValidations';
import { Op } from 'sequelize';
import MeetupUser from '../models/MeetupUser';

class SubscriptionController {
    async store(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);

        if (meetup.user_id === req.userId) {
            return res.status(401).json({
                error: "Can't subscribe to a meetup where you're the owner"
            });
        }

        if (meetup.past) {
            return res
                .status(401)
                .json({ error: "Can't subscribe to a past meetup" });
        }

        const userMeetups = await Meetup.findAll({
            attributes: ['id', 'date'],
            where: {
                date: {
                    [Op.gte]: new Date()
                }
            },
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: [],
                    where: {
                        id: req.userId
                    }
                }
            ]
        });

        userMeetups.map(userMeetup => {
            if (userMeetup.id === meetup.id) {
                return res.status(401).json({
                    error: "Can't subscribe to the same meetup twice"
                });
            }

            if (differenceInHours(userMeetup.date, meetup.date) === 0) {
                return res.status(401).json({
                    error: "Can't subscribe to two meetups in the same hour"
                });
            }
        });

        const result = await meetup.setUsers(req.userId);

        if (!result) {
            return res.status(401).json({
                error:
                    'An error has ocurred with your subscription, please, try again'
            });
        }

        return res.json();
    }
}

module.exports = new SubscriptionController();

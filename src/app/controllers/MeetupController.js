import Meetup from '../models/Meetup';
import { isBefore } from 'date-fns';
import MeetupValidations from '../validations/MeetupValidations';

class MeetupController {
    async index(req, res) {
        const meetups = await Meetup.findAll({
            where: {
                user_id: req.userId
            }
        });

        return res.json(meetups);
    }

    async store(req, res) {
        await MeetupValidations.validateStore(req);

        if (MeetupValidations.getError()) {
            return MeetupValidations.sendError(res);
        }

        if (isBefore(req.body.date, new Date())) {
            return res
                .status(401)
                .json({ error: 'Past dates are not allowed' });
        }

        const { title, description, location, date, banner_id } = req.body;

        const meetup = await Meetup.create({
            title,
            description,
            location,
            date,
            banner_id,
            user_id: req.userId
        });

        return res.json(meetup);
    }

    async update(req, res) {
        await MeetupValidations.validateUpdate(req);

        if (MeetupValidations.getError()) {
            return MeetupValidations.sendError(res);
        }

        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            return res.status(404).json({ error: "Meetup doesn't exists" });
        }

        if (isBefore(meetup.date, new Date())) {
            return res.status(401).json({ error: "Can't edit past meetups" });
        }

        if (meetup.user_id != req.userId) {
            return res.status(401).json({
                error: "Can't edit meetups where you are not the owner"
            });
        }

        if (req.body.date && isBefore(req.body.date, new Date())) {
            return res
                .status(401)
                .json({ error: 'Past dates are not allowed' });
        }

        const {
            title,
            description,
            location,
            date,
            banner_id
        } = await meetup.update(req.body);

        return res.json({
            title,
            description,
            location,
            date,
            banner_id,
            user_id: req.userId
        });
    }

    async delete(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            return res.status(404).json({ error: "Meetup doesn't exists" });
        }

        if (isBefore(meetup.date, new Date())) {
            return res.status(401).json({ error: "Can't delete past meetups" });
        }

        if (meetup.user_id != req.userId) {
            return res.status(401).json({
                error: "Can't delete meetups where you are not the owner"
            });
        }

        meetup.destroy();

        return res.json();
    }
}

export default new MeetupController();

import Meetup from '../models/Meetup';
import { isBefore } from 'date-fns';
import MeetupValidations from '../validations/MeetupValidations';

class MeetupController {
    async index(req, res) {
        const meetups = await Meetup.findAll();

        return res.json(meetups);
    }

    async store(req, res) {
        await MeetupValidations.validateStore(req);

        if (MeetupValidations.getError()) {
            return MeetupValidations.sendError(res);
        }

        if (isBefore(new Date(), req.body.date)) {
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
}

export default new MeetupController();

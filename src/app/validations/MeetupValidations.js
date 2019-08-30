import * as Yup from 'yup';
import Validations from './Validations';

class MeetupValidations extends Validations {
    async validateStore(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            banner_id: Yup.number().integer()
        });

        req.body.date = new Date(req.body.date);

        await this.isValid(schema, req.body, res);
    }
}

export default new MeetupValidations();

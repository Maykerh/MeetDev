import * as Yup from 'yup';
import Validations from './Validations';

class SessionValidation extends Validations {
    async validateStore(req) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required()
        });

        await this.isValid(schema, req.body);
    }
}

export default new SessionValidation();

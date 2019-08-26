import * as Yup from 'yup';
import Validations from './Validations';

class UserValidation extends Validations {
    async validateStore(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        await this.isValid(schema, req.body, res);
    }

    async validateUpdate(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            actualPassword: Yup.string(),
            password: Yup.string().min(6)
        });

        await this.isValid(schema, req.body, res);
    }
}

export default new UserValidation();

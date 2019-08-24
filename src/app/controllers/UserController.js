import User from '../models/User';
import UserValidations from '../validations/UserValidations';

class UserController {
    async store(req, res) {
        await UserValidations.validateStore(req, res);

        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }
}

export default new UserController();

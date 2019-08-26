import User from '../models/User';
import UserValidations from '../validations/UserValidations';

class UserController {
    async store(req, res) {
        await UserValidations.validateStore(req);

        if (UserValidations.getError()) {
            return UserValidations.sendError(res);
        }

        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        await UserValidations.validateUpdate(req);

        if (UserValidations.getError()) {
            return UserValidations.sendError(res);
        }

        const { email, actualPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email != user.email) {
            const userExists = await User.findOne({
                where: { email: req.body.email }
            });

            if (userExists) {
                return res.status(400).json({ error: 'Email already used' });
            }
        }

        if (actualPassword && !(await user.checkPassword(actualPassword))) {
            return res
                .status(401)
                .json({ error: 'Actual password is incorrect' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            name,
            email
        });
    }
}

export default new UserController();

import jwt from 'jsonwebtoken';
import { User } from '../models';
import authConfig from '../../config/auth';

class SessionService {
  async init(session) {
    const { email, password } = session;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: 401, data: { error: 'User not found.' } };
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return { status: 401, data: { error: 'Password does not match.' } };
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      status: 200,
      data: {
        user: {
          id,
          name,
          email,
        },
        token,
      },
    };
  }
}

export default new SessionService();

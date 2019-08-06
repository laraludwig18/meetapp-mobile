import { User } from '../models';

class UserService {
  async create(user) {
    const { email } = user;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return { status: 401, data: { error: 'Usuário já existente.' } };
    }

    const { id, name, provider } = await User.create(user);

    return { status: 200, data: { id, name, email, provider } };
  }

  async update(newUser) {
    const { id, email: newEmail, oldPassword } = newUser;

    const user = await User.findByPk(id);

    if (newEmail && newEmail !== user.email) {
      const userExists = await User.findOne({ where: { email: newEmail } });

      if (userExists) {
        return { status: 401, data: { error: 'Usuário já existente.' } };
      }
    }

    if (oldPassword) {
      const isPasswordValid = await user.checkPassword(oldPassword);

      if (!isPasswordValid) {
        return { status: 401, data: { error: 'Senhas não coincidem.' } };
      }
    }

    const { name, email, provider } = await user.update(newUser);

    return { status: 200, data: { id, name, email, provider } };
  }
}

export default new UserService();

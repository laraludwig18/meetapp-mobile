import { UserService } from '../services';

class UserController {
  async store(req, res) {
    const { status, data } = await UserService.create(req.body);

    return res.status(status).json(data);
  }

  async update(req, res) {
    const user = { ...req.body, id: req.userId };
    const { status, data } = await UserService.update(user);

    return res.status(status).json(data);
  }
}

export default new UserController();

import { SessionService } from '../services';

class SessionController {
  async store(req, res) {
    const { status, data } = await SessionService.init(req.body);

    res.status(status).json(data);
  }
}

export default new SessionController();

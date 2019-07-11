import { ScheduleService } from '../services';

class ScheduleController {
  async index(req, res) {
    const { status, data } = await ScheduleService.list(req.userId);

    return res.status(status).json(data);
  }
}

export default new ScheduleController();

import { MeetupService } from '../services';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;
    const { data, status } = await MeetupService.list({ page, date });

    return res.status(status).json(data);
  }

  async store(req, res) {
    const { status, data } = await MeetupService.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { status, data } = await MeetupService.update(
      {
        ...req.body,
        id: req.params.meetupId,
      },
      req.userId
    );

    return res.status(status).json(data);
  }

  async delete(req, res) {
    const { status, data } = await MeetupService.remove({
      id: req.params.meetupId,
      organizerId: req.userId,
    });

    return res.status(status).json(data);
  }
}

export default new MeetupController();

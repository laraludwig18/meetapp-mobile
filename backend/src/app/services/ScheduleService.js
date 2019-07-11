import { Meetup } from '../models';

class ScheduleService {
  async list(id) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: id,
      },
    });

    return { status: 200, data: meetups };
  }
}

export default new ScheduleService();

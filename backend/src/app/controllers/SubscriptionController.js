import { SubscriptionService } from '../services';

class SubscriptionController {
  async index(req, res) {
    const { status, data } = await SubscriptionService.list(req.userId);
    return res.status(status).json(data);
  }

  async store(req, res) {
    const { status, data } = await SubscriptionService.create({
      user_id: req.userId,
      meetup_id: req.params.meetupId,
    });

    return res.status(status).json(data);
  }

  async delete(req, res) {
    const { status, data } = await SubscriptionService.remove(
      req.params.subscriptionId
    );

    return res.status(status).json(data);
  }
}

export default new SubscriptionController();

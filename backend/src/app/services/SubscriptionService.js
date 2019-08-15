import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import { File, Meetup, User, Subscription } from '../models';

import { Queue } from '../../lib';
import { SubscribeEmail } from '../../jobs';

class SubscriptionService {
  async list(user_id) {
    const userSubscriptions = await Subscription.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'user_id',
          ],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['name', 'path', 'url'],
            },
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [['meetup', 'date']],
    });

    return { status: 200, data: userSubscriptions };
  }

  async create(subscription) {
    const meetup = await Meetup.findByPk(subscription.meetup_id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!meetup) {
      return {
        status: 404,
        data: { error: 'Não foi possivel encontrar o evento selecionado.' },
      };
    }

    // Check past meetup

    if (isBefore(meetup.date, new Date())) {
      return {
        status: 400,
        data: {
          error: 'Você não pode se inscrever em eventos que já aconteceram.',
        },
      };
    }

    // Check if user is the organizer

    if (meetup.user_id === subscription.user_id) {
      return {
        status: 401,
        data: {
          error: 'Você não pode se inscrever nos seus próprios eventos.',
        },
      };
    }

    // Check if user already subscribed

    const alreadySubscribed = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
        meetup_id: subscription.meetup_id,
      },
    });

    if (alreadySubscribed) {
      return {
        status: 400,
        data: { error: 'Você já se inscreveu para este evento.' },
      };
    }

    // Check if user subscribed to another meetup on the same time

    const checkTime = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkTime) {
      return {
        status: 400,
        data: {
          error: 'Você já se inscreveu para outro evento neste mesmo horário.',
        },
      };
    }

    // Send email

    const userSubscribed = await User.findOne({
      where: {
        id: subscription.user_id,
      },
    });

    await Queue.add(SubscribeEmail.key, { meetup, userSubscribed });

    const newSubscription = await Subscription.create(subscription);

    return { status: 200, data: newSubscription };
  }

  async remove(subscription_id) {
    const subscription = await Subscription.findOne({
      where: { id: subscription_id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'user_id',
          ],
        },
      ],
    });

    // Check meetup date

    if (isBefore(subscription.meetup.date, new Date())) {
      return {
        status: 400,
        data: {
          error:
            'Não é possivel cancelar inscrição em eventos que já aconteceram.',
        },
      };
    }

    await subscription.destroy();

    return { status: 200, data: { ok: true } };
  }
}

export default new SubscriptionService();

import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import { Meetup, User } from '../models';

class MeetupService {
  async list(query) {
    const { date, page } = query;

    let where = {};

    if (date) {
      const searchDate = parseISO(date);
      where = {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      };
    } else {
      where = {
        date: {
          [Op.gt]: new Date(),
        },
      };
    }

    const meetups = await Meetup.findAll({
      where,
      attributes: ['id', 'title', 'description', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
      order: ['date'],
    });

    return { status: 200, data: meetups };
  }

  async create(meetupData) {
    const meetup = await Meetup.create(meetupData);

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (isBefore(hourStart, new Date())) {
      return { status: 400, data: { error: 'Past dates are not permitted' } };
    }

    return { status: 200, data: meetup };
  }

  async update(meetupData, organizerId) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      return { status: 401, data: { error: "You can't edit this meetup" } };
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      return { status: 400, data: { error: 'Past meetups are not editable' } };
    }

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (hourStart && isBefore(hourStart, new Date())) {
      return { status: 400, data: { error: 'Past dates are not permitted' } };
    }

    const updatedMeetup = await meetup.update(meetupData);

    return { status: 200, data: updatedMeetup };
  }

  async remove(meetupData) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: meetupData.organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      return { status: 401, data: { error: "You can't delete this meetup" } };
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      return {
        status: 400,
        data: { error: 'Past meetups are not deletable' },
      };
    }

    await meetup.destroy();

    return { status: 200, data: { ok: true } };
  }
}

export default new MeetupService();

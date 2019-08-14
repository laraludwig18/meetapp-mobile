import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import { File, Meetup, User } from '../models';

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

    const allMeetups = await Meetup.findAll({ where });

    const meetups = await Meetup.findAll({
      where,
      attributes: ['id', 'title', 'description', 'date', 'location'],
      limit: 10,
      offset: (page - 1) * 10,
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
      order: ['date'],
    });

    return {
      status: 200,
      data: { meetups, numPages: Math.ceil(allMeetups.length / 10) },
    };
  }

  async find(id) {
    const meetup = await Meetup.findOne({
      where: {
        id,
      },
      attributes: ['id', 'title', 'description', 'date', 'location'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return { status: 200, data: meetup };
  }

  async create(meetupData) {
    const meetup = await Meetup.create(meetupData);

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (isBefore(hourStart, new Date())) {
      return {
        status: 400,
        data: { error: 'Não é permitido criar eventos com datas passadas.' },
      };
    }

    return { status: 200, data: meetup };
  }

  async update(meetupData, organizerId) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      return {
        status: 401,
        data: { error: 'Você não pode editar este evento.' },
      };
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      return {
        status: 400,
        data: { error: 'Eventos passados não podem ser editados.' },
      };
    }

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (hourStart && isBefore(hourStart, new Date())) {
      return {
        status: 400,
        data: { error: 'Não é permitido editar eventos com datas passadas.' },
      };
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
      return {
        status: 401,
        data: { error: 'Você não pode cancelar este evento.' },
      };
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      return {
        status: 400,
        data: { error: 'Não é possivel cancelar eventos que já aconteceram.' },
      };
    }

    await meetup.destroy();

    return { status: 200, data: { ok: true } };
  }
}

export default new MeetupService();

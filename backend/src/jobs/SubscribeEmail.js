import Mail from '../lib/Mail';

class SubscribeEmail {
  get key() {
    return 'SubscribeEmail';
  }

  async handle({ data }) {
    const { meetup, userSubscribed } = data;
    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Nova inscrição em um evento organizado por você! :)',
      template: 'newSubscribe',
      context: {
        organizer: meetup.user.name,
        event: meetup.title,
        name: userSubscribed.name,
        email: userSubscribed.email,
      },
    });
  }
}

export default new SubscribeEmail();

import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Your enrollment has been confirmed!',
      template: 'welcoming',
      context: {
        student: enrollment.student.name,
        subscription: enrollment.subscription.title,
        date: format(parseISO(enrollment.end_date), "MMMM dd' at 'H:mm'h'"),
        price: enrollment.price,
      },
    });
  }
}

export default new WelcomeMail();

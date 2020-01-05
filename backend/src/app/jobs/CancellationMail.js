import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Your enrollment has been canceled',
      template: 'cancellation',
      context: {
        student: enrollment.student.name,
        date: format(parseISO(enrollment.end_date), "MMMM dd' at 'H:mm'h'"),
      },
    });
  }
}

export default new CancellationMail();

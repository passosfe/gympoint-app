import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Your question has been answered!',
      template: 'answer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        date: format(parseISO(helpOrder.answer_at), "MMMM, dd' at 'H:mm'h'"),
      },
    });
  }
}

export default new AnswerMail();

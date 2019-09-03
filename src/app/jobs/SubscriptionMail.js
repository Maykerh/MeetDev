import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
    get key() {
        return 'SubscriptionMail';
    }

    async handler({ data }) {
        const { user, meetup } = data;

        await Mail.sendMail({
            to: `${user.name} <${user.email}>`,
            subject: 'Inscrição realizada',
            template: 'subscription',
            context: {
                title: meetup.title,
                date: format(
                    parseISO(meetup.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    {
                        locale: pt
                    }
                ),
                location: meetup.location
            }
        });
    }
}

export default new SubscriptionMail();

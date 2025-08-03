import email from '&/infrastructure/email';
import { configNodemailer } from '&/config';

export const emailRepository = {
  sendEmail: async (to: string, subject: string, html: string): Promise<void> => {
    try {
      await email.sendMail({
        from: `"No Reply" <${configNodemailer.USER}>`,
        to,
        subject,
        html,
      });
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  },
};

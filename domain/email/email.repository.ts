export interface EmailRepository {
  sendEmail: (to: string, subject: string, html: string) => Promise<void>;
}

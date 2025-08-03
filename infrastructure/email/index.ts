import nodemailer from 'nodemailer';
import { configNodemailer } from '&/config';

const { SERVICE, USER, PASS } = configNodemailer;

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: USER,
    pass: PASS,
  },
});

transporter.on('error', (error) => {
  console.error('Error in email transporter:', error);
  process.exit(1);
});

export default transporter;

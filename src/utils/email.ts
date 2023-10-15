import { createTransport, SendMailOptions, TransportOptions } from "nodemailer";

export type Transport = {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass?: string;
  };
};

export const sendEmail = async ({
  transport,
  message,
}: {
  transport: Transport;
  message: SendMailOptions;
}) => {
  console.log({
    transport,
    message,
  });
  return createTransport(transport).sendMail(message);
};

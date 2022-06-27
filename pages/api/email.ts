// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SMTPClient } from 'emailjs';

interface Body {
  email: string;
  name: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, subject, message } = req.body as Body;

  const client = new SMTPClient({
    user: 'achaval.lucas.dev@gmail.com',
    password: `${process.env.NEXT_PUBLIC_EMAIL_PASSWORD}`,
    host: 'smtp.gmail.com',
    ssl: true,
  });

  try {
    await client.sendAsync({
      from: email,
      to: 'achaval.lucas@gmail.com',
      subject: subject,
      text: message,
    });
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

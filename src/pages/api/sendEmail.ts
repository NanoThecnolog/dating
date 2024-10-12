import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { to, subject, text } = req.body;
        try {

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });


            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email enviado com sucesso!' });

        } catch (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).json({ error: 'Erro ao enviar email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

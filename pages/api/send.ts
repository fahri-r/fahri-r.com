import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "POST":
      const { name, email, message } = req.body;

      try {
        const data = await resend.emails.send({
          from: process.env.RESEND_FROM as string,
          to: process.env.RESEND_TO as string,
          subject: `${name} has a message! - fahri-r.com`,
          react: EmailTemplate({
            name,
            message,
            email,
          }),
        });

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error });
      }

    default:
      res.status(405).end();
      break;
  }
}

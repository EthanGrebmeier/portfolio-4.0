import nodemailer from "nodemailer";
import { env } from "../../env/server.mjs";
import rateLimit from "../../helpers/server/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 5, // Max 5 users per second
});

export async function POST(req: Request) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_ADDRESS,
      pass: env.EMAIL_TOKEN,
    },
  });

  const body = await req.formData();

  const bodyObject = {
    name: body?.get("name"),
    email: body?.get("email"),
    body: body?.get("body"),
  };

  if (!bodyObject.name) {
    return new Response("Missing Message Name", {
      status: 400,
    });
  }

  if (!bodyObject.body) {
    return new Response("Missing Message Body", {
      status: 400,
    });
  }

  if (!bodyObject.email) {
    return new Response("Missing Message Email", {
      status: 400,
    });
  }

  const rateLimitedResponse = new Response("Rate Limit Exceeded", {
    status: 429,
  });
  try {
    await limiter.check(rateLimitedResponse, 3, "CACHE_TOKEN"); // 3 requests per minute
  } catch {
    return rateLimitedResponse;
  }

  const html = `
      <body>
          <p> Email From: ${bodyObject.name} - ${bodyObject.email} </p>
          <p> ${bodyObject.body}
      </body>
  `;

  const mailOptions = {
    from: `Ethangrebmeier.com`,
    to: `ethangrebmeier@gmail.com`,
    subject: "Email From Ethangrebmeier.com",
    html: html,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
      return new Response(error, {
        status: 500,
      });
    } else {
      return new Response("Success", {
        status: 200,
      });
    }
  });
}

import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message) throw new CustomError("All fields are required", 400);

  await sendEmail({
    to: process.env.SMTP_USER,
    subject: `[Contact Form] ${subject}`,
    html: `<p>From: ${email}</p><p>Message: ${message}</p>`,
  });

  res.status(200).json({ success: true, message: "Message sent successfully." });
});

import twilio from "twilio";

const hasCreds = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN;
const client = hasCreds
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function sendSms(to: string, body: string) {
  if (!client) {
    console.warn(`[sms] Twilio not configured — would have sent to ${to}: ${body}`);
    return { sid: "dev-noop" };
  }
  return client.messages.create({ to, from: process.env.TWILIO_FROM_NUMBER, body });
}

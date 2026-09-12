import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const FROM = process.env.EMAIL_FROM || "Northern Pursuit Sport Fishing <bookings@example.com>";

/**
 * Thin wrapper so every transactional email goes through one place —
 * makes it easy to log sends to NotificationLog and to swap providers later.
 */
export async function sendEmail(params: { to: string; subject: string; html: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY not set — would have sent "${params.subject}" to ${params.to}`);
    return { id: "dev-noop" };
  }
  return resend.emails.send({ from: FROM, to: params.to, subject: params.subject, html: params.html });
}

export const emailTemplates = {
  bookingConfirmation: (opts: {
    name: string;
    packageName: string;
    date: string;
    guestCount: number;
    depositCents: number;
    balanceCents: number;
    confirmationCode: string;
  }) => `
    <h2>You're booked, ${opts.name}!</h2>
    <p><strong>Confirmation #:</strong> ${opts.confirmationCode}</p>
    <p><strong>Charter:</strong> ${opts.packageName}</p>
    <p><strong>Date:</strong> ${opts.date}</p>
    <p><strong>Guests:</strong> ${opts.guestCount}</p>
    <p><strong>Deposit paid:</strong> $${(opts.depositCents / 100).toFixed(2)}</p>
    <p><strong>Balance due after the trip:</strong> $${(opts.balanceCents / 100).toFixed(2)}</p>
    <p>Captain Jack will text and email your exact launch location three days before your trip.</p>
    <p>Questions? Call or text 734-660-4429.</p>
  `,
  threeDayLaunchInfo: (opts: {
    name: string;
    date: string;
    arrivalTime: string;
    location: string;
    mapUrl?: string;
    parkingNotes?: string;
    identifierNotes?: string;
    weatherNote?: string;
  }) => `
    <h2>Your Northern Pursuit charter is getting close, ${opts.name}.</h2>
    <p>Captain Jack has confirmed your meeting details based on current fishing and weather conditions.</p>
    <ul>
      <li><strong>Date:</strong> ${opts.date}</li>
      <li><strong>Arrival time:</strong> ${opts.arrivalTime}</li>
      <li><strong>Meeting location:</strong> ${opts.location}</li>
      ${opts.mapUrl ? `<li><strong>Map:</strong> <a href="${opts.mapUrl}">${opts.mapUrl}</a></li>` : ""}
      ${opts.parkingNotes ? `<li><strong>Parking:</strong> ${opts.parkingNotes}</li>` : ""}
      ${opts.identifierNotes ? `<li><strong>Look for:</strong> ${opts.identifierNotes}</li>` : ""}
      ${opts.weatherNote ? `<li><strong>Weather note:</strong> ${opts.weatherNote}</li>` : ""}
    </ul>
    <p>Captain Jack: 734-660-4429</p>
  `,
  giftCardDelivery: (opts: { recipientName: string; buyerName: string; amountCents: number; code: string; message?: string }) => `
    <h2>You've received a Northern Pursuit Sport Fishing gift card!</h2>
    <p>${opts.buyerName} sent you a gift card worth $${(opts.amountCents / 100).toFixed(2)} toward a charter.</p>
    ${opts.message ? `<p style="font-style:italic;">"${opts.message}"</p>` : ""}
    <p><strong>Redemption code:</strong> ${opts.code}</p>
    <p>Enter this code when booking at northernpursuitsportfishing.com/book, or mention it to Captain Jack directly. Call or text 734-660-4429 with any questions.</p>
  `,
  sevenDayReminder: (opts: { name: string; packageName: string; date: string }) => `
    <h2>Your charter is one week out, ${opts.name}!</h2>
    <p><strong>${opts.packageName}</strong> on <strong>${opts.date}</strong>.</p>
    <p>You'll get your exact launch location and meeting time by text and email three days before the trip.</p>
    <p>Questions in the meantime? Call or text Captain Jack at 734-660-4429.</p>
  `,
  oneDayReminder: (opts: { name: string; packageName: string; date: string; launchLocation?: string }) => `
    <h2>See you tomorrow, ${opts.name}!</h2>
    <p><strong>${opts.packageName}</strong> on <strong>${opts.date}</strong>.</p>
    ${opts.launchLocation ? `<p><strong>Meeting location:</strong> ${opts.launchLocation}</p>` : ""}
    <p>Dress in layers, bring polarized sunglasses and sunscreen, and bring a cooler for your catch.</p>
    <p>Questions? Call or text Captain Jack at 734-660-4429.</p>
  `,
  postTripThankYou: (opts: { name: string; packageName: string }) => `
    <h2>Thanks for fishing with us, ${opts.name}!</h2>
    <p>We hope you had a great time on the ${opts.packageName}. If you have a minute, a review helps other
    anglers find us — and we'd genuinely appreciate hearing how the trip went.</p>
    <p>Hope to see you back on the water — Captain Jack</p>
  `,
};

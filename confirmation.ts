import { customAlphabet } from "nanoid";

// Human-readable confirmation codes like NP-7F3K2Q — no ambiguous chars (0/O, 1/I).
const nanoid = customAlphabet("23456789ABCDEFGHJKMNPQRSTUVWXYZ", 6);

export function generateConfirmationCode() {
  return `NP-${nanoid()}`;
}

export function generateGiftCardCode() {
  return `NPGIFT-${nanoid()}`;
}

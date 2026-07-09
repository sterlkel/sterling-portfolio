"use server";
import { differenceInDays } from "date-fns";
import { cookies } from "next/headers";

const emailSentDateCookieKey = "emailSentDate";

export async function createCookie() {
  const date = new Date();
  const cookieStore = await cookies();
  cookieStore.set(emailSentDateCookieKey, date.toString());
}

export async function getEmailSent() {
  const cookieStore = await cookies();
  const emailSentCookie = cookieStore.get(emailSentDateCookieKey);
  if (emailSentCookie) {
    const today = new Date();
    const emailSentDate = new Date(emailSentCookie.value);
    const diffDays = differenceInDays(emailSentDate, today);
    if (diffDays > 1) return false;
    return true;
  }
  return false;
}

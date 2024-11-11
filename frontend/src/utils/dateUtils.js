// src/utils/dateUtils.js
import { format } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";

// Format date and time for a specific time zone
export const formatDateTimeWithTimeZone = (dateString, timeZone = "UTC") => {
  const zonedDate = toZonedTime(dateString, timeZone); // Convert to the desired time zone
  return formatTz(zonedDate, "MM-dd-yyyy HH:mm aa", { timeZone });
};

// Format date only for a specific time zone
export const formatDateWithTimeZone = (dateString, timeZone = "UTC") => {
  const zonedDate = toZonedTime(dateString, timeZone); // Convert to the desired time zone
  return format(zonedDate, "MM-dd-yyyy");
};

// Format time only for a specific time zone
export const formatTimeWithTimeZone = (dateString, timeZone = "UTC") => {
  const zonedDate = toZonedTime(dateString, timeZone); // Convert to the desired time zone
  return format(zonedDate, "HH:mm aa");
};

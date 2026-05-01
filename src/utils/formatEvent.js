// Formats Firestore event into display strings
export function formatEventBadge(event) {
  if (!event?.date) return null;

  const dateObj = new Date(event.date);
  const day  = dateObj.toLocaleDateString("en-IN", { weekday: "long" });
  const date = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
  const time = `${event.time.hour}:${String(event.time.minute).padStart(2,"0")} ${event.time.period}`;

  return { day, date, time, location: event.location };
}
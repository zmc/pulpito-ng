import { format, intervalToDuration } from "date-fns";

function formatDate(orig) {
  if (!orig) return;
  return format(new Date(orig), "yy-MM-dd HH:mm:ss");
}

export { formatDate };

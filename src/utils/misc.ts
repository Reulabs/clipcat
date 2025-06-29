import moment from "moment";

const checkPathMatch = (path: string) => {
  const currentPath = window.location.pathname;
  return currentPath.includes(path);
};

export { checkPathMatch };

export function getDateLabel(dateString: string): string {
  const date = moment(dateString);
  if (date.isSame(moment(), "day")) return "Today";
  if (date.isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
  return date.format("MMMM D, YYYY");
}

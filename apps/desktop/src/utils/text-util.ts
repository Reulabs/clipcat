const truncate_text = (content: string, count = 10) => {
  return `${content.substring(0, count)}...`;
};

const get_content_title = (content: string, wordLimit = 6): string => {
  const words = content.trim().split(/\s+/).slice(0, wordLimit);
  return words.join(" ");
};

export { truncate_text, get_content_title };

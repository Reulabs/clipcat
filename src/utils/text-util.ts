const truncate_text = (content: string, count = 10) => {
  return `${content.substring(0, count)}...`;
};

export { truncate_text };

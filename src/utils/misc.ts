const checkPathMatch = (path: string) => {
  const currentPath = window.location.pathname;
  return currentPath.includes(path);
};

export { checkPathMatch };

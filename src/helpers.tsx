const IsProd = () => {
  const env = process.env.NODE_ENV;
  if (env == "production") {
    return true;
  }
  return false;
};

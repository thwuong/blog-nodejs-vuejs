export default () => {
  const token = JSON.parse(localStorage.getItem("user"));

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

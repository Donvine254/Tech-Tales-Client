export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getRandomColor = () => {
  const colors = [
    "cyan",
    "green",
    "blue",
    "pink",
    "orange",
    "amber",
    "lime",
    "teal",
    "emerald",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "rose",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

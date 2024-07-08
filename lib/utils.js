export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getRandomColor = () => {
  const colors = [
    "#cffafe",
    "#e0f2fe",
    "#bae6fd",
    "#dbeafe",
    "#e2e8f0",
    "#ccfbf1",
    "#99f6e4",
    "#f5f5f5",
    "#dcfce7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getRandomColor = () => {
  const colors = [
    "#cffafe",
    "#e0f2fe",
    "#fef9c3",
    "#fbcfe8",
    "#bae6fd",
    "#dbeafe",
    "#e0e7ff",
    "#ccfbf1",
    "#ecfccb",
    "#e9d5ff",
    "#ede9fe",
    "#f3e8ff",
    "#f5d0fe",
    "#ffe4e6",
    "#fef3c7",
    "#dcfce7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

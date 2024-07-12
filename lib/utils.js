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

export function encodeId(id) {
  return Buffer.from(id.toString()).toString("base64");
}

export function decodeId(encodedId) {
  return Buffer.from(encodedId.toString(), "base64").toString("utf-8");
}
export function convertToHandle(name) {
  return '@' + name.toLowerCase().replace(/\s+/g, '');
}
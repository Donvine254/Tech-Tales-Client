export default function Avatar({ name, handleClick = null }) {
  const firstLetter = name?.charAt(0) ?? "";

  const generateColor = () => {
    if (name) {
      const charCodeRed = name.charCodeAt(0);
      const charCodeGreen = Math.pow(charCodeRed, 4) % 100;
      const charCodeBlue = Math.pow(charCodeRed, 9) % 200;
      return `rgb(${charCodeGreen}, ${charCodeBlue}, ${charCodeGreen})`;
    }
    return "rgb(20, 30, 100)";
  };

  const color = generateColor(name);

  return (
    <div
      className={`flex justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer shadow `}
      onClick={handleClick}
      style={{ backgroundColor: color }}>
      <p
        className={`text-white text-xl font-bold ${
          firstLetter === "" ? "hidden" : ""
        }`}>
        {firstLetter}
      </p>
    </div>
  );
}

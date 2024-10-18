
export default function DeleteButton({ handleClick }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      height="1em"
      width="1em"
      className="absolute top-[-10px] right-[-10px] hidden group-hover:block  z-50 cursor-pointer"
      title="delete account"
      onClick={handleClick}>
      <title>Delete Account</title>
      <path
        fill="none"
        stroke="#ef4444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
}

export default function Loader({ size = 30, fill = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      className="animate-spin my-2 text-blue-600 font-bold"
      height={size}
      viewBox="0 0 21 21"
      fill="currentColor">
      <g
        fill={fill}
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path
          fill={fill}
          d="M10.5 3.5v2M15.5 5.5L14 7M5.5 5.5L7 7M10.5 17.5v-2M15.5 15.5L14 14M5.5 15.5L7 14M3.5 10.5h2M15.5 10.5h2"
        />
      </g>
    </svg>
  );
}

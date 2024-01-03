export const Graph = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer">
      <path d="M3 3v18h18" />
      <path d="M13 17V9" />
      <path d="M18 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
};
export const Clock = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export const Trash = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer ">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
};
export const Edit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
};

export const Like = ({ handleClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={handleClick}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const Comment = ({ handleClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-pointer"
    onClick={handleClick}>
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </svg>
);
export const SortDown = ({ handleClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-xl cursor-pointer"
    onClick={handleClick}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const SortUp = ({ handleClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-xl cursor-pointer"
    onClick={handleClick}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const SearchIcon = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    className={className}>
    <path
      fill="currentColor"
      d="M8.55 10.55a1 1 0 11-2 0 1 1 0 012 0zM10.55 11.55a1 1 0 100-2 1 1 0 000 2zM13.55 11.55a1 1 0 100-2 1 1 0 000 2z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.207 4.893a8.001 8.001 0 01.662 10.565c.016.013.03.027.045.042l4.243 4.243a1 1 0 01-1.414 1.414L15.5 16.914a.933.933 0 01-.042-.045A8.001 8.001 0 014.893 4.893a8 8 0 0111.314 0zm-9.9 9.9a6 6 0 108.486-8.485 6 6 0 00-8.485 8.485z"
      clipRule="evenodd"
    />
  </svg>
);
export const Share = ({ className, size = 24, handleClick = null }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={handleClick}
    className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);
export const Facebook = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    className="md:text-xl text-blue-600 font-bold cursor-pointer">
    <title>Facebook</title>
    <path
      fill="currentColor"
      d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"
    />
  </svg>
);
export const Twitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#3b82f6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="md:text-2xl text-blue-500 cursor-pointer">
    <title>Twitter</title>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
export const Whatsapp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="#25D366"
    height="24"
    width="24"
    className="font-bold md:text-2xl">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
  </svg>
);
export const Copy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="font-bold md:tex-2xl">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const Cat = () => (
  <svg
    width="187"
    height="155"
    viewBox="0 0 187 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M145.112 20.322c3.938 2.069 8.113 3.927 11.892 6.136 3.097-1.12 5.594-2.985 8.99-4.407 2.576-1.078 8.38-2.77 10.907-.992 2.671 1.878.484 8.293-.43 11.05-1.289 3.881-2.576 7.016-3.692 10.383 1.478 2.09.983 5.155-1.088 6.297-.939 10.728-3.923 19.15-8.621 25.639 15.453 3.575 19.587 17.175 20.614 33.527.361.309 1.673-.444 2.834-.064 1.574 3.386-1.063 4.443-2.924 5.479-.765 12.817-6.961 18.595-14.673 24.332-2.613 1.943-5.55 3.483-8.535 4.67-6.158 2.449-12.325 5.836-18.602 7.363-4.747 1.155-10.499 1.763-16.188 2.56-15.267 2.137-35.29 4.003-52.912 1.524-22.536-3.169-45.804-9.115-56.387-22.957-6.903-9.028-13.108-28.756-3.38-41.68-8.06-1.914-18.738-13.64-9.092-21.286.09-3.251 3.224-6.843 6.355-7.63 1.696-.425 3.53-.43 5.24-.862 11.488-2.897 18.782-13.24 31.492-13.891 5.496-.282 10.776 1.038 14.689 2.77.644-2.631-.12-5.902.759-8.674.758-2.39 3.866-5.885 5.9-7.892 2.058-2.033 6.06-7.079 8.812-5.36.746 2.673.426 6.29.359 9.683 4.009.648 10.115-2.63 13.904.13.378 1.37-.066 3.468-.077 5.18 1.219.625 3 .752 3.91 1.65.514 2.877.596 6.139.607 9.463 1.076.21 1.384-.446 2.378-.328.894-14.634 6.732-25.84 17.391-30.295 1.433-4.235 3.799-7.42 6.732-9.963.402-.33 1.755-.249 2.114.127 2.762-2.743 6.156-7.42 10.256-9.751 1.68-.955 5.835-3.151 8.365-1.853 3.865 1.981 1.896 13.65 2.101 19.922zM143.271 3.95c-.309-1.213-1.411-2.459-2.222-2.255-5.805 1.463-11.291 6.181-14.82 11.125 4.366 1.51 7.314 4.809 12.681 4.771 1.24-2.476.102-7.4 1.493-9.1 1.636 2.482.65 7.268-.154 10.36-.121.615-1.21.14-1.452.619.962.407 1.885.848 2.251 1.785-.23 1.663-.962 2.762-1.21 4.405 2.241.756 3.526 2.36 5.704 3.172 1.071-.268 1.408-2.45 2.755-2.662 1.189-.187 3.352 1.58 4.806 2.41 4.575 2.615 9.956 6.03 11.928 9.439l-.113 1.878c2.083.6 4.067 1.288 6.258 1.792 1.456-6.258 5.68-11.93 4.921-19.028-3.736-1.093-6.996-.242-10.216 1.27-2.792 1.31-5.859 4.173-8.506 4.2-2.276.024-4.906-2.085-7.114-3.256-2.463-1.307-5.129-1.938-6.85-3.712-.385-5.042.98-12.808-.14-17.213zm-26.506 25.033c.959 3.34 5.929 5.29 10.068 5.083 6.401-.318 10.584-7.164 12.099-12.939-4.803-2.931-10.192-5.344-15.815-7.55-3 3.142-8.236 8.839-6.352 15.406zM100.241 52.73c.091 7.265 3.455 13.124 8.392 17.238 4.718 3.93 10.875 7.928 17.859 8.853 1.639.216 4.415-.457 4.877 1.236-.576 1.094-1.786.35-2.613.314-7.12-.308-11.962-2.366-16.868-5.73-7.575-5.192-12.851-10.56-13.597-20.85-.95.1-1.645.486-2.406.798.038 1.374.189 2.648-.02 4.24.142.536 2.043-.503 2.085.598-.336 1.235-1.779.847-2.256 2.22-.492 1.417.163 4.939.238 7.791.106 4.097.858 7.68-.11 9.656 4.49 2.823 12.777 6.068 20.213 4.988 1.14-.165 2.433-1.402 3.553-.257-1.21 2.092-3.055 1.997-4.841 2.065-9.49.363-15.972-2.328-21.304-6.468-4.83-3.751-8.129-10.407-15.701-9.43.337.985 3.484 2.513 2.55 4.63-1.86-.376-2.888-3.782-4.294-3.085-1.07 1.34 2.995 2.893 1.817 5.058-1.621-.01-2.533-2.89-3.162-2.312l-.184 3.053c1.208 3.016 2.197 6.13 4.189 8.736 3.298 4.314 8.475 8.864 13.225 11.402 1.223.653 3.106.387 3.396 2.325-4.104.348-7.328-2.828-10.068-5.084-5.238-4.313-9.883-8.726-12.044-15.337-3.01-.777-6.92-.847-8.523-3.341-1.756-2.73-1.358-7.867-1.848-12.365-.51-4.68-1.122-9.35-.852-13.249-2.045-.892-4.21-2.04-5.98-2.482-15.637-3.898-25.315 7.077-35.345 11.303-6.22 2.621-12.928 1.736-15.12 8.28 3.41-.214 6.97.614 10.822.417 11.14-.57 16.976-13.137 30.382-11.131 4.897.733 11.462 3.397 13.744 6.72-5.377-1.41-8.259-3.975-13.387-4.814-10.675-1.746-16.865 6.84-24.88 9.813-4.414 1.637-10.543 1.027-16.325.901-1.693.932-3.688 1.524-3.793 4.25 2.106-.162 6.312-.46 6.743 1.584-1.527.91-5.608-.144-7.077.045-.115 1.288.451 1.971.77 2.874 1.258-.495 4.834-1.562 5.888.12-.675 1.663-4.1.224-5.048 1.58 1.366 2.025 3.46 4.019 6.032 5.548 2.333 1.388 6.146 2.751 9.506 2.694 1.467-.025 3.562-.929 5.503-1.318 3.376-.677 8.31-1.575 12.758-.41 3.452.905 7.483 5.423 10.382 7.696a79.184 79.184 0 0 0 11.116 7.268c8.276 4.453 16.903 7.823 28.225 9.006 9.933 1.038 18.026.987 26.413-.058 3.671-.457 7.846-.937 10.978-2.166.917-.36 1.809-1.38 2.947-1.944 1.069-.529 2.326-.906 3.389-1.445 8.709-4.423 16.337-13.09 18.154-23.415 14.327-3.238 19.498-16.8 21.391-34.06-2.944-.357-5.085-1.422-7.904-1.89-2.645 6.01-12.649 10.282-18.929 4.987-4.963-4.186-2.484-12.759-.098-17.917-2.571.349-4.616-1.689-6.686-2.523-2.094 2.733-5.288 5.838-9.795 6.008-7.083.267-13.718-4.214-11.772-12.021-.005-.144-.018-.28-.221-.25-8.798 5.128-14.64 16.642-14.486 29.057zM137.774 28.6c2.04 1.084 4.455 1.834 6.175 3.2.006-.745.671-.747.568-1.615-2.266-.734-3.68-2.222-5.703-3.172a8.97 8.97 0 0 0-1.04 1.587zm10.644-.537c-3.561 4.316-10.124 16.22-3.873 21.212 5.642 4.505 15.031.24 16.124-5.392 1.103-.345 1.556-1.422 2.256-2.22.36-.911-.744-.527-.384-1.438.129-.774 1.462-.19 1.259-1.338-3.716-4.857-9.704-7.703-15.382-10.824zM69.336 33.43c-1.787 1.83-4.627 4.036-5.344 6.512-.918 3.17-.442 7.385-.403 10.58.106 8.475 1.448 18.076 2.742 24.91 1.554 1.143 4.426 1.117 6.245 2.026-.108-5.79 2.498-9.448 6.482-9.743 7.329-.544 10.816 7.879 15.425 10.12-1.173-10.52-.092-23.034-.78-33.982-5.641-1.405-13.337-2.154-20.107-2.86-2.772-.29-6.453.361-8.153-1.67 2.888-4.184 6.67-7.36 9.872-11.189.07-.291.395-.458-.207-.483-2.015 1.786-3.758 3.719-5.772 5.779zm-.988 4.654c2.377-.663 4.923-1.136 7.411-1.674.17-2.373.235-4.654-.073-6.603-2.204 3.032-4.885 5.526-7.338 8.277zm2.763 1.11c6.318.553 12.507 1.22 18.504 2.057l.256-4.226c-6.526-.583-13.17.862-18.76 2.168zm92.157 4.61c2.883.853 5.969 1.528 8.814 2.416.239-1.175-.218-1.734-.314-2.611-3.283.144-7.476-3.842-8.5.194zm-12.733 39.059c-1.523 4.801-3.388 9.22-6.182 12.589.77.598 1.323-.849 1.979-1.531.74-.771 1.652-1.462 2.27-2.455.866-1.395.764-3.596 2.37-4.1 1.237 2.783-.788 5.154-2.056 6.71-1.639 2.013-4.287 3.624-6.698 5.489-2.426 1.875-4.811 4.503-6.933 5.474-.929.425-2.013.404-2.876.769-2.736 1.155-4.879 2.782-7.538 3.787-5.033 1.904-11.654 2.717-17.876 3.165-26.88 1.935-49.11-7.164-62.544-18.615-2.526-2.153-5.016-4.988-7.897-5.896-8.142-2.566-14.722 2.863-21.522 1.06-1.737 2.846-5.684 8.054-5.022 12.894.651 4.765 7.589 4.295 10.397 7.461 2.828 3.19 1.412 7.52 3.079 11.497 1.023 2.441 3.897 5.085 6.46 6.281 6.157 2.874 15.332-1.021 21.337 1.993 2.21 1.109 3.862 3.47 5.59 5.05 3.576 3.27 7.942 7.02 15.65 6.363 4.297-.367 6.086-3.575 11.078-3.81 5.265-.248 8.762 2.834 12.972 3.845 3.761.903 8.003 1.732 12.88 1.482 11.001-.563 13.952-12.027 24.096-12.451 8.66-.363 15.711 1.447 22.711-1.224 2.645-1.009 7.141-5.854 8.499-7.972 2.874-4.482 3.067-9.944 5.149-15.007 1.658-4.029 5.835-5.7 8.363-9.63.209-1.436.515-2.762.945-3.95-2.818-7.95-7.454-14.29-16.935-16.337-3.058 3.322-7.074 5.565-11.746 7.069zm21.488 22.975c-1.458 2.916-1.505 6.417-2.447 9.279-.886 2.697-2.367 5.494-4.005 7.771-1.759 2.445-5.239 6.085-7.986 7.296-8.022 3.535-15.353 1.104-24.384 1.594-7.382.401-11.665 9.057-18.372 11.383-5.006 1.736-14.383.891-19.998-.733-4.007-1.159-7.294-3.903-11.094-3.732-4.71.211-7.934 3.935-12.736 3.945-3.747.008-7.15-1.176-9.299-2.21-4.98-2.396-7.33-7.686-11.693-9.424-3.732-1.486-6.947-.535-11.057-.43-8.668.222-15.287-3.527-17.36-9.295-1.17-3.251-.438-7.405-2.224-10.031-1.27-1.867-5.886-2.677-7.776-4.003-.643-.451-1.05-1.713-1.809-1.288-.149 10.1 3.592 18.212 8.437 24.311 3.154 3.969 7.988 8.312 12.576 10.419 21.409 9.83 51.764 15.275 80.412 11.68 14.645-1.839 29.509-3.611 40.828-8.381 3.654-1.54 7.495-2.675 10.386-4.088 2.246-1.097 4.337-3.241 6.67-5.018 2.448-1.865 5.193-3.467 6.683-5.253 5.964-7.146 7.652-22.973 4.596-33.187-.004-.143-.018-.28-.221-.249-1.535 4.333-6.141 5.673-8.127 9.644z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M143.411 21.162c1.721 1.774 4.387 2.405 6.85 3.712 2.207 1.17 4.838 3.28 7.114 3.256 2.647-.027 5.715-2.89 8.506-4.2 3.22-1.512 6.48-2.363 10.216-1.27.759 7.098-3.464 12.77-4.92 19.027-2.192-.503-4.175-1.192-6.259-1.791l.113-1.879c-1.972-3.41-7.353-6.823-11.928-9.438-1.453-.83-3.617-2.598-4.806-2.41-1.347.212-1.684 2.394-2.755 2.662-2.178-.813-3.463-2.416-5.704-3.172.248-1.643.98-2.742 1.21-4.405-.366-.937-1.288-1.379-2.251-1.786.242-.479 1.331-.003 1.452-.62.804-3.09 1.79-7.876.154-10.359-1.391 1.7-.253 6.624-1.493 9.1-5.367.038-8.315-3.26-12.681-4.77 3.529-4.944 9.015-9.662 14.82-11.125.811-.205 1.913 1.041 2.222 2.255 1.12 4.406-.245 12.172.14 17.213zm28.345 3.122c-3.322 1.938-6.46 4.085-9.133 6.755.715 2.731 3.879 4.376 6.31 4.858.722-2.628-3.456-2.674-4.445-4.51 2.611-2.24 5.584-4.07 8.386-6.094-.005-.662-.349-1.025-1.118-1.01z"
        fill="#fff"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M123.118 13.576c5.622 2.207 11.012 4.62 15.815 7.552-1.516 5.774-5.698 12.62-12.099 12.939-4.14.206-9.11-1.744-10.069-5.084-1.884-6.567 3.352-12.263 6.353-15.407zm.093 2.363c-3.142 3.006-5.901 12.593-.657 14.807 6.038 2.55 12.908-3.1 13.752-9.07-4.076-2.168-8.832-3.733-13.095-5.737z"
        fill="#F6917E"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.307 21.676c-.845 5.97-7.714 11.619-13.753 9.07-5.244-2.215-2.486-11.8.658-14.808 4.262 2.004 9.018 3.57 13.095 5.738zm-12.503-3.817c-1.374 2.297-2.439 4.943-2.419 8.81 3.159 5.843 12.57 1.284 12.999-4.402-3.863-1.171-7.322-2.7-10.58-4.408z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.385 22.267c-.429 5.685-9.841 10.244-12.999 4.4-.02-3.867 1.044-6.512 2.418-8.808 3.258 1.707 6.717 3.236 10.581 4.408zm-12.167 2.33c1.815.948 5.447-1.223 5.602-2.962-2.438.344-4.568 1.035-5.602 2.962zm.783 2.64c2.538.77 6.074-2.057 7.98-3.29-2.447-1.47-6.256 1.49-7.98 3.29z"
        fill="#fff"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M127.82 21.635c-.155 1.74-3.787 3.91-5.602 2.962 1.034-1.927 3.164-2.618 5.602-2.962zM172.873 25.293c-2.802 2.023-5.774 3.854-8.385 6.093.989 1.836 5.167 1.883 4.444 4.51-2.431-.482-5.594-2.127-6.309-4.858 2.673-2.67 5.811-4.816 9.132-6.755.77-.015 1.114.347 1.118 1.01zM130.981 23.947c-1.906 1.232-5.442 4.059-7.98 3.29 1.723-1.8 5.533-4.76 7.98-3.29z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.728 23.674c.202-.03.216.105.22.25-1.945 7.806 4.689 12.287 11.773 12.02 4.507-.17 7.7-3.275 9.794-6.008 2.071.835 4.116 2.872 6.687 2.524-2.386 5.157-4.866 13.73.098 17.916 6.279 5.295 16.284 1.024 18.929-4.987 2.818.468 4.96 1.534 7.904 1.89-1.893 17.26-7.065 30.821-21.391 34.06-1.818 10.325-9.445 18.992-18.155 23.415-1.062.54-2.319.916-3.388 1.446-1.139.564-2.03 1.583-2.947 1.943-3.133 1.229-7.308 1.709-10.978 2.166-8.387 1.046-16.48 1.096-26.413.059-11.323-1.183-19.95-4.554-28.225-9.006a79.253 79.253 0 0 1-11.116-7.269c-2.9-2.273-6.93-6.79-10.383-7.695-4.448-1.166-9.382-.267-12.757.41-1.942.389-4.036 1.293-5.504 1.318-3.36.056-7.172-1.306-9.505-2.694-2.571-1.53-4.666-3.524-6.032-5.548.947-1.356 4.373.082 5.047-1.581-1.054-1.681-4.63-.615-5.888-.12-.318-.902-.885-1.586-.77-2.874 1.47-.189 5.55.866 7.077-.045-.43-2.043-4.636-1.745-6.742-1.584.104-2.725 2.1-3.318 3.793-4.25 5.781.126 11.91.736 16.325-.9 8.015-2.973 14.205-11.56 24.88-9.813 5.128.839 8.01 3.404 13.386 4.812-2.281-3.322-8.847-5.987-13.743-6.719-13.407-2.006-19.242 10.56-30.383 11.13-3.852.198-7.41-.63-10.821-.415 2.192-6.546 8.9-5.66 15.12-8.28 10.03-4.227 19.707-15.201 35.344-11.303 1.77.441 3.935 1.59 5.981 2.481-.27 3.898.342 8.57.851 13.249.49 4.499.092 9.635 1.848 12.365 1.604 2.494 5.513 2.564 8.523 3.342 2.162 6.61 6.806 11.023 12.044 15.336 2.74 2.257 5.964 5.432 10.069 5.084-.29-1.938-2.173-1.671-3.397-2.325-4.75-2.537-9.926-7.088-13.224-11.402-1.992-2.606-2.981-5.72-4.19-8.736l.185-3.052c.628-.58 1.54 2.301 3.162 2.311 1.178-2.165-2.887-3.717-1.818-5.058 1.407-.696 2.435 2.71 4.294 3.086.934-2.117-2.213-3.646-2.55-4.631 7.573-.977 10.871 5.679 15.702 9.43 5.332 4.14 11.814 6.831 21.303 6.468 1.787-.068 3.632.027 4.841-2.064-1.119-1.145-2.412.091-3.553.257-7.435 1.08-15.722-2.166-20.213-4.99.969-1.974.217-5.558.11-9.654-.074-2.853-.728-6.374-.237-7.791.477-1.374 1.919-.986 2.256-2.221-.043-1.1-1.944-.061-2.086-.597.21-1.593.059-2.867.02-4.24.762-.313 1.457-.698 2.406-.798.747 10.29 6.023 15.657 13.598 20.85 4.906 3.364 9.747 5.422 16.867 5.73.827.035 2.038.78 2.614-.315-.463-1.692-3.238-1.02-4.878-1.236-6.984-.925-13.141-4.922-17.858-8.853-4.937-4.114-8.302-9.972-8.392-17.237-.155-12.417 5.687-23.93 14.486-29.057zm-.055 28.276c2.607.335 4.799-4.867 2.788-7.137-4.301-1.065-6.134 6.708-2.788 7.137zm3.781 3.763c-1.05.928-.127 2.963-.269 4.46-2.268 1.786-3.73-.465-4.337-2.382-2.709 1.713.81 5.445 3.754 4.232-.885 3.485 5.42 6.101 6.451 2.51-1.944.046-5.812.443-5-3.129.938-1.2 2.901-1.244 3.474-2.854-.972-1.286-2.183-2.363-4.073-2.837zm18.505 2.057c-2.938-1.07-4.218 1.714-4.292 4.69 2.634 3.202 6.899-1.934 4.292-4.69z"
        fill="#fff"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M138.815 27.011c2.022.95 3.437 2.438 5.703 3.172.102.868-.563.87-.568 1.615-1.72-1.366-4.135-2.116-6.175-3.2.3-.581.646-1.11 1.04-1.587zM163.8 38.886c.203 1.148-1.13.565-1.259 1.339-.36.91.744.526.385 1.437-.701.798-1.154 1.875-2.256 2.22-1.094 5.632-10.483 9.897-16.125 5.392-6.251-4.992.313-16.895 3.874-21.211 5.677 3.12 11.665 5.966 15.381 10.823zm-14.362-8.17c-1.945 1.692-5.272 8.567-4.774 12.673.598 4.925 7.823 6.12 11.577 3.526 2.656-1.835 3.757-4.548 4.505-8.212-3.116-3.241-7.518-5.344-11.308-7.987z"
        fill="#F6917E"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M160.746 38.702c-.748 3.665-1.848 6.378-4.504 8.212-3.755 2.594-10.98 1.399-11.578-3.525-.498-4.107 2.83-10.982 4.774-12.674 3.79 2.644 8.192 4.746 11.308 7.987zm-13.803 6.002c3.066 4.984 12.127.247 12.101-5.162-2.846-2.59-6.623-4.357-9.734-6.714-.667 3.471-4.627 8.202-2.367 11.876z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.109 27.65c.602.026.276.192.206.484-3.201 3.829-6.983 7.005-9.87 11.188 1.699 2.032 5.38 1.38 8.152 1.67 6.77.707 14.465 1.455 20.107 2.86.688 10.949-.393 23.464.78 33.983-4.609-2.241-8.096-10.664-15.425-10.12-3.984.295-6.59 3.953-6.482 9.742-1.82-.908-4.691-.882-6.245-2.026-1.294-6.833-2.637-16.434-2.742-24.909-.04-3.195-.516-7.41.402-10.58.718-2.477 3.558-4.684 5.345-6.512 2.014-2.06 3.756-3.994 5.772-5.78z"
        fill="#F7ACB3"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M149.31 32.83c3.111 2.355 6.888 4.122 9.734 6.713.026 5.409-9.036 10.146-12.101 5.162-2.26-3.674 1.7-8.405 2.367-11.876zm-.041 8.48c1.188-.382 3.08-1.14 2.52-2.675-1.491.04-3.129 1.084-2.52 2.675zm.023 3.536c2.314.246 4.498-1.765 5.424-3.914-2.763.228-4.154 2.003-5.424 3.914zM75.686 29.806c.308 1.95.242 4.231.073 6.603-2.489.538-5.034 1.012-7.411 1.675 2.453-2.752 5.134-5.245 7.338-8.278z"
        fill="#fff"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M151.79 38.634c.56 1.536-1.332 2.294-2.52 2.676-.61-1.591 1.029-2.635 2.52-2.676z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.87 37.024l-.255 4.226c-5.997-.837-12.187-1.503-18.504-2.057 5.591-1.305 12.234-2.751 18.76-2.169z"
        fill="#fff"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M154.716 40.931c-.925 2.15-3.109 4.16-5.424 3.915 1.27-1.912 2.661-3.687 5.424-3.915z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M171.769 43.608c.096.878.552 1.437.314 2.611-2.846-.887-5.931-1.563-8.815-2.416 1.024-4.037 5.217-.05 8.501-.195z"
        fill="#F6917E"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117.461 44.812c2.011 2.27-.181 7.472-2.788 7.138-3.346-.43-1.513-8.202 2.788-7.138zM122.527 58.552c-.573 1.61-2.536 1.654-3.473 2.854-.813 3.572 3.055 3.175 4.999 3.129-1.031 3.59-7.335.975-6.451-2.51-2.943 1.213-6.463-2.52-3.754-4.232.608 1.916 2.069 4.168 4.338 2.383.142-1.498-.781-3.533.269-4.462 1.889.475 3.1 1.55 4.072 2.838zM132.667 62.46c.074-2.976 1.354-5.76 4.292-4.69 2.608 2.756-1.658 7.892-4.292 4.69z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162.281 75.793c9.481 2.048 14.117 8.388 16.935 16.339-.43 1.186-.735 2.513-.945 3.949-2.528 3.929-6.705 5.6-8.362 9.63-2.083 5.063-2.275 10.525-5.15 15.007-1.358 2.117-5.853 6.962-8.499 7.972-7 2.671-14.05.861-22.711 1.223-10.144.425-13.095 11.889-24.095 12.452-4.877.25-9.119-.579-12.88-1.483-4.211-1.011-7.707-4.092-12.973-3.845-4.991.235-6.78 3.444-11.077 3.81-7.709.658-12.075-3.093-15.65-6.362-1.728-1.58-3.38-3.941-5.591-5.051-6.005-3.013-15.18.882-21.338-1.992-2.562-1.196-5.436-3.84-6.459-6.281-1.667-3.978-.25-8.308-3.08-11.497-2.807-3.166-9.744-2.696-10.396-7.461-.662-4.84 3.285-10.048 5.022-12.895 6.801 1.803 13.38-3.625 21.522-1.059 2.881.908 5.372 3.743 7.898 5.896 13.434 11.451 35.664 20.55 62.543 18.615 6.223-.448 12.843-1.261 17.877-3.165 2.658-1.006 4.802-2.633 7.538-3.787.863-.365 1.947-.344 2.876-.77 2.121-.97 4.506-3.598 6.933-5.474 2.41-1.864 5.058-3.476 6.698-5.487 1.268-1.557 3.292-3.928 2.055-6.71-1.606.502-1.504 2.703-2.369 4.098-.618.995-1.53 1.685-2.271 2.456-.655.682-1.209 2.128-1.979 1.53 2.795-3.369 4.659-7.787 6.183-12.589 4.671-1.503 8.687-3.746 11.745-7.069zm-3.448 14.168c1.922.492 3.043-3.154 2.454-5.508-2.928-2.051-4.325 3.988-2.454 5.508zm7.547-.017c2.471 1.922 5.007-.95 5.85-3.182-2.159-1.046-5.26.823-5.85 3.182zm-16.822 9.12c.002 2.431 6.385 2.293 5.974-1.29-1.817-1.092-5.975-.683-5.974 1.29zM24.894 93.91c-.964 3.25 3.688 4.56 6.075 4.844-.1-3.183-3.113-4.934-6.075-4.844zm7.331 15.288c2.78-.375 3.735-2.809 4.348-5.629-2.322-1.158-4.535 3.148-4.348 5.629zm117.624 8.501c1.779-1.59 2.964-3.847 3.48-6.86-3.343-1.492-7.4 5.586-3.48 6.86zm-15.607-7.067c-2.532.776-1.339 6.437 1.027 6.424 2.335-1.603.087-5.11-1.027-6.424zm-88.767 1.721c.18.064.464.034.456.263 2.276-.065 3.019-4.116 2.248-5.992-2.384.129-2.9 3.505-2.704 5.729zm67.275 6.646c1.445 1.051 3.496 3.569 5.746 2.467.241-2.386-5.132-5.725-5.746-2.467zm-49.36 1.268c2.53 1.246 5.325-1.052 6.322-3.154-2.016-1.567-5.796.614-6.322 3.154zm22.364.64c-.557 2.914 2.694 5.422 5.576 5.285-.315-3.014-3.2-6.18-5.576-5.285zm22.97 10.103c2.977.187 1.936-4.455 1.557-6.268-3.064-.561-2.105 4.849-1.557 6.268zm-32.992-.338c2.517.516 4.42-1.655 4.748-4.427-2.207-1.959-5.155 1.873-4.748 4.427z"
        fill="#FDD5C4"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M161.287 84.453c.589 2.354-.533 6-2.455 5.507-1.87-1.519-.473-7.558 2.455-5.507zM172.23 86.761c-.843 2.232-3.379 5.104-5.851 3.182.591-2.358 3.692-4.227 5.851-3.182z"
        fill="#797078"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M180.15 96.193c.203-.031.217.105.222.249 3.055 10.214 1.367 26.04-4.597 33.187-1.49 1.786-4.234 3.388-6.683 5.253-2.333 1.777-4.423 3.921-6.67 5.018-2.891 1.413-6.732 2.548-10.386 4.088-11.319 4.769-26.183 6.542-40.828 8.38-28.647 3.596-59.003-1.85-80.412-11.679-4.589-2.107-9.422-6.451-12.576-10.42-4.845-6.098-8.586-14.21-8.437-24.31.758-.425 1.166.836 1.809 1.287 1.89 1.327 6.506 2.137 7.776 4.004 1.786 2.626 1.055 6.779 2.224 10.031 2.073 5.767 8.691 9.516 17.36 9.295 4.11-.106 7.325-1.056 11.057.43 4.363 1.738 6.713 7.028 11.693 9.424 2.148 1.034 5.552 2.218 9.3 2.21 4.8-.01 8.026-3.735 12.735-3.946 3.8-.17 7.087 2.573 11.094 3.732 5.615 1.625 14.992 2.47 19.998.734 6.707-2.326 10.99-10.982 18.372-11.383 9.031-.491 16.362 1.941 24.384-1.594 2.747-1.211 6.227-4.851 7.986-7.296 1.638-2.277 3.119-5.074 4.005-7.771.942-2.863.989-6.364 2.447-9.279 1.987-3.971 6.592-5.311 8.127-9.644z"
        fill="#FFE6CD"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M155.532 97.774c.411 3.583-5.972 3.721-5.974 1.29-.001-1.974 4.157-2.383 5.974-1.29zM30.968 98.752c-2.386-.283-7.038-1.593-6.074-4.844 2.962-.09 5.974 1.66 6.074 4.844zM36.573 103.567c-.613 2.82-1.567 5.255-4.348 5.629-.187-2.481 2.025-6.787 4.348-5.629zM153.329 110.838c-.516 3.013-1.701 5.271-3.48 6.86-3.92-1.274.137-8.352 3.48-6.86zM135.269 117.055c-2.366.013-3.559-5.648-1.028-6.424 1.115 1.314 3.363 4.821 1.028 6.424zM48.179 106.623c.771 1.876.027 5.926-2.248 5.992.007-.229-.277-.2-.456-.264-.196-2.223.32-5.6 2.704-5.728zM118.496 121.465c-2.25 1.102-4.301-1.416-5.746-2.468.614-3.257 5.987.082 5.746 2.468zM69.712 117.112c-.997 2.103-3.791 4.4-6.321 3.155.525-2.541 4.305-4.721 6.32-3.155zM91.33 126.192c-2.882.137-6.133-2.371-5.576-5.286 2.377-.894 5.261 2.272 5.576 5.286zM110.282 124.74c.378 1.814 1.419 6.455-1.558 6.269-.548-1.42-1.507-6.829 1.558-6.269zM80.48 126.245c-.329 2.772-2.231 4.943-4.748 4.427-.407-2.554 2.541-6.386 4.747-4.427z"
        fill="#797078"></path>
      <path
        d="M132.991 72.888a4.64 4.64 0 0 0 4.642-4.64 4.64 4.64 0 0 0-4.642-4.638 4.64 4.64 0 1 0 0 9.278zM107.947 59.294a4.64 4.64 0 0 0 4.642-4.638 4.64 4.64 0 0 0-4.642-4.64 4.64 4.64 0 1 0 0 9.279z"
        fill="#F7D6D2"></path>
      <path
        d="M132.38 66.199s7.772-.72 17.415 5.897M131.948 67.925s8.06 1.582 13.961 8.774M131.085 69.22s6.477 5.178 9.211 9.781M109.495 52.678s-2.734-11.65-9.5-14.816M107.948 54.656s-5.218-9.458-9.104-10.896M106.328 55.842s-5.037-4.603-8.347-5.034"
        stroke="#797078"></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h187v155H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

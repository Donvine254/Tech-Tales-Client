export const Graph = ({ className, size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-pointer ${className}`}>
      <title>Blog Views</title>
      <line x1="18" x2="18" y1="20" y2="8" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="18" x2="18" y1="20" y2="12" />
      <line x1="6" x2="6" y1="20" y2="14" />
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
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export const Trash = ({ size = 20, stroke = 1 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
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
export const Edit = ({ size = 20, stroke = 1 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
};

export const Like = ({ handleClick, className, title, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={handleClick}>
    <title>{title}</title>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const Comment = ({ handleClick, size = 24, className }) => (
  <svg
    viewBox="0 0 640 512"
    fill="currentColor"
    height={size}
    width={size}
    className={`cursor-pointer ${className}`}
    strokeWidth="1"
    onClick={handleClick}>
    <path d="M208 0c114.9 0 208 78.8 208 176s-93.1 176-208 176c-18.7 0-36.8-2.3-54.1-6.2-30.6 19-74.77 38.2-128.95 38.2-9.98 0-19.02-5.9-22.932-15.1-3.914-9.2-2.025-19.8 4.721-27 .521-.4 22.641-24.5 38.991-56C17.18 255.8 0 217.6 0 176 0 78.8 93.13 0 208 0zm-43.4 298.1c14.6 4.2 29.2 5.9 43.4 5.9 88.2 0 160-57.4 160-128S296.2 48 208 48 48 105.4 48 176c0 35.2 17.71 61.2 32.57 76.9l23.53 24.9-15.79 30.3c-3.57 6-7.58 13.8-11.76 20.4 17.71-5.1 35.15-13 52.15-24.4l16.7-9.5 19.2 3.5zm277-169.9C552 132.4 640 209.5 640 304c0 41.6-17.2 79.8-45.7 109.9 16.3 31.5 38.4 55.6 39 56 6.7 7.2 8.6 17.8 3.8 27-3 9.2-12.1 15.1-22.1 15.1-54.1 0-98.3-19.2-128.9-38.2-17.3 3.9-35.4 6.2-54.1 6.2-82 0-152.9-40.2-186.8-98.5 17.3-2.3 33.9-6.2 49.7-11.6 28 37.2 79 62.1 137.1 62.1 14.2 0 28.8-1.7 43.4-5.9l19.2-3.5 16.7 9.5c17 11.4 34.4 19.3 52.2 24.4-4.2-6.6-8.2-14.4-11.8-20.4l-15.8-30.3 23.5-24.9c14.9-15.6 32.6-41.7 32.6-76.9 0-66.3-63.3-120.9-144.9-127.4l.9-.6c0-16.5-2.2-32.5-6.4-47.8z" />
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
    height="24"
    width="24"
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
export const Share = ({
  className,
  size = 24,
  handleClick = null,
  stroke = 1,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
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
export const Facebook = ({ className, size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height={size}
    width={size}
    className={`text-blue-500 cursor-pointer ${className}`}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    <title>Facebook</title>
  </svg>
);

export const Twitter = ({ className }) => (
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
    className={`text-blue-500 cursor-pointer ${className}`}>
    <title>Twitter</title>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
export const Whatsapp = ({ className, size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#25D366"
    height={size}
    width={size}
    title="Whatsapp"
    className={`cursor-pointer ${className}`}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
    <title>Whatsapp</title>
  </svg>
);
export const Copy = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`cursor-pointer ${className}`}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    <title>Copy</title>
  </svg>
);

export const Clipboard = () => (
  <svg
    width="170"
    height="151"
    viewBox="0 0 170 151"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M108.089 21.167L25.9238 25.6455L31.4516 126.409L113.617 121.931L108.089 21.167Z"
        fill="#F5F7F8"
      />
      <path
        d="M169.998 55.572L92.1865 28.8896L59.2529 124.315L137.065 150.997L169.998 55.572Z"
        fill="#F5F7F8"
      />
      <path
        d="M167.431 50.0266L89.6191 23.3442L56.6856 118.769L134.497 145.452L167.431 50.0266Z"
        fill="#64B564"
      />
      <path
        d="M94.6134 33.5453L66.918 113.793L129.503 135.254L157.199 55.0063L94.6134 33.5453Z"
        fill="white"
      />
      <path
        d="M101.168 48.8861L100.245 51.561L129.672 61.6516L130.595 58.9766L101.168 48.8861Z"
        fill="#D0E8D0"
      />
      <path
        d="M99.5462 53.5868L98.623 56.2617L140.667 70.679L141.59 68.004L99.5462 53.5868Z"
        fill="#D0E8D0"
      />
      <path
        d="M97.9232 58.2913L97 60.9663L139.044 75.3836L139.967 72.7086L97.9232 58.2913Z"
        fill="#D0E8D0"
      />
      <path
        d="M93.055 72.3924L92.1318 75.0674L121.558 85.1579L122.481 82.483L93.055 72.3924Z"
        fill="#D0E8D0"
      />
      <path
        d="M91.433 77.0941L90.5098 79.769L132.554 94.1863L133.477 91.5113L91.433 77.0941Z"
        fill="#D0E8D0"
      />
      <path
        d="M89.8099 81.7982L88.8867 84.4731L130.931 98.8904L131.854 96.2154L89.8099 81.7982Z"
        fill="#D0E8D0"
      />
      <path
        d="M85.0267 95.6556L84.1035 98.3306L113.53 108.421L114.453 105.746L85.0267 95.6556Z"
        fill="#D0E8D0"
      />
      <path
        d="M83.4046 100.357L82.4814 103.032L124.526 117.449L125.449 114.775L83.4046 100.357Z"
        fill="#D0E8D0"
      />
      <path
        d="M81.7816 105.057L80.8584 107.732L122.903 122.15L123.826 119.475L81.7816 105.057Z"
        fill="#D0E8D0"
      />
      <path
        d="M56.6855 118.772L72.4387 124.174L113.622 121.928L108.567 29.8431L89.6195 23.3457L56.6855 118.772Z"
        fill="#009089"
      />
      <path
        d="M66.9189 113.793L93.7934 123.008L113.622 121.927L109.043 38.4919L94.6145 33.5444L66.9189 113.793Z"
        fill="#E6E6E6"
      />
      <path
        d="M100.247 51.5637L109.943 54.8884L109.775 51.8395L101.17 48.8887L100.247 51.5637Z"
        fill="#92C892"
      />
      <path
        d="M99.5472 53.5903L98.624 56.2653L110.237 60.2475L110.069 57.1983L99.5472 53.5903Z"
        fill="#92C892"
      />
      <path
        d="M97.9251 58.292L97.002 60.967L110.531 65.6064L110.364 62.5572L97.9251 58.292Z"
        fill="#92C892"
      />
      <path
        d="M92.1338 75.0713L111.413 81.6823L111.246 78.6334L93.0569 72.396L92.1338 75.0713Z"
        fill="#92C892"
      />
      <path
        d="M91.4342 77.0977L90.5107 79.7726L111.707 87.0411L111.54 83.9922L91.4342 77.0977Z"
        fill="#92C892"
      />
      <path
        d="M89.8109 81.8013L88.8877 84.4766L112.001 92.4022L111.834 89.353L89.8109 81.8013Z"
        fill="#92C892"
      />
      <path
        d="M84.1064 98.3322L112.869 108.195L112.702 105.146L85.0296 95.6572L84.1064 98.3322Z"
        fill="#92C892"
      />
      <path
        d="M83.4056 100.36L82.4824 103.035L113.162 113.556L112.995 110.507L83.4056 100.36Z"
        fill="#92C892"
      />
      <path
        d="M113.29 115.866L81.7838 105.062L80.8604 107.737L113.457 118.915L113.29 115.866Z"
        fill="#92C892"
      />
      <path
        d="M102.612 16.1128L20.4473 20.5913L25.975 121.355L108.14 116.876L102.612 16.1128Z"
        fill="#64B564"
      />
      <path
        d="M95.0133 24.5654L28.9268 28.1675L33.5753 112.904L99.6618 109.302L95.0133 24.5654Z"
        fill="white"
      />
      <path
        d="M71.2053 10.0776C70.5337 4.87289 65.935 0.989673 60.5941 1.281C55.2532 1.57232 51.107 5.93233 51.0089 11.1791L38.9199 11.8384L39.9526 30.6504L84.3269 28.23L83.2943 9.41807L71.2053 10.0776ZM61.3078 14.2853C59.2716 14.3962 57.5308 12.8412 57.4193 10.8115C57.308 8.78175 58.868 7.04663 60.9043 6.93541C62.9405 6.82449 64.6813 8.3795 64.7928 10.4092C64.9041 12.4389 63.3438 14.1744 61.3078 14.2853Z"
        fill="#D0E8D0"
      />
      <path
        d="M64.7935 10.4095C64.9048 12.4392 63.3448 14.1744 61.3085 14.2856L62.1404 29.4407L84.3276 28.2306L83.2949 9.41867L71.2059 10.0779C70.5344 4.87289 65.9356 0.989673 60.5947 1.281L60.9052 6.93541C62.9412 6.82449 64.6819 8.3798 64.7935 10.4095Z"
        fill="#92C892"
      />
      <path
        d="M49.9196 48.5353C51.2846 46.0025 50.3312 42.8462 47.7902 41.4856C45.2491 40.125 42.0826 41.0753 40.7176 43.6082C39.3526 46.141 40.306 49.2973 42.8471 50.6579C45.3881 52.0185 48.5546 51.0682 49.9196 48.5353Z"
        fill="#D0E8D0"
      />
      <path
        d="M46.7659 76.0975C49.6502 76.0547 51.9535 73.6893 51.9106 70.8143C51.8676 67.9392 49.4945 65.6433 46.6102 65.6861C43.7259 65.7289 41.4225 68.0944 41.4655 70.9694C41.5085 73.8444 43.8815 76.1404 46.7659 76.0975Z"
        fill="#D0E8D0"
      />
      <path
        d="M53.2344 95.8542C53.4562 92.9875 51.3046 90.4844 48.4287 90.2633C45.5527 90.0421 43.0414 92.1868 42.8196 95.0535C42.5978 97.9202 44.7494 100.423 47.6253 100.645C50.5013 100.866 53.0125 98.7209 53.2344 95.8542Z"
        fill="#D0E8D0"
      />
      <path
        d="M45.4966 49.8504L41.3311 46.1291L43.4358 43.7883L45.2528 45.4116L50.5934 39.4722L52.9417 41.5702L45.4966 49.8504Z"
        fill="#64B564"
      />
      <path
        d="M46.842 74.3684L42.6768 70.6471L44.7812 68.3064L46.5985 69.9297L51.9388 63.9902L54.2871 66.0882L46.842 74.3684Z"
        fill="#64B564"
      />
      <path
        d="M48.189 98.8894L44.0234 95.1681L46.1282 92.8274L47.9452 94.4507L53.2858 88.5112L55.6341 90.6092L48.189 98.8894Z"
        fill="#64B564"
      />
      <path
        d="M71.8664 38.2264L57.3418 39.0181L57.4968 41.8427L72.0214 41.051L71.8664 38.2264Z"
        fill="#D0E8D0"
      />
      <path
        d="M85.4634 42.467L57.6152 43.9849L57.7702 46.8095L85.6184 45.2916L85.4634 42.467Z"
        fill="#D0E8D0"
      />
      <path
        d="M85.7359 47.4308L57.8877 48.9487L58.0426 51.7733L85.8909 50.2554L85.7359 47.4308Z"
        fill="#D0E8D0"
      />
      <path
        d="M73.2278 63.0482L58.7031 63.8398L58.8581 66.6645L73.3827 65.8728L73.2278 63.0482Z"
        fill="#D0E8D0"
      />
      <path
        d="M86.8238 67.2887L58.9756 68.8066L59.1305 71.6312L86.9788 70.1133L86.8238 67.2887Z"
        fill="#D0E8D0"
      />
      <path
        d="M87.0973 72.2546L59.249 73.7725L59.404 76.5971L87.2522 75.0792L87.0973 72.2546Z"
        fill="#D0E8D0"
      />
      <path
        d="M74.5764 87.6097L60.0518 88.4014L60.2067 91.226L74.7313 90.4343L74.5764 87.6097Z"
        fill="#D0E8D0"
      />
      <path
        d="M88.1724 91.8498L60.3242 93.3677L60.4792 96.1923L88.3274 94.6744L88.1724 91.8498Z"
        fill="#D0E8D0"
      />
      <path
        d="M88.4449 96.8166L60.5967 98.3345L60.7516 101.159L88.5998 99.6412L88.4449 96.8166Z"
        fill="#D0E8D0"
      />
      <path
        d="M10.1354 7.26764C11.06 6.51205 12.1534 6.04151 13.0891 5.75109C13.5309 5.61422 13.5309 4.994 13.0891 4.85714C12.1534 4.56701 11.0597 4.09648 10.1354 3.34059C10.1105 3.32031 10.0875 3.29735 10.0672 3.2726C9.30913 2.35092 8.83708 1.26107 8.54572 0.328357C8.40841 -0.112057 7.78619 -0.112057 7.64888 0.328357C7.35782 1.26107 6.88577 2.35092 6.12774 3.2726C6.1074 3.29735 6.08436 3.32031 6.05953 3.34059C5.13488 4.09618 4.04151 4.56671 3.10579 4.85714C2.66396 4.994 2.66396 5.61422 3.10579 5.75109C4.04151 6.04122 5.13488 6.51175 6.05953 7.26764C6.08436 7.28791 6.1074 7.31087 6.12774 7.33562C6.88577 8.2573 7.35782 9.34715 7.64888 10.2799C7.78619 10.7203 8.40841 10.7203 8.54572 10.2799C8.83678 9.34715 9.30883 8.257 10.0672 7.33562C10.0875 7.31087 10.1105 7.28791 10.1354 7.26764Z"
        fill="#64B564"
      />
      <path
        d="M165.447 137.218C166.372 136.462 167.465 135.991 168.401 135.701C168.843 135.564 168.843 134.944 168.401 134.807C167.465 134.517 166.372 134.047 165.447 133.291C165.422 133.271 165.399 133.248 165.379 133.223C164.621 132.301 164.149 131.211 163.858 130.279C163.72 129.838 163.098 129.838 162.961 130.279C162.67 131.211 162.198 132.301 161.439 133.223C161.419 133.248 161.396 133.271 161.371 133.291C160.446 134.046 159.353 134.517 158.417 134.807C157.975 134.944 157.975 135.564 158.417 135.701C159.353 135.991 160.447 136.462 161.371 137.218C161.396 137.238 161.419 137.261 161.439 137.286C162.197 138.207 162.669 139.297 162.961 140.23C163.098 140.67 163.72 140.67 163.858 140.23C164.149 139.297 164.621 138.207 165.379 137.286C165.399 137.261 165.422 137.238 165.447 137.218Z"
        fill="#64B564"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="170" height="151" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);
export const GithubIcon = ({ className, size = 24 }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 16 16"
    height={size}
    width={size}
    title="Github"
    className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const NewTwitterIcon = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    title="Twitter"
    className={`cursor-pointer ${className}`}
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
      fill="#222222"></path>
  </svg>
);

export const UserIcon = ({ className, size = 24 }) => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="blue"
    title="login"
    className={`cursor-pointer ${className}`}>
    <path d="M18 20a6 6 0 0 0-12 0" />
    <circle cx="12" cy="10" r="4" />
    <circle cx="12" cy="12" r="10" />
  </svg>;
};

export const BlogIcon = ({ className }) => {
  <svg
    version="1.1"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#06b6d4 "
    height={48}
    width={48}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <rect
          x="293.186"
          y="307.184"
          width="131.572"
          height="112.986"></rect>{" "}
        <rect x="87.243" y="308.893" width="154.448" height="17.162"></rect>{" "}
        <rect x="87.243" y="401.298" width="154.448" height="17.162"></rect>{" "}
        <rect x="87.243" y="355.1" width="154.448" height="17.162"></rect>{" "}
        <path d="M416.428,0.004H95.58C42.787,0.013,0.016,42.792,0,95.577v303.685 c0.025,62.262,50.463,112.717,112.742,112.734h286.524c62.27-0.017,112.717-50.464,112.734-112.734V95.577 C511.992,42.792,469.212,0.013,416.428,0.004z M464.805,399.262c-0.008,18.15-7.308,34.424-19.198,46.34 c-11.916,11.891-28.19,19.19-46.34,19.198H112.742c-18.15-0.009-34.433-7.308-46.348-19.198 c-11.892-11.916-19.182-28.19-19.198-46.34V118.696h417.61V399.262z"></path>{" "}
        <path d="M88.96,267.908h34.583c19.71,0,31.642-8.581,31.642-26.548c0-10.852-6.167-18.368-12.2-20.648v-0.268 c6.034-3.352,10.592-9.519,10.592-19.432c0-14.489-9.251-24.268-29.086-24.268H88.96c-0.796,0-1.332,0.536-1.332,1.34v88.475 C87.628,267.371,88.164,267.908,88.96,267.908z M107.338,193.495c0-0.528,0.251-0.804,0.804-0.804h13.944 c7.5,0,11.925,3.888,11.925,10.584c0,6.712-4.425,10.734-11.925,10.734h-13.944c-0.553,0-0.804-0.268-0.804-0.804V193.495z M107.338,229.955c0-0.528,0.251-0.795,0.804-0.795h15c8.061,0,12.343,4.424,12.343,11.405c0,7.097-4.282,11.396-12.343,11.396h-15 c-0.553,0-0.804-0.276-0.804-0.812V229.955z"></path>{" "}
        <path d="M181.516,267.908h59.404c0.796,0,1.332-0.536,1.332-1.349v-14.874c0-0.813-0.536-1.341-1.332-1.341h-40.224 c-0.544,0-0.804-0.268-0.804-0.812v-71.447c0-0.804-0.528-1.34-1.341-1.34h-17.036c-0.805,0-1.332,0.536-1.332,1.34v88.475 C180.183,267.371,180.711,267.908,181.516,267.908z"></path>{" "}
        <path d="M292.708,269.374c15.963,0,28.558-7.366,33.251-22.115c2.011-6.301,2.539-11.396,2.539-24.938 c0-13.542-0.528-18.637-2.539-24.939c-4.693-14.739-17.288-22.114-33.251-22.114c-15.956,0-28.558,7.375-33.243,22.114 c-2.02,6.302-2.556,11.397-2.556,24.939c0,13.542,0.536,18.637,2.556,24.938C264.149,262.009,276.752,269.374,292.708,269.374z M278.361,202.746c2.011-6.301,6.847-10.055,14.346-10.055c7.508,0,12.335,3.754,14.346,10.055 c1.073,3.226,1.474,7.634,1.474,19.576c0,11.924-0.402,16.357-1.474,19.567c-2.011,6.31-6.838,10.072-14.346,10.072 c-7.5,0-12.335-3.763-14.346-10.072c-1.064-3.21-1.475-7.643-1.475-19.567C276.886,210.38,277.297,205.972,278.361,202.746z"></path>{" "}
        <path d="M387.961,269.374c16.081,0,28.685-8.171,33.251-22.794c1.6-4.952,2.263-12.46,2.263-20.505v-7.517 c0-0.788-0.536-1.333-1.332-1.333h-31.366c-0.813,0-1.349,0.545-1.349,1.333v12.888c0,0.796,0.536,1.332,1.349,1.332h12.326 c0.536,0,0.805,0.277,0.805,0.805c0,3.879-0.403,6.703-1.073,8.991c-1.878,6.026-7.777,9.386-14.614,9.386 c-7.91,0-12.88-3.763-14.891-10.072c-1.064-3.21-1.466-7.643-1.466-19.567c0-11.941,0.402-16.223,1.466-19.441 c2.011-6.302,6.847-10.19,14.631-10.19c7.5,0,12.05,3.218,15.678,9.385c0.269,0.67,0.939,0.939,1.886,0.67l14.338-6.033 c0.796-0.402,0.947-1.206,0.536-2.019c-4.299-10.995-15.419-19.425-32.439-19.425c-16.232,0-28.835,7.375-33.527,22.114 c-2.012,6.302-2.556,11.397-2.556,24.939c0,13.542,0.545,18.637,2.556,24.938C359.126,262.009,371.73,269.374,387.961,269.374z"></path>{" "}
      </g>{" "}
    </g>
  </svg>;
};

export const EditArchiveIcon = ({ className }) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    height="24"
    width="24"
    className={className}>
    <path d="M4 4 H20 A2 2 0 0 1 22 6 V7 A2 2 0 0 1 20 9 H4 A2 2 0 0 1 2 7 V6 A2 2 0 0 1 4 4 z" />
    <path d="M12 13v7M9 16l3-3 3 3M4 9v9a2 2 0 002 2h2M20 9v9a2 2 0 01-2 2h-2" />
  </svg>
);

export const ArchiveIcon = ({ className }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 16 16"
    height="20"
    width="20"
    className={className}>
    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 010 1h-5a.5.5 0 010-1zM.8 1a.8.8 0 00-.8.8V3a.8.8 0 00.8.8h14.4A.8.8 0 0016 3V1.8a.8.8 0 00-.8-.8H.8z" />
  </svg>
);

export const IconEdit = ({ className }) => (
  <svg
    viewBox="0 0 1024 1024"
    fill="currentColor"
    height="20"
    width="20"
    strokeWidth={2}
    className={className}>
    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
  </svg>
);

export const IconEye = ({ className }) => (
  <svg
    viewBox="0 0 576 512"
    fill="currentColor"
    height="20"
    width="20"
    className={className}>
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm144 224c0 79.5-64.5 144-144 144s-144-64.5-144-144 64.5-144 144-144 144 64.5 144 144zm-144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.6-8.4-.2 2.8-.4 5.5-.4 8.4 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-2.8 0-5.6.1-8.4.4 5.3 9.3 8.4 20.1 8.4 31.6z" />
  </svg>
);

export const IconEyeOffSharp = ({ className }) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    height="20"
    width="20"
    className={className}>
    <path d="M63.998 86.004l21.998-21.998L448 426.01l-21.998 21.998zM259.34 192.09l60.57 60.57a64.07 64.07 0 00-60.57-60.57zM252.66 319.91l-60.57-60.57a64.07 64.07 0 0060.57 60.57z" />
    <path d="M256 352a96 96 0 01-92.6-121.34l-69.07-69.08C66.12 187.42 39.24 221.14 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416A233.47 233.47 0 00335 402.2l-53.61-53.6A95.84 95.84 0 01256 352zM256 160a96 96 0 0192.6 121.34L419.26 352c29.15-26.25 56.07-61.56 76.74-96-26.38-43.43-62.9-88.56-101.18-114.82C351.1 111.2 304.31 96 255.76 96a222.92 222.92 0 00-78.21 14.29l53.11 53.11A95.84 95.84 0 01256 160z" />
  </svg>
);
export const ShareIcon = ({ className }) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    height="20"
    width="20"
    className={className}>
    <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304c0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.9-22.2-26.4-22.2-56.8 0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144a31.76 31.76 0 00-34.4-5.4z" />
  </svg>
);

export const FlagIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="20"
    width="20"
    className={className}>
    <path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 001-1V5a1 1 0 00-1-1z" />
  </svg>
);

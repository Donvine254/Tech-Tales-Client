export const ErrorList = ({ errors }) => {
  return (
    <ul className="bg-amber-100 border-2 p-1 flex items-center gap-2 border-amber-300 rounded-md">
      <li>
        <svg viewBox="0 0 1024 1024" fill="#F87272" height="24" width="24">
          <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
        </svg>
      </li>
      {errors.map((errorMessage, index) => {
        return (
          <li
            key={index}
            className="flex flex-col items-start  md:flex-row md:items-center gap-2 my-1 text-red-500">
            <span> {errorMessage}</span>
          </li>
        );
      })}
    </ul>
  );
};

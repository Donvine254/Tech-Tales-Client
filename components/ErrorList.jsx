export const ErrorList = ({ errors }) => {
  return (
    <ul className="bg-amber-100 border-2 p-1 w-full  border-amber-300 rounded-md text-sm">
      {errors.map((errorMessage, index) => {
        return (
          <li key={index} className=" text-red-500 text-center">
            <span> {errorMessage}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default function ErrorPage() {
  return (
    <section className="w-full h-full md:min-h-[600px]">
      <div className="w-full py-2 bg-blue-700  text-white text-xl md:text-2xl  font-bold text-center">
        <p>Error 500: Internal Server Error</p>
      </div>
      <div className="w-full mx-auto  px-8 py-10 min-h-[500px] font-poppins flex flex-col items-center justify-center content-center space-y-4">
        <div className="flex items-center justify-center  text-red-500 w-full font-mono">
          <svg
            viewBox="0 0 320 512"
            fill="currentColor"
            height={150}
            width={150}>
            <path d="M32.5 58.3C35.3 43.1 48.5 32 64 32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32H90.7L70.3 208H184c75.1 0 136 60.9 136 136s-60.9 136-136 136h-83.5c-39.4 0-75.4-22.3-93-57.5l-4.1-8.2c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l4.1 8.2c6.8 13.6 20.6 22.1 35.8 22.1H184c39.8 0 72-32.2 72-72s-32.2-72-72-72H32c-9.5 0-18.5-4.2-24.6-11.5s-8.6-16.9-6.9-26.2l32-176z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="#ef4444" height={150} width={150}>
            <path d="M16.707 2.293A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="#ef4444" height={150} width={150}>
            <path d="M16.707 2.293A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>

        <p className="text-xl md:text-2xl lg:text-3xl font-sans font-bold  from-pink-600  via-purple-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          Sorry, unexpected error happened
        </p>
        <p className="text-gray-500 md:text-xl md:w-1/2 text-center">
          We are working on fixing the issue. If the problem persists, kindly{" "}
          <a
            target="_blank"
            className="font-semibold hover:underline hover:text-blue-500"
            href="mailto:admin@techtales.vercel.app">
            report
          </a>{" "}
          this issue with this status code.
        </p>
      </div>
    </section>
  );
}

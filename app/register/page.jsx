import Link from "next/link";
import {FaLock, FaUserAlt, FaEdit} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md';


export default function page () {

  return (
    <div className="">
      <div className="">
          <h1 className="text-2xl m-5 text-center md:text-left md:text-3xl font-bold lg:text-4xl cursor-pointer">
            Tech Tales{" "}
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
       
      </div>
      <div className="login-page">
        <h1 className="text-xl md:text-2xl font-bold text-center">Welcome on Board</h1>
        <form className="p4 m3">
          <div className="relative">
            <label htmlFor="username">Username: </label>
            <br></br>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="input-field  focus:bg-blue-600"
              required
            />
            <FaUserAlt id="email-icon"/>
          </div>
          <div className="relative">
            <label htmlFor="email">Email: </label>
            <br></br>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input-field  focus:bg-blue-600"
              required
            />
            <MdEmail id="email-icon"/>
          </div>
          <div className="relative">
            <label htmlFor="password">Password :</label>
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              minLength={8}
              required
              className="input-field focus:bg-blue-600"
            />
            <FaLock id="password-icon"/>
          </div>
          <input type="checkbox"/>
          <span> Show Password</span>
          <p className="pt-3">
            By continuing, you agree to the <a className="login__link">Terms and Conditions</a>
          </p>
          <button type="submit" className="login-button">
           <FaEdit/> Register
          </button>
        </form>
        <br></br>
        <div
          className="shadow-lg border p-2 border-blue-500">
          Already signed up? <br className="hidden lg:block"/><Link href="/login" className="login__link">Login Here</Link>
        </div>
      </div>
    </div>
  );
}
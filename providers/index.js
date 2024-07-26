"use client";

import { createContext, useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { baseUrl } from "@/lib";
import Swal from "sweetalert2";
const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = secureLocalStorage.getItem("react_auth_token__");

    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`);
        const data = await response.json();
        setUser(data);
        secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch user", error);
        if (savedUser) {
          secureLocalStorage.removeItem("react_auth_token__");
          setUser(null);
          Swal.fire({
            title: "Session Expired",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "Login",
            showCancelButton: true,
            text: "Your session has expired. Kindly login again to continue.",
            iconColor: "red",
            footer: '<a href="/login">Click here to login again</a>',
            customClass: {
              confirmButton:
                "px-2 py-1 mx-2 rounded-md bg-green-500 text-white hover:text-white hover:bg-green-500 focus:outline-none",
              cancelButton: "px-2 py-1 mx-2 rounded-md bg-red-500 text-white",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              if (typeof window !== "undefined" && window) {
                window.location.href = "/login";
              }
            }
          });
        }
        secureLocalStorage.removeItem("react_auth_token__");
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}

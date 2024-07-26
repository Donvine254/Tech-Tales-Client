"use client";

import { createContext, useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { baseUrl } from "@/lib";

const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = secureLocalStorage.getItem("react_auth_token__");
    if (savedUser) {
      setUser(savedUser);
    }
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`);
        const data = await response.json();
        secureLocalStorage.setItem("react_auth_token__");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
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

import React from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [User, setUser] = React.useState(null);

  // Get the logged-in user from local storage

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update local storage whenever the user state changes
  React.useEffect(() => {
    if (User) {
      localStorage.setItem("user", JSON.stringify(User));
    } else {
      localStorage.removeItem("user");
    }
  }, [User]);

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect } from "react";

export default function checkUser() {
  const { User } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => {
      const user = User || localStorage.getItem("user");

      if (!user) {
        navigate("/login");
      }
    };
    check();
  }, [navigate, User]);
}

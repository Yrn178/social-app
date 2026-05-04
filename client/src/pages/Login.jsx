import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const Login = () => {
  const setUser = useStore((s) => s.setUser);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name) return alert("Введите имя");

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);
    setUser({ ...data.user, name });

    navigate("/");
  };

  return (
    <div className="login">
      <h2>Вход</h2>
      <input
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Login;
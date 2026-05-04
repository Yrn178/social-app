import { Link } from "react-router-dom";
import useStore from "../store";

const Navbar = () => {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">SparQ</div>
        <div className="nav-links">
          <Link to="/">Новости</Link>
          <Link to="/profile">Моя страница</Link>
          <Link to="/create">Создать пост</Link>
          {user ? (
            <button onClick={() => setUser(null)}>Выйти</button>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
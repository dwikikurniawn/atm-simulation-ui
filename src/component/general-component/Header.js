import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../utils/CommonsItem";

function Header({ title }) {
  const history = useNavigate();
  const handleLogout = () => {
    removeUserSession();
    history("/login");
  };
  return (
    <div class="message-header">
      <img
        width="80"
        height="28"
        src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png"
      />
      <p>{title}</p>
      {title == "Login Page" ? (
        <button class="delete" aria-label="delete"></button>
      ) : (
        <input
          className="button is-link is-light is-medium-small is-outlined"
          type="button"
          onClick={handleLogout}
          value="Logout"
        />
      )}
    </div>
  );
}

export default Header;

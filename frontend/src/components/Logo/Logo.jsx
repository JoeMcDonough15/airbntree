import { FaTree } from "react-icons/fa";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container flex-container">
      <div className="icon-container flex-container">
        <FaTree style={{ color: "green" }} />
      </div>
      <p className="logo-text">
        <span className="brown-logo-text">Airbn</span>Tree
      </p>
    </div>
  );
};

export default Logo;

import { Link } from "react-router";

export default function Nav (props) {
  return (
    <div className="nav">
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/trade">
        <div>Trade</div>
      </Link>
      <Link to="/settings">
        <div>Settings</div>
      </Link>
    </div>
  );
}
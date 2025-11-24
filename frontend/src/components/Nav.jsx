import { Link } from "react-router";

export default function Nav() {
  return (
    <div className="nav">
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/trade">
        <div>Trade</div>
      </Link>
      <Link to="/credits">
        <div>Credits</div>
      </Link>
      <Link to="/quiz">
        <div>Quiz</div>
      </Link>
      <Link to="/settings">
        <div>Settings</div>
      </Link>
    </div>
  );
}

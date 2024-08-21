import { Link } from "react-router-dom";

function LinkButton({ children, to, handleClick }) {
  const styles = "text-sm text-blue-500 hover:text-blue-900 hover:underline";

  if (handleClick) {
    return (
      <Link className={styles} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}

export default LinkButton;

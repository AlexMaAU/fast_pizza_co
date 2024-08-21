import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const navigate = useNavigate();
  // useRouteError 用来获取路由创建函数中的 errorElement，当路径无法匹配或者loader出错时产生的错误对象
  const error = useRouteError(); // 对应：App.jsx中 的 errorElement: <Error />

  function handleClick() {
    navigate(-1);
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton handleClick={handleClick}>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;

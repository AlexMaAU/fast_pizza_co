import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const user = useSelector((store) => store.user);

  return (
    // 1. 使用Tailwind是默认从小屏幕到大屏幕
    // 2. 这里的sm表示当屏幕尺寸大于这个的时候才适用sm:后面的内容，不然就是使用不加前缀的部分
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-14 text-center text-xl font-bold md:text-4xl md:font-bold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, <br />
          straight to you.
        </span>
      </h1>
      {!user.username ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {user.username}
        </Button>
      )}
    </div>
  );
}

export default Home;

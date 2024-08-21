import Header from "./Header";
import CardOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // Navigate 是一个 React 组件，用于在渲染过程中进行导航。它用于在组件中直接发起导航，并且通常在 JSX 中使用
  // useNavigate 是一个 React Hook，用于在函数组件内部进行编程式导航。它允许你在组件的逻辑中进行导航操作，比如在事件处理函数中
  // useNavigation有state，会显示loading状态。当useNavigation的state改变时，整个组件就会重新渲染一次
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CardOverview />
    </div>
  );
}

export default AppLayout;

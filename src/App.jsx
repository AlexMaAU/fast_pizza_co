import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// Styled with tailwind

// React Router 6.4+ 的版本，推荐使用 createBrowserRouter() 创建路由
// 路由的定义都写在数组里
const router = createBrowserRouter([
  {
    // element 是一个 React 元素，表示当路由匹配时渲染的组件。
    element: <AppLayout />, // 布局组件，会默认把 children 里定义的组件渲染在 <Outlet> 中
    // errorElement放置在最上方，表示不会包裹在AppLayout里，所以Error会单独整页显示
    errorElement: <Error />, // 处理当路径无法匹配或者loader出错时显示的页面
    // children 是一个包含子路由的数组，用于定义嵌套路由。它允许你定义一个父路由，并在这个路由下定义多个子路由。每个子路由都可以继承父路由的布局或结构。
    children: [
      {
        path: "/", // 路由页面
        element: <Home />, // 对应页面组件
      },
      {
        path: "/menu",
        element: <Menu />,
        // loader用于获取API数据
        loader: menuLoader, // 新的React Router里，API数据获取直接写入到loader里
        // errorElement放置在children里，表示会包裹在AppLayout里，不会独占一页
        // 如果 children 里的路由没有单独定义 errorElement，那么所有错误都会统一到父级的 errorElement 中处理
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        // action用户提交/修改/删除API数据
        action: createOrderAction, // 新的React Router里，API数据提交绑定到action里
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  // 然后通过 RouterProvider 来使用路由
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

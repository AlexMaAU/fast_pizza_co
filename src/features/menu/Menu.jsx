import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem";

function Menu() {
  // 新版的React Router 可以使用 useLoaderData 钩子访问在路由组件中加载器（loader）函数返回的数据
  // 不再需要使用 useEffect，使得代码更可读可维护，而且API调用和页面渲染是同时进行，API调用是在路由层面被调用的，而不是在这个页面组件渲染后
  // useEffect的话是页面组件先渲染后再开始执行API调用
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Menu页面的data loader，用于具体的API数据获取逻辑
// 然后把这个loader导出给React Router进行绑定
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

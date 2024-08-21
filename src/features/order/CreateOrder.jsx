import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../utils/store";
import { clearCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // useNavigate 用于在编程方式中进行导航。它可以在组件中进行路由跳转，改变当前的 URL，或者执行其他导航操作
  // useNavigation 用于访问导航状态。它提供了有关当前导航状态的信息，比如是否正在加载、是否正在过渡等。
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const user = useSelector((store) => store.user);

  // useActionData 包括的数据:
  // 服务器响应数据、表单提交结果、
  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart);

  if (!cart.cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* 表格提交需要使用React Router里自带的Form */}
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          {/* input是Tailwind的代码复用，定义在index.css里的@layer components里 */}
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={user.username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className="text-xs">{formErrors.phone}</p>}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* Tailwind的复用优先选择通过React组件复用来实现 */}
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Submitting" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// 当React Router的Form被提交后，React Router会调用这个action函数
export async function action({ request }) {
  const formData = await request.formData(); // 表单数据（通常是 FormData 对象）
  const data = Object.fromEntries(formData); // 将表单数据（通常是 FormData 对象）转换为一个 JavaScript 对象

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on", // 把priority转换成True/False
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your correct phone number";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // If everything is okay, create new order and redirect
  // 调用创建order的API - API出问题
  // const newOrder = await createOrder(order);

  // 在action中使用store的dispatch方法，因为useDispatch钩子只能在组件中使用，这里需要直接导入store对象，然后使用store对象的dispatch
  // Do NOT overuse - 会导致redux的优化功能在这个页面上停用
  store.dispatch(clearCart());

  // useNavigate钩子只能在组件内使用，action不是组件，只是普通函数
  // 所以需要使用redirect方法
  return redirect(`/order/IIDSAT`);
}

export default CreateOrder;

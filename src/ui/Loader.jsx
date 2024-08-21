function Loader() {
  return (
    // 当你将一个元素的 position 属性设置为 absolute 时，它会从正常的文档流中脱离，并根据其最近的定位祖先元素进行定位。如果没有定位祖先（即没有 position 为 relative、absolute、fixed 或 sticky 的祖先），它将相对于视口（即浏览器窗口）进行定位。
    // inset-0 将元素的四个边（上、右、下、左）都设置为 0，这意味着元素的每一边都贴合其包含块的对应边缘，从而使元素填充整个包含块
    // 如果没有为其设置定位的父元素，absolute 和 inset-0 将使元素相对于视口进行定位，因此它会填充整个视口（即整个浏览器窗口）。
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader">Loading...</div>
    </div>
  );
}

export default Loader;

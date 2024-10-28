export default {
  mounted(el, binding) {
    let startX, startY, initialLeft, initialTop;
    const parent = el.parentElement; // 获取父元素
    const canvas = parent.querySelector('.canvas'); // 获取 class 为 canvas 的 div
    // 获取父元素的滚动位置修正
    const getScrollOffset = () => {
      return {
        scrollLeft: parent.scrollLeft,
        scrollTop: parent.scrollTop
      };
    };
    // 获取元素的边界限制
    const getParentBounds = () => {
      return el.getBoundingClientRect();
    };
    // 鼠标按下事件，初始化起始数据
    const onMouseDown = (evt) => {
      evt.preventDefault();
      // 如果点击的是子元素，阻止事件
      // if (evt.target !== el) return;
      const { scrollLeft, scrollTop } = getScrollOffset();
      startX = evt.clientX + scrollLeft;
      startY = evt.clientY + scrollTop;
      initialLeft = evt.offsetX + scrollLeft;
      initialTop = evt.offsetY + scrollTop;
      
      canvas.style.left = `${initialLeft}px`;
      canvas.style.top = `${initialTop}px`;
      // 开始监听鼠标移动和抬起事件
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    // 鼠标移动事件，更新元素位置及大小
    const onMouseMove = (evt) => {
      const { scrollLeft, scrollTop } = getScrollOffset();
      const moveX = (evt.clientX + scrollLeft) - startX;
      const moveY = (evt.clientY + scrollTop) - startY;

      // 边界检查
      const parentBounds = getParentBounds();
      let newWidth = Math.abs(moveX);
      let newHeight = Math.abs(moveY);
      
      if(initialLeft + newWidth > parentBounds.width){ // 右
        newWidth = parentBounds.width - initialLeft - 8; // 减去8px的缩放按钮
      }
      if(initialTop + newHeight > parentBounds.height) { //下
        newHeight = parentBounds.height - initialTop;
      }
      // 设置 canvas 的宽高
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      // 根据鼠标移动方向设置 canvas 的位置
      if (moveX < 0) {
        canvas.style.left = `${(initialLeft + moveX) < 0 ? 0 : (initialLeft + moveX)}px`;
      }
      if (moveY < 0) {
        canvas.style.top = `${(initialTop + moveY) < 0 ? 0 : (initialTop + moveY)}px`;
      }
    };

    // 鼠标抬起事件，移除事件监听
    const onMouseUp = () => {
      const finalWidth = canvas.offsetWidth;
      const finalHeight = canvas.offsetHeight;
      finalWidth >= 30 && finalHeight >= 30 && binding.value({
        x: parseFloat(canvas.style.left),
        y: parseFloat(canvas.style.top),
        width: finalWidth,
        height: finalHeight
      })
      
      canvas.style = {}
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // 为元素添加鼠标按下事件监听
    el.addEventListener('mousedown', onMouseDown);
  },
  unmounted(el) {
    // 移除事件监听，避免内存泄漏
    el.removeEventListener('mousedown', onMouseDown);
  }
};

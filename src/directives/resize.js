export default {
  mounted(el, binding) {
    let pointer,zone;
    let startX, startY, initialWidth, initialHeight, initialLeft, initialTop;
    const corners = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];
    const borderLimit = 4
    el.addEventListener('mousedown', handleMouseDown);
    // 获取元素的边界限制
    const getParentBounds = () => {
      return el.parentNode.parentNode.querySelector('.img-canvas').getBoundingClientRect();
    };
    function handleMouseDown(e) {
      pointer = e.target.className;
      if (!corners.includes(pointer)) {
          return;
      }
      e.stopPropagation();
      zone = el.parentNode;
      startX = e.clientX;
      startY = e.clientY;
      initialWidth = zone.offsetWidth;
      initialHeight = zone.offsetHeight;
      initialLeft = zone.offsetLeft;
      initialTop = zone.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    const onMouseMove = (evt) => {
      const dx = evt.clientX - startX;
      const dy = evt.clientY - startY;
      const parentBounds = getParentBounds();
      if (pointer.includes('r')) {
        let newWidth = Math.min(initialWidth + dx, parentBounds.width - initialLeft - borderLimit);
        zone.style.width = `${newWidth}px`;
      }
      if (pointer.includes('b')) {
        let newHeight = Math.min(initialHeight + dy, parentBounds.height - initialTop - borderLimit);
        zone.style.height = `${newHeight}px`;
      }
      if (pointer.includes('l')) {
        let newLeft =  Math.max(borderLimit, initialLeft + dx)
        let newWidth = (initialLeft + initialWidth) - newLeft
        zone.style.width = `${newWidth}px`;
        zone.style.left = `${newLeft}px`;
      }
      if (pointer.includes('t')) {
        let newTop = Math.max(borderLimit, initialTop + dy)
        let newHeight = (initialTop + initialHeight) - newTop
        zone.style.height = `${newHeight}px`;
        zone.style.top = `${newTop}px`;
      }
    }
    const onMouseUp = () => {
      if (binding.value) {
        binding.value({x: zone.offsetLeft, 
          y: zone.offsetTop,
          width: zone.offsetWidth,
          height: zone.offsetHeight
        });
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
}
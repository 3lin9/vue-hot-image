export default {
  mounted(el, binding) {
    let pointer,zone;
    let startX, startY, initialWidth, initialHeight, initialLeft, initialTop;
    const corners = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];
    el.addEventListener('mousedown', handleMouseDown);
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
      if (pointer.includes('r')) {
        zone.style.width = `${initialWidth + dx}px`;
      }
      if (pointer.includes('b')) {
        zone.style.height = `${initialHeight + dy}px`;
      }
      if (pointer.includes('l')) {
        zone.style.width = `${initialWidth - dx}px`;
        zone.style.left = `${initialLeft + dx}px`;
      }
      if (pointer.includes('t')) {
        zone.style.height = `${initialHeight - dy}px`;
        zone.style.top = `${initialTop + dy}px`;
      }
    }
    const onMouseUp = () => {
      if (binding.value) {
        binding.value({x: zone.offsetLeft, 
          y: zone.offsetTop,
          width: zone.offsetWidth,
          height: zone.offsetHeight});
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
}
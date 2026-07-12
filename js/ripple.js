document.addEventListener("click", function(e) {
  
  const target = e.target.closest(
    "button,.file-card,.subject-card,.date-card"
  );
  
  if (!target) return;
  
  const ripple =
    document.createElement("span");
  
  ripple.className = "ripple";
  
  const rect =
    target.getBoundingClientRect();
  
  const size =
    Math.max(rect.width, rect.height);
  
  ripple.style.width = size + "px";
  ripple.style.height = size + "px";
  
  ripple.style.left =
    (e.clientX - rect.left - size / 2) + "px";
  
  ripple.style.top =
    (e.clientY - rect.top - size / 2) + "px";
  
  target.appendChild(ripple);
  
  setTimeout(function() {
    
    ripple.remove();
    
  }, 600);
  
});
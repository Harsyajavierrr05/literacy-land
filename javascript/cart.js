function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const item = products.find(p => p.id === productId);
  if (!item) return;
  cart.push(item);
  saveCart(cart);
  updateCartBadge();
  showToast(`${item.title} ditambahkan ke keranjang!`);
}


function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  el.textContent = `(${cart.length})`;
}


function showToast(msg) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}


function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

(function restoreTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
})();


document.addEventListener("DOMContentLoaded", updateCartBadge);

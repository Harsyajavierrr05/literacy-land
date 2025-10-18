function getCart() {
  // Jika tidak ada, kembalikan array kosong
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/** Menyimpan data keranjang ke LocalStorage. */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/** Menambahkan produk ke keranjang. Dipanggil dari Katalog atau Detail Produk. */
function addToCart(productToAdd) {
  const cart = getCart();

  // Memastikan data produk valid
  if (!productToAdd || !productToAdd.id || !productToAdd.title || productToAdd.price === undefined) {
    console.error("Data produk tidak valid:", productToAdd);
    showToast("Gagal menambahkan produk: Data tidak lengkap.");
    return;
  }

  // Mencari item yang sudah ada
  const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);

  if (existingItemIndex > -1) {
    // Jika produk sudah ada, tambahkan kuantitasnya
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
  } else {
    // Jika produk baru, tambahkan
    cart.push({
      id: productToAdd.id,
      title: productToAdd.title,
      price: productToAdd.price,
      // Gunakan image_url atau image dari objek produk
      image: productToAdd.image_url || productToAdd.image, 
      quantity: 1 // Inisialisasi kuantitas
    });
  }

  saveCart(cart);
  updateCartBadge(); // Perbarui badge di Navbar
  showToast(`${productToAdd.title} berhasil ditambahkan!`);
}

/* ---------- CART BADGE (Di Navbar) ---------- */

/** Memperbarui hitungan total item di Navbar (badge). */
function updateCartBadge() {
  // ID dari elemen span di Navbar yang menampilkan jumlah item (e.g., Cart (3))
  const el = document.getElementById("cart-count"); 
  if (!el) return;
  const cart = getCart();
  
  // Hitung total kuantitas dari semua item di keranjang
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  // Tampilkan total
  el.textContent = `(${totalItems})`; 
}

/* ---------- TOAST NOTIFICATION (Interaktivitas JS) ---------- */

/** Menampilkan notifikasi popup kecil di sudut layar. */
function showToast(msg) {
  // Hapus toast yang sudah ada sebelum membuat yang baru
  document.querySelectorAll('.toast-alert').forEach(t => t.remove());

  let toast = document.createElement("div");
  toast.className = "toast-alert"; // Class kustom untuk styling di design.css
  toast.innerText = msg;
  document.body.appendChild(toast);
  
  // Menampilkan Toast
  setTimeout(() => toast.classList.add("show"), 10);
  
  // Menyembunyikan dan menghapus Toast
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500); // Tampil selama 2.5 detik
}


function updateCartQuantity(productId, newQuantity) {
    let cart = getCart(); // Dari common.js
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart); 
    }
}

// Tambahkan ke common.js (di bawah function saveCart)

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart); // Simpan keranjang yang sudah di-filter
}

function updateCartQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
    }
}

/* ---------- INIT ON LOAD ---------- */

// Panggil updateCartBadge saat dokumen dimuat untuk memastikan hitungan keranjang benar
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    // Panggil updateNavbarLoginStatus() dari auth.js jika login.html sudah diintegrasikan
});
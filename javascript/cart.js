import { getCart, updateCartBadge, showToast } from './common.js';
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById("cart-items");

  // --- LOGIKA UTAMA: MERENDER KERANJANG ---
  function renderCart() {
    // Mengambil data dari common.js
    const cart = getCart(); 
    cartItemsContainer.innerHTML = ''; 

    // --- Tampilan Keranjang Kosong ---
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="col-12 py-5 text-center">
          <p class="h4 text-secondary mb-4">Keranjang Anda kosong. Segera lengkapi koleksi Anda!</p>
          <a href="catalog.html" class="btn btn-primary btn-lg">Mulai Belanja</a>
        </div>
      `;
      return;
    }

    let total = 0;
    
    // Siapkan wadah item list (col-md-8) dan Summary (col-md-4)
    const itemList = document.createElement('div');
    const summaryCol = document.createElement('div');
    
    itemList.className = 'col-md-8';
    summaryCol.className = 'col-md-4';
    
    // Membuat list item
    cart.forEach(item => {
      total += item.price * (item.quantity || 1); 
      
      itemList.innerHTML += `
        <div class="card mb-3 shadow-sm">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${item.image_url || item.image}" class="img-fluid rounded-start" 
                   style="height: 120px; object-fit: contain; padding: 10px;" alt="${item.title}">
            </div>
            <div class="col-md-9">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text text-success fw-bold">Rp${Number(item.price).toLocaleString('id-ID')}</p>
                  <input type="number" min="1" value="${item.quantity || 1}" data-product-id="${item.id}" 
                         class="quantity-input form-control form-control-sm w-auto">
                </div>
                <button class="btn btn-danger btn-sm remove-from-cart-btn" data-product-id="${item.id}">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    // --- SUMMARY TOTAL (Bagian Kanan) ---
    summaryCol.innerHTML = `
      <div class="card shadow p-4 bg-light">
        <h4 class="fw-bold">Ringkasan Belanja</h4>
        <div class="h5 fw-bold text-primary mb-3">Total: Rp${total.toLocaleString('id-ID')}</div>
        <button class="btn btn-success btn-lg checkout-btn w-100">Lanjutkan Pembayaran (Simulasi)</button>
      </div>
    `;

    // Pasang kedua kolom ke container utama
    cartItemsContainer.appendChild(itemList);
    cartItemsContainer.appendChild(summaryCol);

    // --- Event Listeners (Wajib agar tombol berfungsi) ---

    // 1. Tombol Hapus (Logic: memanggil fungsi hapus dan merender ulang)
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            // Anda perlu mendefinisikan/menggunakan fungsi removeFromCart di common.js
            // Anggaplah common.js memiliki fungsi ini: removeFromCart(productId);
            renderCart(); // Render ulang
            updateCartBadge(); // Perbarui badge
            showToast('Item dihapus.');
        });
    });

    // 2. Tombol Checkout (Simulasi)
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        // Anggaplah Anda memiliki fungsi handleDummyCheckout()
        // Panggil dan kosongkan keranjang
        // localStorage.removeItem('cart');
        showToast('Pesanan berhasil diproses! Terima kasih.');
        setTimeout(() => {
            renderCart();
            updateCartBadge();
        }, 1500);
    });

    // Anda perlu menambahkan logic untuk quantity-input change juga
  }


  renderCart(); 
});
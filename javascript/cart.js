document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById("cart-items");

  // Logika utama: Merender tampilan keranjang
  function renderCart() {
    const cart = getCart(); // Diambil dari common.js
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center">
          <h4>Keranjang Anda Kosong</h4>
          <a href="catalog.html" class="btn btn-primary mt-3">Belanja Sekarang</a>
        </div>
      `;
      return;
    }

    let total = 0;

    // Siapkan struktur kolom
    const itemList = document.createElement('div');
    const summaryCol = document.createElement('div');

    itemList.className = 'col-md-8';
    summaryCol.className = 'col-md-4';

    // Looping item keranjang
    cart.forEach(item => {
      const itemTotal = item.price * (item.quantity || 1); // Hitung total harga per item
      total += itemTotal; // Tambahkan ke total keseluruhan

      const itemRow = document.createElement('div');
      itemRow.className = 'card mb-3 shadow-sm';
      itemRow.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">Harga Satuan: Rp${item.price.toLocaleString('id-ID')}</p>
              <p class="card-text">Total: <strong>Rp${itemTotal.toLocaleString('id-ID')}</strong></p>
              <div class="d-flex align-items-center">
                <label for="quantity-${item.id}" class="me-2">Jumlah:</label>
                <input type="number" id="quantity-${item.id}" class="form-control quantity-input" data-product-id="${item.id}" value="${item.quantity}" min="1" style="width: 80px;">
                <button class="btn btn-danger btn-sm ms-3 remove-from-cart-btn" data-product-id="${item.id}">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      `;
      itemList.appendChild(itemRow);
    });

    // Tambahkan Summary Total dan tombol Checkout
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

    // --- Event Listeners untuk Interaksi (Gunakan Helper dari common.js) ---

    // Tombol Hapus 
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            removeFromCart(productId); // Menggunakan helper baru di common.js
            renderCart(); 
            updateCartBadge(); 
            showToast('Item dihapus.'); 
        });
    });

    // Tombol Update Kuantitas
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            const newQuantity = parseInt(event.target.value);
            
            if (newQuantity > 0) {
                updateCartQuantity(productId, newQuantity); // Menggunakan helper baru di common.js
            } else {
                removeFromCart(productId); 
            }
            renderCart(); 
            updateCartBadge();
        });
    });

    // Tombol Checkout
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        // Logika checkout dummy: kosongkan keranjang
        localStorage.removeItem('cart');
        showToast('Pesanan berhasil diproses! Terima kasih.');
        setTimeout(() => {
            renderCart();
            updateCartBadge();
        }, 1500);
    });
  }

  // Panggil renderCart saat halaman dimuat
  renderCart(); 
});
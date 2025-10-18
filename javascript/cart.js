document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById("cart-items");

  // Logika utama: Merender tampilan keranjang
  function renderCart() {
    const cart = getCart(); // Diambil dari common.js
    cartItemsContainer.innerHTML = ''; 

    // (Logika Tampilan Keranjang Kosong)

    let total = 0;
    
    // Siapkan struktur kolom
    const itemList = document.createElement('div');
    const summaryCol = document.createElement('div');
    
    itemList.className = 'col-md-8';
    summaryCol.className = 'col-md-4';
    
    // Looping item keranjang
    cart.forEach(item => {
      total += item.price * (item.quantity || 1); 
      
      // ... (HTML Item List Anda di sini) ...
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
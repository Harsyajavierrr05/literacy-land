document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('product-detail-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    // 1. Fungsi untuk mendapatkan ID dari URL parameter (?id=X)
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productId = parseInt(getQueryParam('id'));

    if (isNaN(productId)) {
        loadingMessage.remove();
        errorMessage.classList.remove('d-none');
        errorMessage.textContent = 'ID produk tidak valid.';
        return;
    }
    
    // 2. Cari Produk di array global 'products' (dari data.js)
    // Asumsi array 'products' ada
    const product = products.find(p => p.id === productId);

    if (product) {
        loadingMessage.remove(); // Hapus pesan loading

        // 3. Render Struktur Grid 2-Kolom (5 kolom untuk gambar, 7 kolom untuk detail)
        detailContainer.innerHTML = `
            <div class="row g-4">
                
                <div class="col-md-5 d-flex justify-content-center align-items-center">
                    <img src="${product.image_url || product.image}" 
                         alt="${product.title}" 
                         class="img-fluid rounded-3 shadow-lg"
                         style="max-height: 450px; object-fit: contain; padding: 15px;">
                </div>

                <div class="col-md-7">
                    <h1 class="display-5 fw-bold text-dark">${product.title}</h1>
                    <p class="text-secondary mb-4">Oleh: ${product.author || 'N/A'}</p>
                    
                    <h2 class="text-success fw-bold mb-3">Rp${Number(product.price).toLocaleString('id-ID')}</h2>
                    
                    <h5 class="mt-4">Deskripsi</h5>
                    <p>${product.description || 'Tidak ada deskripsi tersedia.'}</p>
                    
                    <h5 class="mt-4">Spesifikasi</h5>
                    <ul class="list-unstyled">
                        <li><strong>Genre:</strong> ${product.genre || 'N/A'}</li>
                        <li><strong>Penerbit:</strong> ${product.publisher || 'N/A'}</li>
                    </ul>

                    <div class="mt-4 pt-3 border-top">
                        <button id="add-to-cart-detail-btn" class="btn btn-primary btn-lg me-3" data-product-id="${product.id}">
                            Tambah ke Keranjang
                        </button>
                        <button onclick="window.history.back()" class="btn btn-outline-secondary btn-lg">
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 4. Tambahkan Event Listener ke Tombol Add to Cart
        const addToCartBtn = document.getElementById('add-to-cart-detail-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                // Memanggil fungsi global addToCart dari common.js
                // Kirim objek produk lengkap
                addToCart(product); 
            });
        }

    } else {
        loadingMessage.remove();
        errorMessage.classList.remove('d-none');
        errorMessage.textContent = `Produk dengan ID ${productId} tidak ditemukan.`;
    }
});
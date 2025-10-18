document.addEventListener('DOMContentLoaded', () => {
    const allProductsContainer = document.getElementById("products-all-list");
    
    // TIDAK ADA .slice() - Ambil SEMUA produk
    const productsToRender = products; 

    if (productsToRender.length === 0) {
        allProductsContainer.innerHTML = '<p class="text-center w-100">Belum ada produk dalam katalog.</p>';
        return;
    }

    productsToRender.forEach((item) => {
        const productWrapper = document.createElement('div');
        productWrapper.className = 'col'; 
        
        // Template Literal Card Bootstrap
        productWrapper.innerHTML = `
          <div class="card shadow h-100" data-product-id="${item.id}">
            <img src="${item.image}" class="card-img-top" alt="${item.title}"> 
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text text-success fw-bold mt-auto">Rp${Number(item.price).toLocaleString('id-ID')}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-2">
                <a href="product-detail.html?id=${item.id}" class="btn btn-sm btn-outline-primary">Detail</a>
                <button class="btn btn-primary btn-sm add-to-cart-btn" data-product-id="${item.id}">
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        `;
        allProductsContainer.appendChild(productWrapper);

        // Tambahkan event listener untuk tombol "Tambah ke Keranjang"
        productWrapper.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            // Memanggil fungsi global addToCart dari common.js
            addToCart(item);
        });
    });
});
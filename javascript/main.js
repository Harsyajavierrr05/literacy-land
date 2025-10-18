// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById("featured-products");
    
    // Ambil 4 produk pertama dari array data global (dari data.js)
    const featuredProducts = products.slice(0, 4); 

    featuredProducts.forEach((item) => {
        // --- MEMBUAT LAYOUT CARD DENGAN BOOTSTRAP CLASS ---
        const productWrapper = document.createElement('div');
        productWrapper.className = 'col'; // Class kolom Bootstrap 

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
        featuredContainer.appendChild(productWrapper);

        // Tambahkan event listener untuk tombol "Tambah ke Keranjang"
        productWrapper.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            // Memanggil fungsi global dari common.js
            addToCart(item);
            e.stopPropagation(); // Mencegah klik card memicu detail
        });
    });
});
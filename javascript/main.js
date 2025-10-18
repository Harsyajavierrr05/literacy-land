// js/main.js (Ganti seluruh kontennya)

document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById("featured-products");
    
    // Ambil 4 produk pertama (Produk Unggulan)
    const featuredProducts = products.slice(0, 4); 

    featuredProducts.forEach((item) => {
        const productWrapper = document.createElement('div');
        // Class 'col' dibutuhkan karena parent-nya menggunakan row-cols-md-4
        productWrapper.className = 'col'; 
        
        // Template Literal untuk membuat Card dengan class Bootstrap
        productWrapper.innerHTML = `
          <div class="card shadow h-100" data-product-id="${item.id}">
            <img src="${item.image_url || item.image}" class="card-img-top" alt="${item.title}"> 
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-dark">${item.title}</h5>
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
        productWrapper.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            // Memanggil fungsi global addToCart dari common.js
            addToCart(item);
        });
    });
});
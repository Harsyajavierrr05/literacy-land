// javascript/catalog.js
// Membutuhkan: data.js (array products) dan common.js (addToCart, showToast)

document.addEventListener('DOMContentLoaded', () => {
    const catalogListContainer = document.getElementById("catalog-list");
    const searchInput = document.getElementById("catalogSearchInput");
    const genreFilter = document.getElementById("catalogGenreFilter"); 

    // --- FUNGSI UTAMA: MERENDER PRODUK KE LAYOUT BOOTSTRAP ---
    function renderProducts(productsToDisplay) {
        catalogListContainer.innerHTML = ""; // Bersihkan konten lama

        if (productsToDisplay.length === 0) {
            catalogListContainer.innerHTML = '<p class="text-center w-100">Tidak ada produk yang ditemukan.</p>';
            return;
        }

        productsToDisplay.forEach((item) => {
            const productWrapper = document.createElement('div');
            productWrapper.className = 'col'; // Kelas kolom Bootstrap
            
            // Layout Card Produk (Sama dengan main.js)
            productWrapper.innerHTML = `
              <div class="card shadow h-100" data-product-id="${item.id}">
                <img src="${item.image_url || item.image}" class="card-img-top" alt="${item.title}"> 
                
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
            catalogListContainer.appendChild(productWrapper);

            // Event listener untuk tombol "Tambah ke Keranjang"
            productWrapper.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                addToCart(item); // Memanggil fungsi global dari common.js
            });
        });
    }

    // --- FUNGSI FILTER & SEARCH (Interaktivitas JS Wajib) ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm);
            const matchesGenre = selectedGenre === "" || (product.genre && product.genre === selectedGenre);
            return matchesSearch && matchesGenre;
        });

        renderProducts(filteredProducts);
    }

    // --- INIT ---
    // 1. Isi filter dropdown
    const uniqueGenres = [...new Set(products.map(p => p.genre))].filter(g => g);
    genreFilter.innerHTML = '<option value="">Semua Genre</option>' + uniqueGenres.map(genre => `<option value="${genre}">${genre}</option>`).join('');

    // 2. Tambahkan event listener untuk memicu filter
    searchInput.addEventListener("input", applyFilters);
    genreFilter.addEventListener("change", applyFilters);
    
    // 3. Render semua produk saat pertama kali dimuat
    renderProducts(products);
});
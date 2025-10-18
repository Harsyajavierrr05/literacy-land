document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            if (validateContactForm()) {
                // Tampilkan notifikasi sukses jika validasi berhasil
                showToast('Pesan Anda berhasil dikirim! (Simulasi)'); 
                contactForm.reset(); 
            } else {
                showToast('Mohon periksa kembali input formulir Anda.');
            }
        });
    }

    function validateContactForm() {
        let isValid = true;
        
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        // Validasi Nama
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
        }

        // Validasi Email
        if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Validasi Pesan
        if (messageInput.value.trim().length < 15) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
        }
        
        // Kunci: Bootstrap akan otomatis menampilkan div.invalid-feedback jika class 'is-invalid' ditambahkan
        return isValid;
    }
});
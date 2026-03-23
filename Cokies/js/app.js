document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = CookieManager.get('theme');
    const themeToggle = document.getElementById('theme-toggle');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    } else {
        document.body.classList.remove('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark');
                CookieManager.set('theme', 'dark', 365);
            } else {
                document.body.classList.remove('dark');
                CookieManager.set('theme', 'light', 365);
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            const alertBox = document.getElementById('alert-box');
            
            const showMessage = (msg, isError = true) => {
                alertBox.textContent = msg;
                alertBox.className = `alert visible ${isError ? 'alert-error' : 'alert-success'}`;
            };

            if (password !== confirm) return showMessage('Parolele nu coincid!');

            let users = StorageManager.getLocal('users') || [];

            if (users.length === 0) {
                users = [
                    { id: 1, username: 'admin', password: 'password', email: 'admin@example.com' },
                    { id: 2, username: 'student', password: 'student123', email: 'student@example.com' }
                ];
            }

            if (users.some(u => u.username === username)) return showMessage('Numele de utilizator există deja!');
            if (users.some(u => u.email === email)) return showMessage('Adresa de email este deja folosită!');

            users.push({ id: Date.now(), username: username, email: email, password: password });
            StorageManager.setLocal('users', users);

            showMessage('Cont creat cu succes! Redirecționare...', false);
            setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        });
    }

    const cartTable = document.getElementById('cart-table');
    if (cartTable) {
        const session = StorageManager.getSession('userSession');
        if (!session) window.location.href = 'login.html';

        const products = {
            laptop: { name: 'Laptop', price: 2500 },
            telefon: { name: 'Telefon', price: 1200 },
            tableta: { name: 'Tabletă', price: 800 },
            casti: { name: 'Căști', price: 150 }
        };

        const productSelect = document.getElementById('product-select');
        for (const [key, prod] of Object.entries(products)) {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = `${prod.name} - ${prod.price} RON`;
            productSelect.appendChild(option);
        }

        const cartBody = document.getElementById('cart-body');
        const cartTotalDisplay = document.getElementById('cart-total');

        window.renderCart = function() {
            const cart = StorageManager.getSession('cart') || {};
            cartBody.innerHTML = '';
            let grandTotal = 0;

            if (Object.keys(cart).length === 0) {
                cartBody.innerHTML = '<tr><td colspan="5" class="text-center">Coșul este gol.</td></tr>';
                cartTotalDisplay.textContent = '0';
                return;
            }

            for (const [key, qty] of Object.entries(cart)) {
                if (products[key]) {
                    const prod = products[key];
                    const subtotal = prod.price * qty;
                    grandTotal += subtotal;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${prod.name}</strong></td>
                        <td>${prod.price} RON</td>
                        <td>${qty}</td>
                        <td><strong>${subtotal} RON</strong></td>
                        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${key}')" style="padding: 6px 12px; font-size: 0.8rem;">Șterge</button></td>
                    `;
                    cartBody.appendChild(tr);
                }
            }
            cartTotalDisplay.textContent = grandTotal;
        };

        document.getElementById('add-to-cart-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const prodKey = productSelect.value;
            const qty = parseInt(document.getElementById('product-qty').value);

            let cart = StorageManager.getSession('cart') || {};
            if (cart[prodKey]) {
                cart[prodKey] += qty;
                if (cart[prodKey] > 10) cart[prodKey] = 10;
            } else {
                cart[prodKey] = qty;
            }

            StorageManager.setSession('cart', cart);
            window.renderCart();
        });

        window.removeFromCart = function(key) {
            let cart = StorageManager.getSession('cart') || {};
            delete cart[key];
            StorageManager.setSession('cart', cart);
            window.renderCart();
        };

        document.getElementById('clear-cart-btn').addEventListener('click', () => {
            StorageManager.removeSession('cart');
            window.renderCart();
        });

        window.renderCart();
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            StorageManager.removeSession('userSession');
            StorageManager.removeSession('cart');
            window.location.href = 'login.html';
        });
    }
});
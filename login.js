
    const cartItems = [];

    document.getElementById('loginBtn').addEventListener('click', function() {
        document.getElementById('welcomeMessage').classList.remove('hidden');
        document.getElementById('loginSection').classList.add('hidden');
    });

    document.getElementById('puffsBtn').addEventListener('click', function() {
        toggleVisibility('puffsList');
    });

    document.getElementById('breadsBtn').addEventListener('click', function() {
        toggleVisibility('breadsList');
    });

    document.getElementById('toastsBtn').addEventListener('click', function() {
        toggleVisibility('toastsList');
    });

    function toggleVisibility(id) {
        const lists = document.querySelectorAll('.item-list');
        lists.forEach(list => {
            list.classList.remove('active');
        });
        document.getElementById(id).classList.toggle('active');
    }

    function addToCart(item, price) {
        cartItems.push({ item, price });
        updateCartDisplay();
        alert(item + ' has been added to your cart!');
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartList = document.getElementById('cartItems');
        cartList.innerHTML = '';
        let totalAmount = 0;

        cartItems.forEach((cartItem, index) => {
            const li = document.createElement('li');
            li.textContent = `${cartItem.item} - ₹${cartItem.price.toFixed(2)} `;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartList.appendChild(li);
            totalAmount += cartItem.price;
        });
        
        document.getElementById('bookOrderBtn').classList.toggle('hidden', cartItems.length === 0);
    }

    document.getElementById('bookOrderBtn').addEventListener('click', function() {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
        alert(`Your order has been placed successfully! Total Amount: ₹${totalAmount.toFixed(2)}`);
        cartItems.length = 0;
        updateCartDisplay();
    });


// Selects the main container on the cart page where all cart items will be displayed
const cartContainer = document.querySelector('.container');

// Loads previously added items from localStorage (used so a user can revisit the site and keep their selections)
// If nothing exists, an empty array is used
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Renders all items currently stored in the cart
 * Called on page load & after every cart update
 */
function renderCart() {

  // If no items are present, show simple message instead of UI cards
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-center mt-5">Your cart is empty.</p>';
    
    return;
  }

  /**
   * Calculates total checkout amount by:
   * - Extracting price text from each item
   * - Removing symbols (£)
   * - Converting to number
   * - Summing
   
   */

  
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "")); 
    return sum + price;
  }, 0);

  /**
   * Creates HTML for:
   * - Product cards (title, image, price)
   * - Remove buttons
   * - Checkout summary (total + checkout button)
   * 
   * Bootstrap classes used for responsive layout and visual consistency
   */

  let itemsHTML = `

    <div class="row mt-4">
      ${cart.map((item, index) => `
        <div class="col-md-4 mb-4">
      <div class="card position-relative">
            <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 remove-item" data-index="${index}">
              ✕
        </button>
      <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.price}</p>
      </div>
      </div>
        </div>
  `).join('')}
    </div>

    <!-- TOTAL & CHECKOUT -->
    <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-4">
      <h5 class="m-0">Total: <strong>$${total.toFixed(2)}</strong></h5>
      <button id="checkout-btn" class="btn btn-success px-4">Checkout</button>
    </div>
  `;

  // Updates the page with the dynamically generated cart layout

  cartContainer.innerHTML = itemsHTML;

  /**
   * Enables removal of an individual item:
   * - Attaches a click listener to each red "X"
   * - Uses stored array index to delete specific product
   */

 
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });

  /**
   * Checkout behaviour:
   * - Displays confirmation alert to user
   * - Clears cart from both memory + localStorage
   * - Re-renders empty state
   * 
   * (Future enhancement could redirect to payment success page)
   */

 
  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert(`Thank you! Your total is $${total.toFixed(2)}.`);
    localStorage.removeItem('cart');
    cart = [];
    renderCart();
  });

  
}

/**
 * Removes a product by index:
 * - Updates localStorage
 * - Re-renders cart so UI stays consistent
 */

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initial call to populate cart UI when the page loads

renderCart();

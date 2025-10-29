// Selects all the add to cart buttons to give them function
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const price = card.querySelector('.card-text').textContent;
    const image = card.querySelector('img').src;  

    // Creates an item object
    const item = { title, price, image };

    // Gets existing cart or create a new one
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adds new item
    cart.push(item);

    // Saves to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${title} has been added to your cart!`);
  });
});
function Product(id, productName, price) {
  this.id = id;
  this.productName = productName;
  this.price = price;
}
function CartItem(product, qty) {
  this.product = product;
  this.qty = qty;
  this.getSubTotal = () => this.product.price * this.qty;
}
function Cart() {
  this.items = [];
  this.count = () => {
    return this.items.map((x) => x.qty).reduce((a, b) => a + b, 0);
  };
  this.getTotal = () => {
    return this.items.map((x) => x.getSubTotal()).reduce((a, b) => a + b, 0);
  };
  this.addItem = (product, qty) => {
    qty = parseInt(qty) || 1;
    if (qty < 1) qty = 1;

    const cartItemInCart = this.items.find((x) => x.product.id === product.id);
    if (cartItemInCart) {
      cartItemInCart.qty += qty;
    } else {
      let cartItem = new CartItem(product, qty);
      this.items.push(cartItem);
    }
  };
}
let printer = new Product(1, "Hp 雷射印表機", 3500);
let nb = new Product(2, "Asus i7 15吋筆電", 45000);

let cart = new Cart();

cart.addItem(printer, 1);
cart.addItem(nb, 2);
cart.addItem(printer, 3);

console.log("cart info", cart);
console.log("cart.count", cart.count(), "總金額", cart.getTotal());

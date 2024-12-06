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
    product = product || -1;
    if (product === -1) {
      console.log("product是null 或 undefine");
    }
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
let products = [
  { id: 1, name: "華碩A320 桌機", price: 1000 },
  { id: 2, name: "大日 Dainichi 煤油暖氣機", price: 1500 },
  { id: 3, name: "Boden-奧洛4尺多功能收納升降大茶几", price: 3000 },
];
let myCart = new Cart();
renderProducts(products);

function renderProducts(products) {
  for (let product of products) {
    parseSingleProduct(product); // 解析單筆產品
  }
}
function parseSingleProduct(product) {
  const container = document.getElementById("container");
  const template = document.getElementById("productTemplate");

  let card = template.content.cloneNode(true);

  initCard(card, product);

  container.appendChild(card);
}

function initCard(card, product) {
  card.getElementById("productName").innerText = product.name;
  card.getElementById("price").innerText = `NT$ ${product.price} `;

  let btnAdd2Cart = card.getElementById("add2Cart");
  btnAdd2Cart.setAttribute("data-productId", product.id);
  btnAdd2Cart.addEventListener("click", addToCart_click);

  let btnIncrement = card.getElementById("btnIncrement");
  btnIncrement.addEventListener("click", btnIncrement_click);
  let btnDecrement = card.getElementById("btnDecrement");
  btnDecrement.addEventListener("click", btnDecrement_click);
}
function btnIncrement_click(e) {
  let btn = e.target;
  let qtyElement = btn.closest("#qtyWrapper").querySelector(".qty");
  qtyElement.value = parseInt(qtyElement.value) + 1;
}
function btnDecrement_click(e) {
  let btn = e.target;
  let qtyElement = btn.closest("#qtyWrapper").querySelector(".qty");
  const currentQty = parseInt(qtyElement.value);
  qtyElement.value = currentQty <= 1 ? 1 : currentQty - 1;
}
function addToCart_click(e) {
  let btn = e.target;
  let productId = btn.getAttribute("data-productId");
  let qty = btn.closest("#productRow").querySelector(".qty").value;

  let product = products.find((x) => x.id == productId);
  myCart.addItem(product, qty);
  document.getElementById("cartQty").innerText = myCart.count();
}

// let printer = new Product(1, "Hp 雷射印表機", 3500);
// let nb = new Product(2, "Asus i7 15吋筆電", 45000);

// let cart = new Cart();

// cart.addItem(printer, 1);
// cart.addItem(nb, 2);
// cart.addItem(printer, 3);

// console.log("cart info", cart);
// console.log("cart.count", cart.count(), "總金額", cart.getTotal());

const btn_showCart = document.getElementById("btn-cart-show");
const btn_hideCart = document.getElementById("btn-cart-hide");
const div_shopping_cart_modal = document.getElementsByClassName("shopping-cart-modal")[0];
const btn_article_option =  document.getElementsByClassName("btn-add-to-cart");
let cartItems = ["", 0];

btn_showCart.addEventListener("click", OnToggleCart);
btn_hideCart.addEventListener("click", OnToggleCart);

for (let index = 0; index < btn_article_option.length; index++) {
  const element = btn_article_option[index];
  element.addEventListener("click", OnItemAddToCart);
}

function OnToggleCart () {
  if (div_shopping_cart_modal.classList.contains("hidden")) {
    div_shopping_cart_modal.classList.remove("hidden");
  }
  else {
    div_shopping_cart_modal.classList.add("hidden");
  }
}

function OnItemAddToCart () {
  let optionName = this.parentElement.getElementsByTagName("option-name")[0].innerHTML;
  let optionPrice = this.parentElement.getElementsByTagName("option-price")[0].innerHTML;
  let itemName = this.parentElement.parentElement.parentElement.getElementsByTagName("product-name")[0].innerHTML;

  CartAddItem(itemName, optionName, optionPrice);
}

function CartRemoveItem (itemID) {
  const itemElement = document.getElementById("cart-item-"+itemID);

  itemElement.remove();
}

function CartAddItem (itemName = "Unknown item",
                      optionName = "Unknown option",
                      optionPrice = 0.00) {
  const div_shopping_cart = document.getElementsByClassName("shopping-cart-modal-articles")[0];
  
  console.log(itemName);
  console.log(optionName);
  console.log(optionPrice);
  
  if (!cartItems.includes(itemName)) {
    let cartItemID = cartItems.push(itemName | cartItems.length);
    
    let div = document.createElement("div");
    div.className = "cart-item";
    div.id = "cart-item-"+cartItemID;

    let cart_item_name = document.createElement("p");
    cart_item_name.innerHTML = itemName;

    let div2 = document.createElement("div");

    let cart_product_option = document.createElement("p");
    cart_product_option.innerHTML = optionName;

    let cart_product_price = document.createElement("p");
    cart_product_price.innerHTML = optionPrice+"$";

    let btn_cart_remove_item = document.createElement("button");
    btn_cart_remove_item.type = "button";
    btn_cart_remove_item.innerHTML = "Retirer l'article";
    btn_cart_remove_item.addEventListener("click", function () { CartRemoveItem(cartItemID); });

    div_shopping_cart.appendChild(div);
    div.appendChild(cart_item_name);
    div.appendChild(div2);
    div2.appendChild(cart_product_option);
    div2.appendChild(cart_product_price);
    div2.appendChild(btn_cart_remove_item);
  }
  // Name exists: increment count
  
}

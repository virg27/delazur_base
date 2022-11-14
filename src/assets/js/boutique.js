import { CCart, CCartItem } from "./Cart.js";

const   cartPtr               = new CCart(document.getElementsByClassName("shopping-cart-modal-articles")[0],
                                          document.getElementsByClassName("shopping-cart-bubble")[0]);
const btn_showCart            = document.getElementById("btn-cart-show");
const btn_hideCart            = document.getElementById("btn-cart-hide");
const div_shopping_cart_modal = document.getElementsByClassName("shopping-cart-modal")[0];
const btn_article_option      = document.getElementsByClassName("btn-add-to-cart");

btn_showCart.addEventListener("click", OnToggleCart);
btn_hideCart.addEventListener("click", OnToggleCart);

// Register event handlers for article 'add to cart' buttons
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
  const optionName  = this.parentElement.getElementsByTagName("option-name")[0].innerHTML;
  const optionPrice = this.parentElement.getElementsByTagName("option-price")[0].innerHTML;
  const itemName    = this.parentElement.parentElement.parentElement.getElementsByTagName("product-name")[0].innerHTML;
  const strItemID   = String(this.parentElement.id);
  const itemID      = Number(strItemID.match(/[0-9]+/g));
  const itemPtr     = new CCartItem(itemID, optionPrice, itemName, optionName);

  // TODO: Error checking

  cartPtr.AddItem(itemPtr);
  console.log(itemID);
  console.log(strItemID);
}

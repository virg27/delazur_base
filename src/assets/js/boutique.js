const btn_showCart = document.getElementById("btn-cart-show");
const btn_hideCart = document.getElementById("btn-cart-hide");
const div_shopping_cart_modal = document.getElementsByClassName("shopping-cart-modal")[0];

/*const btn_article_option =  document.getElementsByClassName();*/

btn_showCart.addEventListener("click", OnToggleCart);
btn_hideCart.addEventListener("click", OnToggleCart);

function OnToggleCart() {
  if (div_shopping_cart_modal.classList.contains("hidden")) {
    div_shopping_cart_modal.classList.remove("hidden");
  }
  else {
    div_shopping_cart_modal.classList.add("hidden");
  }
}

/****************************************************************************
* 
*  Cart.js
* 
*  Simple shopping cart interface:
*
*  Register a new CCart instance, passing references to
*  - a div to be populated with CCartItem objects;
*  - an element representing the cart items counter.
* 
***/


/**************************************************************************
* 
*  CCart class
* 
***/

class CCart {

  /**************************************************************************
  * 
  *  Privates
  * 
  ***/

  #m_itemsMap       = new Map();
  #m_divElement     = null;
  #m_counterElement = null;
  #m_numItems       = 0;

  //=========================================================================
  #ItemIsInCart (itemID) {
    return this.#m_itemsMap.has(itemID);
  }

  //=========================================================================
  #GenerateHtmlElementForItem (cartItem) {
    if (cartItem) {
      const cartItemID = cartItem.GetItemID();
      let div = document.createElement("div");
      div.className = "cart-item";
      div.id = "cart-item-"+cartItemID;

      let cart_item_name = document.createElement("p");
      cart_item_name.innerHTML = cartItem.GetItemName();

      let div2 = document.createElement("div");

      let cart_product_option = document.createElement("p");
      cart_product_option.innerHTML = cartItem.GetItemOptionName();

      let cart_product_price = document.createElement("p");
      cart_product_price.innerHTML = cartItem.GetItemPrice()+"$";

      let btn_cart_remove_item = document.createElement("button");
      btn_cart_remove_item.type = "button";
      btn_cart_remove_item.innerHTML = "Retirer l'article";
      btn_cart_remove_item.addEventListener("click", function () {
        this.RemoveItem(cartItem)
      }.bind(this));

      this.#m_divElement.appendChild(div);
      div.appendChild(cart_item_name);
      div.appendChild(div2);
      div2.appendChild(cart_product_option);
      div2.appendChild(cart_product_price);
      div2.appendChild(btn_cart_remove_item);
    }
  }

  //=========================================================================
  #UpdateQuantityForItem (cartItem) {
    if (cartItem) {
      const quantity = cartItem.GetItemQuantity();
      const itemNameElement = document.getElementById("cart-item-"+cartItem.GetItemID()).getElementsByTagName("p")[0];
      itemNameElement.innerHTML = cartItem.GetItemName() + " (" + quantity + ")";
    }
  }

  //=========================================================================
  #SetCounterValue (numItems) {
    this.#m_counterElement.innerHTML = numItems;
    if (numItems)
      this.#ShowCounter();
    else
      this.#HideCounter();
  }

  //=========================================================================
  #ShowCounter () {
    this.#m_counterElement.classList.remove("hidden");
  }

  //=========================================================================
  #HideCounter () {
    this.#m_counterElement.classList.add("hidden");
  }
  

  /**************************************************************************
  * 
  *  Externs
  *
  ***/

  //=========================================================================
  constructor (divElement, counterElement) {
    this.#m_divElement      = divElement;
    this.#m_counterElement  = counterElement;
  }

  //=========================================================================
  AddItem (item) {
    let itemID = item.GetItemID()
    if (itemID < 1) {
      console.warn("CCart::AddItem: Skipping item with invalid ID %i", itemID);
      return;
    }

    console.log(item);
    if (this.#ItemIsInCart(itemID)) {
      let itemPtr = this.#m_itemsMap.get(itemID);
      let quantity = itemPtr.GetItemQuantity();
      itemPtr.SetItemQuantity(++quantity);
      this.#UpdateQuantityForItem(itemPtr);
    }
    else {
      this.#m_itemsMap.set(itemID, item);
      this.#GenerateHtmlElementForItem(item);
    }
    this.#m_numItems++;
    this.#SetCounterValue(this.#m_numItems);
  }

  //=========================================================================
  RemoveItem (item) {
    let itemID = item.GetItemID();
    
    document.getElementById("cart-item-"+itemID).remove();
    let itemPtr = this.#m_itemsMap.get(itemID);
    const quantity = itemPtr.GetItemQuantity();
    this.#m_numItems -= quantity;
    this.#m_itemsMap.delete(itemID);
    this.#SetCounterValue(this.#m_numItems);
  }
}


/**************************************************************************
* 
*  CCartItem class
* 
***/

class CCartItem {

  /**************************************************************************
  * 
  *  Privates
  *
  ***/

  #m_id         = -1;
  #m_price      = -1;
  #m_quantity   = -1;
  #m_name       = "";
  #m_optionName = "";


  /**************************************************************************
  * 
  *  Externs
  *
  ***/

  //=========================================================================
  constructor (itemID     = -1,
               price      = -1,
               itemName   = "",
               optionName = "") {
    if (itemID < 1) {
      console.error("CCartItem::CCartItem: invalid itemID value (%i)", itemID);
      return;
    }

    if (price < 0) {
      console.error("CCartItem::CCartItem: invalid price value (%i)", price);
      return;
    }

    if (itemName == "") {
      console.warn("CCartItem::CCartItem: item %i has no name!", itemID);
    }

    if (optionName == "") {
      console.warn("CCartItem::CCartItem: item %i has no option name!", itemID);
    }

    this.#m_id          = itemID;
    this.#m_price       = price;
    this.#m_quantity    = 1;
    this.#m_name        = itemName;
    this.#m_optionName  = optionName;
  }

  //=========================================================================
  GetItemID () {
    return this.#m_id;
  }

  //=========================================================================
  GetItemPrice () {
    return this.#m_price;
  }

  //=========================================================================
  GetItemQuantity () {
    return this.#m_quantity;
  }

  //=========================================================================
  GetItemName () {
    return this.#m_name;
  }

  //=========================================================================
  GetItemOptionName () {
    return this.#m_optionName;
  }

  //=========================================================================
  SetItemQuantity (quantity) {
    this.#m_quantity = quantity;
  }

}

export { CCart, CCartItem };

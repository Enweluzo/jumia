if (!JSON.parse(sessionStorage.getItem("loggedIn"))) {
  location.href = "/Frontend/login.html";
}
const cartOriginal = document.querySelector(".js").innerHTML;
const priceOriginal = document.querySelector(".cart-right").innerHTML;
let gottenData = JSON.parse(sessionStorage.getItem("added-cart"));
let old = { number: 0, price: 0 };
let index = false;
let totalPriceExport;
//add product to cart from sesson storage
function setItem() {
  let htmll;
  let add = "";
  gottenData.forEach((got, index) => {
    htmll = `
              <div class="cart-main-display">
              <div class="image-for-cart">
                  <img style="width: 100%;height: 100%; object-fit: contain;" src="${
                    got.image
                  }" alt="">
              </div>
              <div class="products-details-cart" style="font-size: 19px;">
                  <p class="products-name-cart">${got.name}</p>
                  <p class="p1-cart"> In stock</p>
                  <p style="margin-top: 2px;">
                      <svg width="100" height="25" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
                      <style>
                          .jumia { fill: #1a1a1a; font-family: 'Arial', sans-serif; font-weight: bold; font-size: 32px; }
                          .express { fill: #f37021; font-family: 'Arial', sans-serif; font-weight: bold; font-size: 32px; }
                          .plane { fill: #f37021; }
                      </style>

                      
                      <text x="0" y="40" class="jumia">JUMIA</text>

                      
                      <path class="plane" d="M120 25 L125 35 L140 38 L125 41 L120 51 L117 41 L100 38 L117 35 Z" />

                      
                      <text x="145" y="40" class="express">EXPRESS</text>
                      </svg>
                  </p>
              </div>
              <div class="price-old-price">
                  <p style="text-align: right; font-size: 20px; margin:2px 37px 6px 0">&#8358 ${(
                    got.price * got.cartQuantity
                  ).toFixed(1)}</p>
                
              </div>
          </div>
          <div style="display:flex;border-bottom: 7px #f1f1f2 solid;">
              <button class="remove-button" data-remove-index="${index}" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
              </svg>
                Remove
              </button>
              <div class="quantity">Quantity (${got.cartQuantity})</div>
          </div>
            
            `;
    add = add + htmll;

    newnumber();
  });
  if (gottenData.length === 0) {
    document.querySelector(".js").innerHTML = cartOriginal;
  } else {
    document.querySelector(".js").innerHTML = add;
  }
}
setItem();

//remove product from cart and update sesson storage
let ren = function () {
  document.querySelectorAll(".remove-button").forEach((but) => {
    but.addEventListener("click", () => {
      let i = but.dataset.removeIndex;
      console.log("in");
      gottenData.splice(i, 1);
      sessionStorage.setItem("added-cart", JSON.stringify(gottenData));
      setItem();
      cartDisplay();
      dateUpdate();
      calShipingdef();
      calShiping();
      ren();
      if (gottenData.length === 0) {
        document.querySelector(".cart-right").innerHTML = priceOriginal;
      }
    });
  });
};
ren();

//calculate & display total price
function newnumber(newp) {
  let html = "";
  old.number = 0;
  old.price = 0;
  gottenData.forEach((n) => {
    old.number += n.cartQuantity;
    old.price += n.cartQuantity * n.price;
    html = `
                
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${old.number}):</div>
            <div class="payment-summary-money">&#8358 ${Number(
              old.price.toFixed(1)
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#8358 ${Number(newp).toFixed(
              1
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#8358 ${(
              Number(newp) + Number(old.price.toFixed(1))
            ).toFixed(1)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">&#8358 ${(
              Number(old.price.toFixed(1)) * 0.05
            ).toFixed(1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#8358 ${Number(
              (
                Number(old.price.toFixed(1)) * 0.05 +
                (Number(newp) + Number(old.price.toFixed(1)))
              ).toFixed(1)
            ).toLocaleString()}</div>
          </div>

          <a href="order.html"><button class="place-order-button button-primary">
            Place your order
          </button></a>
        `;
    totalPriceExport = (
      Number(old.price.toFixed(1)) * 0.05 +
      (Number(newp) + Number(old.price.toFixed(1)))
    ).toLocaleString();
    document.querySelector(".cart-right").innerHTML = html;
  });

  sessionStorage.setItem("totalp", totalPriceExport);
}
newnumber();
//Display cart quantity number
let add = 0;
function cartDisplay() {
  add = 0;
  let loopedadd = JSON.parse(sessionStorage.getItem("added-cart"));
  loopedadd.forEach((loop) => {
    add += loop.cartQuantity;
  });
  if (add === 0) {
    document.getElementById("cart").innerHTML = "";
  } else {
    document.getElementById("cart").innerHTML = add;
  }
}
cartDisplay();

//generate date section html
function dateUpdate() {
  let price = 0;
  gottenData.forEach((gottenData) => {
    price += Number(gottenData.price);
  });
  let arrayhtml = "";
  const now = {
    date: dayjs().add(2, "day").format("dddd,  MMMM DD"),
    pricedate: Number((price * 0.05).toFixed(1)),
  };
  const nowp = {
    date: dayjs().add(4, "day").format("dddd,  MMMM DD"),
    pricedate: Number((price * 0.03).toFixed(1)),
  };
  const nowpp = {
    date: dayjs().add(7, "day").format("dddd,  MMMM DD"),
    pricedate: Number((price * 0.015).toFixed(1)),
  };
  const array = [now, nowp, nowpp];
  array.forEach(function (hh, i) {
    let checked = "";
    if (i === 0) {
      checked = "checked";
      index = true;
    } else {
      index = false;
    }
    arrayhtml += `
            <div class="checker">
                <div class="checker-radio"><input data-price="${hh.pricedate}" data-i=" ${index}" class="radio" type="radio" name="radio1" ${checked}></div>
                <div class="shipping">
                    <span class="date">${hh.date}</span> <span>&#8358 ${hh.pricedate}</span>
                </div>
            </div>`;
  });
  document.querySelector(".cart-day-js").innerHTML = arrayhtml;
}
dateUpdate();

//update cart on click
function calShiping() {
  let newp = 0;
  const radios = document.querySelectorAll(".radio");
  radios.forEach((radio) => {
    radio.addEventListener("click", () => {
      if (radio.checked) {
        newp = radio.dataset.price;
      }
      newnumber(newp);
    });
  });
}
calShiping();

//update cart on load
function calShipingdef() {
  let newp = 0;
  const radios = document.querySelectorAll(".radio");
  radios.forEach((radio) => {
    if (radio.dataset.i) {
      if (radio.checked) {
        newp = radio.dataset.price;
      }
      newnumber(newp);
    }
  });
}
calShipingdef();

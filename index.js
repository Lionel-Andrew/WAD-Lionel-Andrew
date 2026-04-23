// function substractQty(index) {
//   let counter = count[index].textContent;
//   counter--;
//   if (counter < 0) {
//     counter = 0;
//   }
//   count[index].textContent = counter;
// }

// function addQty(index) {
//   let counter = count[index].textContent;
//   counter++;
//   if (counter > 10) {
//     counter = 10;
//   }
//   count[index].textContent = counter;
// }

// function changeColor(index) {
//   let current = parseInt(count[index].textContent);
//   if (current > 0) {
//     count[index].style.color = "blue";
//   } else {
//     count[index].style.color = "black";
//   }
// }

// function max(index) {
//   let upperValue = parseInt(count[upperIndex].textContent);
//   let lowerValue = parseInt(count[lowerIndex].textContent);

//   if (lowerValue > upperValue) {
//     count[lowerIndex].textContent = upperValue;
//   }
// }

// const count = document.querySelectorAll(".count");
// const plusButtons = document.querySelectorAll(".plus");
// const minusButtons = document.querySelectorAll(".minus");
// const pizza_img = document.querySelector(".pizza-img");
// const pizza_img_hide = document.querySelector(".img-hide");
// const pizza_img_show = document.querySelector(".img-show");
// let stock = 0;

// plusButtons.forEach((btn, index) => {
//   btn.addEventListener("click", () => {
//     addQty(index);
//     changeColor(index);
//     max(index);
//   });
// });

// minusButtons.forEach((btn, index) => {
//   btn.addEventListener("click", () => {
//     substractQty(index);
//     changeColor(index);
//     max(index);
//   });
// });

// pizza_img_hide.addEventListener("click", function () {
//   pizza_img.style.display = "none";
// });

// pizza_img_show.addEventListener("click", function () {
//   pizza_img.style.display = "block";
// });

let cart = [];
let items = 0;
setupCart();
renderMenus();

function substractQty(menuIndex, variantIndex) {
  items--;
  if (items <= 0) {
    items = 0;
  }
  cart[menuIndex][variantIndex] -= 1;

  if (cart[menuIndex][variantIndex] < 0) {
    cart[menuIndex][variantIndex] = 0;

    const menuName = menus[menuIndex].name;
    const variantName = menus[menuIndex].variants[variantIndex].description;
    alert(`${menuName} - ${variantName} cannot be less than 0`);
  }

  const id = `qty-${menuIndex}-${variantIndex}`;

  document.getElementById(id).innerHTML = cart[menuIndex][variantIndex];
}

function addQty(menuIndex, variantIndex) {
  items++;
  cart[menuIndex][variantIndex] += 1;

  if (
    cart[menuIndex][variantIndex] >
    menus[menuIndex].variants[variantIndex].stock
  ) {
    cart[menuIndex][variantIndex] =
      menus[menuIndex].variants[variantIndex].stock;
    alert(`Stok habis`);
  }

  const id = `qty-${menuIndex}-${variantIndex}`;

  document.getElementById(id).innerHTML = cart[menuIndex][variantIndex];
}

function setupCart() {
  for (let i = 0; i < menus.length; i++) {
    let variantCart = [];
    for (let j = 0; j < menus[i].variants.length; j++) {
      variantCart.push(0);
    }
    cart.push(variantCart);
  }
}

function renderMenus() {
  let menuGrid = "";

  for (let i = 0; i < menus.length; i++) {
    let menuVariantList = "";
    for (let j = 0; j < menus[i].variants.length; j++) {
      const qtyId = `qty-${i}-${j}`;

      menuVariantList += `
                <div class="menu-price-row">
                    <div class="price-description">${menus[i].variants[j].description}</div>
                    <div class="price-and-qty">
                        <h3 class="price">${menus[i].variants[j].price}</h3>
                        <button onclick="substractQty(${i}, ${j})">
                            <span class="material-symbols-outlined">
                                do_not_disturb_on
                            </span>
                        </button>
                        <span class="qty" id="${qtyId}">0</span>
                        <button onclick="addQty(${i}, ${j})">
                            <span class="material-symbols-outlined">
                                add_circle
                            </span>
                        </button>
                    </div>
                </div>
            `;
    }

    menuGrid += `
            <div class="menu-card">
                <img src="${menus[i].photoUrl}" alt="${menus[i].name}" id="pic">
                <h3 class="menu-name">${menus[i].name}</h3>
                <p class="menu-description">${menus[i].description}</p>
                ${menuVariantList}
            </div>
        `;
  }

  document.getElementById("menu-grid").innerHTML = menuGrid;
}

function checkout() {
  if (items === 0) {
    alert("Keranjang masih kosong");
    return;
  }

  let total = 0;

  for (let i = 0; i < menus.length; i++) {
    for (let j = 0; j < menus[i].variants.length; j++) {
      let qty = cart[i][j];
      let price = menus[i].variants[j].price;

      total += qty * price;
    }
  }

  alert(`Total harga: Rp ${total}`);

  resetCart();
}

function resetCart() {
  items = 0;

  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart[i].length; j++) {
      cart[i][j] = 0;

      const id = `qty-${i}-${j}`;
      document.getElementById(id).innerHTML = 0;
    }
  }
}
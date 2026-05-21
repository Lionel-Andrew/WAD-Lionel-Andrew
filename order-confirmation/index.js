let cart = [];

loadCart();

function loadCart() {
  const params = new URLSearchParams(window.location.search);

  cart = JSON.parse(params.get("cart"));

  let display = "";
  let total = 0;

  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];

    for (let j = 0; j < menu.variants.length; j++) {
      const variant = menu.variants[j];

      const qty = cart[i][j];

      if (qty > 0) {
        const subtotal = qty * variant.price;

        total += subtotal;

        display += `
          <div class="item">

            <div>
              <b>${menu.name}</b><br>
              ${variant.description} x ${qty}
            </div>

            <div>
              $${subtotal}
            </div>

          </div>
        `;
      }
    }
  }

  document.getElementById("cart").innerHTML = display;

  document.getElementById("total").innerHTML = `$${total}`;
}

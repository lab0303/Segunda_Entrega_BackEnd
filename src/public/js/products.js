const addToCartForms = document.querySelectorAll("#addToCartForm");
addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formElement = event.target;
    const formData = new FormData(formElement);
    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(obj);
    try {
      const response = await fetch(formElement.action, {
        headers,
        method: "PATCH",
        body,
      });

      if (response.ok) {
        console.log("Producto agregado al carrito con éxito.");
      } else {
        console.error("Error al agregar el producto al carrito.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
});

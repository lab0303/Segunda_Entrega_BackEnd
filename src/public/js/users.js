const deleteUser = document.querySelectorAll("#deleteUser");
deleteUser.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formElement = event.target;

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(formElement.action, {
        headers,
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Usuario eliminado con éxito.");
        location.reload();
      } else {
        console.error("Error al eliminar.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
});

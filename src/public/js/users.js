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

/*const changeRole = document.querySelectorAll("#changeRole");
changeRole.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      console.log(formElement.action);
      const response = await fetch(formElement.action, {
        headers,
        method: "PUT",
        body: {},
      });

      if (response.ok) {
        console.log("Role actualizado.");
      } else {
        console.error("Error al cambiar rol.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
});*/

function changeUserRole(userId) {
  const headers = {
    "Content-Type": "application/json",
  };

  fetch(`/api/users/premium/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({}),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Role actualizado.");
        location.reload();
      } else {
        console.error("Error al cambiar rol.");
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
}

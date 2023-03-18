let productosAuto;


fetch("/Productos/ProductosAuto.json")
  .then(response => response.json())
  .then(data => {
    productosAuto = data;


    for (const producto of productosAuto) {
      if (producto.Antiguedad >= 1960) {// Crear contenedor principal de la tarjeta
        const container = document.createElement("div");
        container.classList.add("container", "d-flex", "justify-content-center");

        // Crear la tarjeta
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "mx-auto", "Tarjetas");
        card.style.width = "18rem";

        // Crear el cuerpo de la tarjeta
        const body = document.createElement("div");
        body.classList.add("card-body", "TarjetasTecho");

        // Añadir el título
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = "Plan Básico";
        body.appendChild(title);

        // Añadir la cuota
        const cuota = document.createElement("p");
        cuota.classList.add("card-text");
        cuota.textContent = `Cuota de $1000 por mes`;
        body.appendChild(cuota);

        // Añadir la lista de características
        const lista = document.createElement("ul");
        lista.classList.add("list-group", "list-group-flush");

        const caracteristicas = ["Responsabilidad civil por daños a terceros", "Responsabilidad civil por muerte de terceros"];

        caracteristicas.forEach(caracteristica => {
          const item = document.createElement("li");
          item.classList.add("list-group-item");
          item.textContent = caracteristica;
          lista.appendChild(item);
        });

        card.appendChild(body);
        card.appendChild(lista);

        // Crear el botón
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "btn-lg", "px-4");
        button.type = "button";
        button.textContent = "Contratar";
        card.appendChild(button);

        // Añadir la tarjeta al contenedor principal
        container.appendChild(card);
        const targetElement = document.querySelector("#fede");
        targetElement.appendChild(container);
      } else {
        console.log("no aplica");
      }
    }

  });
/*1.Crear dinamicamente valores de los nombres de coders como OPTIONs de SELECT */
coders.forEach((coder) => {
  const opcion = document.createElement("option");
  opcion.value = coder.nombre;
  opcion.textContent = coder.nombre;
  document.querySelector("#nombre").appendChild(opcion);
});

//2.Agregamos las ideas a la interfaz
const max = 45;
const min = max - 30;

for (var i = min; i < max; i++) {
  const opcionEdad = document.createElement("option");
  opcionEdad.value = i;
  opcionEdad.textContent = i;
  document.querySelector("#edad").appendChild(opcionEdad);
}

/* 3. Event listener  DOM*/
document.addEventListener("DOMContentLoaded", () => {
  showCoders(coders); //showCoders es una funcion que vamos a crear luego. No hay problema si se llama antes de crearla
  selectCoder();
  console.log(criteriosSeleccionados);
});

// 4. funcion para inyectar cards
function showCoders(coders) {
  const contenedorTarjetas = document.querySelector("#tarjetas");
  limpiar();

  coders.forEach((coder) => {
    const {
      nombre,
      imageUrl,
      detalle,
      promedio,
      especialidad,
      expertoTecnologia,
      direccion,
      celular,
      id,
    } = coder;

    const coderHtml = document.createElement("p");
    coderHtml.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${imageUrl}" class="card-img-top" alt="..."> //
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${detalle}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"></li>
                    <a href='' class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" img="${imageUrl}" promedio = "${promedio}" especialidad = "${especialidad}" expTecnologia = "${expertoTecnologia}" direccion = "${direccion}" celular = "${celular}" nombre = "${nombre}" >Details</a>
                    <a href="#" class="btn btn-primary boton" id = "${id}">Hire</a>
                </ul>
            </div>
          `;
    contenedorTarjetas.appendChild(coderHtml);
  });
}

/*5. declarar objeto con los criterios para la busqueda */

const criteriosSeleccionados = {
  nombreCoder: "",
  edad: "",
  minPromedio: "",
  maxPromedio: "",
  clanRiwi: "",
  nivelIngles: "",
  especialidad: "",
  expertoTecnologia: "",
};

/*6. selectores */
const nombre = document.querySelector("#nombre");
const nombreInput = document.querySelector(".inputNombre");
const edad = document.querySelector("#edad");
const minimoPromedio = document.querySelector("#minimo");
const maximoPromedio = document.querySelector("#maximo");
const clanRiwi = document.querySelector("#clanRiwi");
const nivelIngles = document.querySelector("#nivelIngles");
const especialidad = document.querySelector("#especialidad");
const expertoTecnologia = document.querySelector("#expertoTecnologia");
const pantalla = document.querySelector(".pantalla");

//7. Even Listeners para filtros

nombre.addEventListener("input", (e) => {
  criteriosSeleccionados.nombreCoder = e.target.value;
  /*8. Llamado funcion filter de alto nivel*/
  filtrarCoder();
});

nombreInput.addEventListener("input", (e) => {
  criteriosSeleccionados.nombreCoder = e.target.value;
  filtrarCoder();
});

edad.addEventListener("input", (e) => {
  criteriosSeleccionados.edad = e.target.value;
  filtrarCoder();
});

minimoPromedio.addEventListener("input", (e) => {
  criteriosSeleccionados.minPromedio = e.target.value;
  filtrarCoder();
});

maximoPromedio.addEventListener("input", (e) => {
  criteriosSeleccionados.maxPromedio = e.target.value;
  filtrarCoder();
});

clanRiwi.addEventListener("input", (e) => {
  criteriosSeleccionados.clanRiwi = e.target.value;
  filtrarCoder();
});

nivelIngles.addEventListener("input", (e) => {
  criteriosSeleccionados.nivelIngles = e.target.value;
  filtrarCoder();
});

especialidad.addEventListener("input", (e) => {
  criteriosSeleccionados.especialidad = e.target.value;
  filtrarCoder();
});

expertoTecnologia.addEventListener("input", (e) => {
  criteriosSeleccionados.expertoTecnologia = e.target.value;
  filtrarCoder();
});

//NOTA: una call back es una funcion que llama a otra funcion
/*8.1 Declaracion de mi funcion filter de alto nivel*/

function filtrarCoder() {
  const resultado = coders
    .filter(filtrarNombreDuude)
    .filter(filtrarEdad)
    .filter(filtrarMinPromedio)
    .filter(filtrarMaxPromedio)
    .filter(filtrarClan)
    .filter(filtrarNivelIngles)
    .filter(filtrarEspecialidad)
    .filter(filtrarExpertoTecnologia);

  console.log(resultado);
  if (resultado.length) {
    pantalla.innerHTML = "";
    showCoders(resultado);
  } else {
    coincidencias();
    limpiar();
  }
}

function coincidencias() {
  pantalla.innerHTML = "Not Found";
}

/*8.2 declaracion de funcion hija argumento de la funcion filter de alto nivel */
function filtrarNombreDuude(coder) {
  if (criteriosSeleccionados.nombreCoder) {
    return (
      coder.nombre.toLowerCase() ===
      criteriosSeleccionados.nombreCoder.toLowerCase()
    );
  } else {
    return coder;
  }
}

function filtrarEdad(coder) {
  if (criteriosSeleccionados.edad) {
    return coder.edad === parseInt(criteriosSeleccionados.edad);
  } else {
    return coder;
  }
}

function filtrarMinPromedio(coder) {
  if (criteriosSeleccionados.minPromedio) {
    return coder.promedio >= parseFloat(criteriosSeleccionados.minPromedio);
  } else {
    return coder;
  }
}

function filtrarMaxPromedio(coder) {
  if (criteriosSeleccionados.maxPromedio) {
    return coder.promedio <= parseInt(criteriosSeleccionados.maxPromedio);
  } else {
    return coder;
  }
}

function filtrarClan(coder) {
  if (criteriosSeleccionados.clanRiwi) {
    return coder.clanRiwi === criteriosSeleccionados.clanRiwi;
  } else {
    return coder;
  }
}

function filtrarNivelIngles(coder) {
  if (criteriosSeleccionados.nivelIngles) {
    return coder.nivelIngles === criteriosSeleccionados.nivelIngles;
  } else {
    return coder;
  }
}

function filtrarEspecialidad(coder) {
  if (criteriosSeleccionados.especialidad) {
    return coder.especialidad === criteriosSeleccionados.especialidad;
  } else {
    return coder;
  }
}

function filtrarExpertoTecnologia(coder) {
  if (criteriosSeleccionados.expertoTecnologia) {
    return coder.expertoTecnologia === criteriosSeleccionados.expertoTecnologia;
  } else {
    return coder;
  }
}

function limpiar() {
  let z = document.querySelectorAll("p");
  for (let v = 0; v < z.length; v++) {
    z[v].remove();
  }
}

// modal 1 tabla de datos del coder

const tbody = document.querySelector("tbody");
const rowModal = document.createElement("tr");
function selectCoder() {
  const coderDetails = document.querySelector("#tarjetas");
  coderDetails.addEventListener("click", showDetail);
}

function showDetail(e) {
  const nombre = e.target.getAttribute("nombre");
  const imagen = e.target.getAttribute("img");
  const prom = parseFloat(e.target.getAttribute("promedio"));
  let prome = "";
  const especial = e.target.getAttribute("especialidad");
  const expTecnologia = e.target.getAttribute("expTecnologia");
  const direccion = e.target.getAttribute("direccion");
  const celular = e.target.getAttribute("celular");
  const exampleModalLabel = document.getElementById("exampleModalLabel");
  exampleModalLabel.innerHTML = nombre;

  if (prom < 4.5) {
    prome = "Sigue estudiando";
  } else {
    prome = "Apto para trabajo remoto";
  }
  rowModal.innerHTML = `
  <td>
    <img src ="${imagen}" class="card-img-top">
  </td>
  <td>${prome}</td>
  <td>${especial}</td>
  <td>${expTecnologia}</td>
  <td>${direccion}</td>
  <td>${celular}</td>
  `;
  tbody.appendChild(rowModal);
}

// modal 2 contratacion
let arrayCards = []; //array de coders a ser contratados
//selectors

const cards = document.querySelector("#tarjetas");
const tbodie = document.querySelector("#tbodie");
const boton = document.querySelector(".boton");
const deleteListCard = document.querySelector("#deleteListCard");
deleteListCard.addEventListener("click", deleteCard);
const deleteAll = document.querySelector(".deleteAll");
deleteAll.addEventListener("click", deleteCardAll);

cards.addEventListener("click", selectCard);

function selectCard(e) {
  e.preventDefault();
  if (e.target.classList.contains("boton")) {
    const electedCoder = e.target.parentElement.parentElement;
    console.log(electedCoder);
    detail(electedCoder);
  }
}

function detail(electedCoder) {
  const coderDetail = {
    imagen: electedCoder.querySelector("img").src,
    nombre: electedCoder.querySelector("h5").textContent,
    detalle: electedCoder.querySelector("p").textContent,
    id: electedCoder.querySelector(".boton").getAttribute("id"),
  };
  arrayCards = [...arrayCards, coderDetail];
  console.log(arrayCards);
  injectinCoderHTML();
}

function deleteCard(e) {
  if (e.target.classList.contains("deleteCard")) {
    const coderToDelete = e.target.getAttribute("id");
    console.log(coderToDelete);
    arrayCards = arrayCards.filter((cd) => cd.id !== coderToDelete);
    injectinCoderHTML();
  }
}

function deleteCardAll(e){
  if (e.target.classList.contains("deleteAll")) {
    arrayCards = [];
    injectinCoderHTML()
  }
}


function injectinCoderHTML() {
  cleanHtml();
  arrayCards.forEach((car) => {
    const { imagen, nombre, detalle, id } = car;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src = "${imagen}" width = '150px'></td>
      <td><p>${nombre}</p></td>
      <td><p>${detalle}</p></td>
      <td><a href="#" class="deleteCard btn btn-danger" id="${id}">X</a></td>
    `;
    tbodie.appendChild(row);
  });
}

function cleanHtml() {
  tbodie.innerHTML = "";
}

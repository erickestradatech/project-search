// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
   marca: '',
   year: '',
   minimo: '',
   maximo: '',
   puertas: '',
   transmision: '',
   color: '',
};

// Eventos
document.addEventListener('DOMContentLoaded', () => {
   mostrarAutos(autos); // Muestra los automoviles

   // Llena las opciones de años
   llenarSelect();
});

// Event listener para los select de busqueda
marca.addEventListener('change', (e) => {
   datosBusqueda.marca = e.target.value;

   filtrarAuto();
});

year.addEventListener('change', (e) => {
   datosBusqueda.year = parseInt(e.target.value);

   filtrarAuto();
});

minimo.addEventListener('change', (e) => {
   datosBusqueda.minimo = e.target.value;

   filtrarAuto();
});

maximo.addEventListener('change', (e) => {
   datosBusqueda.maximo = e.target.value;

   filtrarAuto();
});

puertas.addEventListener('change', (e) => {
   datosBusqueda.puertas = parseInt(e.target.value);

   filtrarAuto();
});

transmision.addEventListener('change', (e) => {
   datosBusqueda.transmision = e.target.value;

   filtrarAuto();
});

color.addEventListener('change', (e) => {
   datosBusqueda.color = e.target.value;

   filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {
   limpiarHTML(); // Elimina el HTML previo

   autos.forEach((auto) => {
      const { marca, modelo, year, puertas, transmision, precio, color } = auto;

      const autoHTML = document.createElement('p');

      autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
      `;

      // insertar en el HTML
      resultado.appendChild(autoHTML);
   });
}

// limpiar HTML
function limpiarHTML() {
   while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
   }
}

// Genera los años del select
function llenarSelect() {
   for (let i = max; i >= min; i--) {
      const opcion = document.createElement('option');
      opcion.value = i; // agrega el atributo value
      opcion.textContent = i; // agrega el contenido

      //Agrega las opciones de año al select
      year.appendChild(opcion); // "opcion" es agregado a "year"
   }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
   // Se puede filtrar y filtrar otra mas
   // Primero filtramos por la marca, seguidamente filtramos por el año
   // A esto se le conoce como: Optional chaining/ Encadenamiento opcional
   const resultado = autos
      .filter(filtrarMarca)
      .filter(filtrarYear)
      .filter(filtrarMinimo)
      .filter(filtrarMaximo)
      .filter(filtrarPuertas)
      .filter(filtrarTransmision)
      .filter(filtrarColor);

   if (resultado.length) {
      mostrarAutos(resultado);
   } else {
      noResultado();
   }
}

function noResultado() {
   limpiarHTML();

   const noResultado = document.createElement('div');
   noResultado.classList.add('alerta', 'error');
   noResultado.textContent = 'No hay resultados, intenta con otros terminos de búsqueda';
   resultado.appendChild(noResultado);
}

// Funcion para filtrar la marca
function filtrarMarca(auto) {
   /*  Muestra la iteracion de db.js -> el objeto autos
   console.log(auto); */

   const { marca } = datosBusqueda;

   // Filtra los autos que estoy seleccionado
   if (marca) {
      return auto.marca === marca;
   }

   // Si no selecciono nada en autos, me traigo todo de regreso
   return auto;
}

// Funcion para filtrar el año
function filtrarYear(auto) {
   const { year } = datosBusqueda;

   /*   Para darnos a conocer que un select>option nos da siempre un string y que en el objeto autos, el año esta como numero
   console.log(typeof year);
   console.log(typeof auto.year); */

   if (year) {
      // Es por ello que debemos convertir year a numero
      //   return auto.year === parseInt(year);
      // Ahora... es mejor ponerl parseInt(e.target.value) desde el comienzo en el addEventListener para que esta funcion no tenga mucha logica
      return auto.year === year;
   }

   return auto;
}

// Funcion para filtrar el minimo
function filtrarMinimo(auto) {
   const { minimo } = datosBusqueda;

   if (minimo) {
      // Quiero que me traiga solo los mayor o igual al precio minimo que le estoy pidiendo
      return auto.precio >= minimo;
   }

   return auto;
}

// Funcion para filtrar el maximo
function filtrarMaximo(auto) {
   const { maximo } = datosBusqueda;

   if (maximo) {
      // Quiero que me traiga solo los menor o igual al precio minimo que le estoy pidiendo
      return auto.precio <= maximo;
   }

   return auto;
}

// Funcion para filtrar Puertas
function filtrarPuertas(auto) {
   const { puertas } = datosBusqueda;

   if (puertas) {
      return auto.puertas === puertas;
   }

   return auto;
}

// Funcion para filtrar Transmision
function filtrarTransmision(auto) {
   const { transmision } = datosBusqueda;

   if (transmision) {
      return auto.transmision === transmision;
   }

   return auto;
}

// Funcion para filtrar color de auto
function filtrarColor(auto) {
   const { color } = datosBusqueda;

   if (color) {
      return auto.color === color;
   }

   return auto;
}

const container = document.querySelector('.container'),
    resultado = document.querySelector('#resultado'),
    formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value,
        pais = document.querySelector('#pais').value;
   
    if (ciudad === '' || pais ==='') {
        mostrarError('ambos campos son obligatorios');
        return;
    }
    //consultar a la api
    consultarApi(ciudad, pais);

}

function mostrarError(msg) {
    console.log(msg);
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        //crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class= "font-bold"> Error !<strong>
            <strong class= "block">${msg}<strong>
        `;
        container.appendChild(alerta);   
        
        setTimeout(() => {
            alerta.remove();        
        }, 5000);
    }
   

}



function consultarApi(ciudad, pais) { 
    const appId = '7ac083c74e302e1542c223759b3f40f4';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);   
    Spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
          //  limpiarHTML();

            if (datos.cod === "404") {
                mostrarError("ciudad no encontrada");
                return;
            }
           
            
            //imprimir la respuesta
            mostrarClima(datos)
        })
    
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centrigados = kelvinCentrigados(temp);
    const min = kelvinCentrigados(temp_max);
    const max = kelvinCentrigados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centrigados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')


  const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
  
    resultado.appendChild(resultadoDiv)


}

const kelvinCentrigados = grados => parseInt(grados - 273.15);

 
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


function Spinner() {

    limpiarHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);

    setTimeout(() => {
        divSpinner.remove()
    }, 400);
  }
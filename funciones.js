document.addEventListener("DOMContentLoaded", function () {
  const cuadrosTablero = document.querySelectorAll(".tablero div");
  const resultadoAliens = document.querySelector(".conteo");

  let cuadros = 15;
  let posicionNave = 216;
  let posicionAliens = 0;
  let aliensMuertos = [];
  let resultado = 0;
  let direccion = 1;
  let aliensID;
  let haciaDerecha = true;
  let haciaIzquierda = true;

  //Posicion inicial de los aliens en el tablero
  let aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  function ubicarAliens() {
    //colocar los aliens en tablero
   // aliens.forEach((alien) => cuadrosTablero[posicionAliens + alien].classList.add("aliens") );

   for (let i = 0; i < aliens.length; i++) {
     if(!aliensMuertos.includes(i))
     cuadrosTablero[aliens[i]].classList.add('aliens');
     
   }
  }
  ubicarAliens();

  //Funcion para quitar aliens del tablero

  function quitarAliens() {
    //quitar los aliens en tablero
    aliens.forEach((alien) =>
      cuadrosTablero[posicionAliens + alien].classList.remove("aliens")
    );
  }

  //colocar nave en el tablero
  cuadrosTablero[posicionNave].classList.add("nave");

  //funcion para mover la nave

  function moverNave(e) {
    //funcion quitar nave
    cuadrosTablero[posicionNave].classList.remove("nave");

    //mover nave dependiendo tecla
    switch (e.key) {
      case "ArrowLeft":
        if (posicionNave % cuadros !== 0) {
          posicionNave -= 1;
        }
        break;

      case "ArrowRight":
        if (posicionNave % cuadros < cuadros - 1) {
          posicionNave += 1;
        }
        break;
    }
    //colocar nave en el tablero
    cuadrosTablero[posicionNave].classList.add("nave");
  }

  //activar evento teclado
  document.addEventListener("keydown", moverNave);

  function moverAliens() {
    const limiteIzquierda = aliens[0] % cuadros === 0;
    const limiteDerecha = aliens[aliens.length - 1] % cuadros === cuadros - 1;
    quitarAliens();

    // Mover cuadros derecha
    if (limiteDerecha && haciaDerecha) {
      for (let k = 0; k < aliens.length; k++) {
        aliens[k] += cuadros + 1;
        direccion = -1;
        haciaDerecha = false;
      }
    }
    // Mover cuadros Izquierda

    if (limiteIzquierda && !haciaDerecha) {
      for (let x = 0; x < aliens.length; x++) {
        aliens[x] += cuadros - 1;
        direccion = 1;
        haciaDerecha = true;
      }
    }

    for (let i = 0; i < aliens.length; i++) {
      aliens[i] += direccion;
    }
    ubicarAliens();
    //game over

    if(cuadrosTablero[posicionNave].classList.contains('aliens')){
          alert('Perdiste!!!');
          location.reload();
    }
    
  }

  moverAliens();
  aliensID = setInterval(moverAliens, 500);

  function disparar(e) {
    let balaID;
    let positionBala = posicionNave;

    //Mover bala
    function moverBala(){
      cuadrosTablero[positionBala].classList.remove('balas');
      positionBala -= cuadros;
      cuadrosTablero[positionBala].classList.add('balas'); 
          //Matar aliens
          if(cuadrosTablero[positionBala].classList.contains('aliens')){
            cuadrosTablero[positionBala].classList.remove('aliens');
            cuadrosTablero[positionBala].classList.remove('balas');
            cuadrosTablero[positionBala].classList.add('explosion');
            //Tiempo explosion
            setTimeout(() => cuadrosTablero[positionBala].classList.remove('explosion') , 3000);
            clearInterval(balaID);
            //buscar la posicion del alien eliminado
            //Y guardar en el array añiens eliminados
            const alienEliminado = aliens.indexOf(positionBala);
            aliensMuertos.push(alienEliminado);
            resultado++;
            resultadoAliens.textContent = resultado;
            console.log(aliensMuertos);

            if(resultado === 30){
              alert('Ganaste!!!');
              location.reload();
            }
          }
            
    }
    switch (e.key) {
      case "ArrowUp":balaID = setInterval(moverBala, 100);
        break;
    
       
    }
  }

  document.addEventListener("keydown", disparar);
});

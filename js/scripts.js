// js/scripts.js

// 1. Define la fecha de la boda
// Formato: Mes Dia, Año Hora:Minuto:Segundo
// El formato ISO asegura la fecha exacta
// 2026-08-29T20:00:00 es la fecha y hora.
// -06:00 es la zona horaria de Monterrey (CST) en horario estándar (o -05:00 si es verano, pero mejor usar formato local simple si la mayoría de invitados son de ahí).

// Opción recomendada (Simple): 
// Asume la hora del dispositivo del usuario (si todos son de MTY, no hay problema)
const fechaBoda = new Date("Aug 29, 2026 20:00:00").getTime();

// 2. Actualiza la cuenta cada 1 segundo (1000 milisegundos)
const x = setInterval(function() {

  // Obtener fecha y hora de hoy
  const ahora = new Date().getTime();

  // Encontrar la distancia entre ahora y la fecha de la boda
  const distancia = fechaBoda - ahora;

  // Cálculos de tiempo para días, horas, minutos y segundos
  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  // Mostrar el resultado en los elementos con los IDs correspondientes
  document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
  document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
  document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
  document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

  // Si la cuenta regresiva termina
  if (distancia < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<h2>¡Vivan los Novios!</h2>";
  }
}, 1000);

// Función para copiar la CLABE al portapapeles
function copiarClabe() {
    // Texto que queremos copiar
    const clabe = document.getElementById("clabeText").innerText;
    
    // API moderna del navegador para copiar
    navigator.clipboard.writeText(clabe).then(() => {
        alert("¡CLABE copiada al portapapeles!");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Lógica para enviar el formulario a Google Sheets
const form = document.forms['rsvpForm'];
const btnEnviar = document.getElementById('btnEnviar');
const msgExito = document.getElementById('mensajeExito');
const msgError = document.getElementById('mensajeError');

// PEGA AQUÍ TU URL DE APPS SCRIPT
const scriptURL = 'https://script.google.com/macros/s/AKfycbyCQmqwXLn94b1zMCBndsxO6csZ7B5Tx1OdtZoq9C-_Fj2TA2sa1Ww4o5ITirgpxUKO/exec';

if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      // 1. Mostrar estado de "Cargando..."
      btnEnviar.disabled = true;
      btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
      msgExito.classList.add('d-none');
      msgError.classList.add('d-none');

      // 2. Enviar datos con Fetch
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // 3. Éxito
            msgExito.classList.remove('d-none');
            form.reset(); // Limpiar formulario
            btnEnviar.innerHTML = '¡Enviado!';
            
            // Opcional: Habilitar botón después de unos segundos
            setTimeout(() => {
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = 'Enviar mis datos';
            }, 3000);
        })
        .catch(error => {
            // 4. Error
            console.error('Error!', error.message);
            msgError.classList.remove('d-none');
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = 'Enviar mis datos';
        });
    });
}
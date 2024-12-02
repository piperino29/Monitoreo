export function diferencia(fecha1, fecha2) {
  let tiempoDiferencia = 0;
  
  // Obtener la fecha actual
  let today = new Date();

  function esFinDeSemana(dia) {
    return dia.getDay() === 0 || dia.getDay() === 6; // 0 es domingo, 6 es sabado
  }
  function esHoraLaboral(dia) {
    return (dia.getDay() >= 1 && dia.getDay() <= 4 && dia.getHours() >= 8 && dia.getHours() < 18) ||
           (dia.getDay() === 5 && dia.getHours() >= 8 && dia.getHours() < 17);
  }

  let start_at = new Date(fecha1);
  start_at.toLocaleString('es-CL', { timeZone: 'America/Santiago' });
  let end_at = new Date(fecha2);
  end_at.toLocaleString('es-CL', { timeZone: 'America/Santiago' });

  // Lista de feriados en Chile
  var feriados = [
    new Date(today.getFullYear(), 0, 1), // AÃ±o Nuevo
    new Date(today.getFullYear(), 2, 29), // Viernes Santo
    new Date(today.getFullYear(), 2, 30), // SÃ¡bado Santo
    new Date(today.getFullYear(), 4, 1), // DÃ­a del Trabajo
    new Date(today.getFullYear(), 4, 21), // DÃ­a de las Glorias Navales
    new Date(today.getFullYear(), 5, 9), // PentecostÃ©s
    new Date(today.getFullYear(), 5, 20), // Corpus Christi
    new Date(today.getFullYear(), 5, 29), // San Pedro y San Pablo
    new Date(today.getFullYear(), 6, 16), // DÃ­a de la Virgen del Carmen
    new Date(today.getFullYear(), 7, 15), // AsunciÃ³n de la Virgen
    new Date(today.getFullYear(), 8, 18), // Independencia Nacional
    new Date(today.getFullYear(), 8, 19), // DÃ­a de las Glorias del EjÃ©rcito
    new Date(today.getFullYear(), 8, 20), // Fiestas Patrias
    new Date(today.getFullYear(), 9, 12), // Encuentro de Dos Mundos
    new Date(today.getFullYear(), 9, 27), // DÃ­a de la Reforma Protestante
    new Date(today.getFullYear(), 9, 31), // DÃ­a de las Iglesias EvangÃ©licas y Protestantes
    new Date(today.getFullYear(), 10, 1), // DÃ­a de Todos los Santos
    new Date(today.getFullYear(), 10, 24),// Domingo de Cristo Rey
    new Date(today.getFullYear(), 11, 8), // Inmaculada ConcepciÃ³n
    new Date(today.getFullYear(), 11, 25),// Navidad
  ];  


  // FunciÃ³n para verificar si una fecha es feriado
  function esFeriado(date, feriados) {
    return feriados.some(feriado => feriado.getTime() === date.getTime());
  }

  // Calcular la diferencia en minutos entre las dos fechas
  let minutosTotales = Math.abs(end_at - start_at) / (60 * 1000);

  // Iterar sobre cada minuto y restar los minutos no laborables
  let currentDay = new Date(start_at);
  while (currentDay < end_at) {
    if (esFinDeSemana(currentDay) || !esHoraLaboral(currentDay) || esFeriado(currentDay, feriados)) {
      minutosTotales -= 1;
    }
    currentDay.setMinutes(currentDay.getMinutes() + 1);
  }

  // Calcular dÃ­as, horas y minutos finales
  let dias = Math.floor(minutosTotales / (24 * 60));
  let horas = Math.floor((minutosTotales % (24 * 60)) / 60);
  let minutos = Math.floor(minutosTotales % 60);

  let tiempoFormateado = `${dias}D ${horas}H ${minutos}M`;

  return { tiempoFormateado, tiempoDiferencia: minutosTotales };
}


export const getColor = (ot, minutosTotales, dia, atrasada) => {
  if (
    ot.garantia === "Posible GarantÃ­a Cliente" ||
    ot.garantia === "Posible GarantÃ­a Fabrica"
  ) {
    return "#FF909A"; // Rojo
  } else if (minutosTotales < dia) {
    return "#B0F0A5BF"; // Verde con 50% de opacidad
  } else if (minutosTotales >= dia && minutosTotales <= atrasada) {
    return "rgba(255, 255, 0, 0.75)"; // Amarillo con 50% de opacidad en formato RGBA
  } else if (minutosTotales > atrasada) {
    return "rgba(255, 165, 0, 0.75)"; // Naranja con 50% de opacidad en formato RGBA
  } else {
    return "#B0F0A5BF"; // Verde con 50% de opacidad
  }

}; 
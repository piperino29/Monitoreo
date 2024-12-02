function limpiarTexto(texto) {
  return texto.replace(/[^\w\s]/gi, ""); 
}

function reemplazarNumerosYMostrar(str) {
  return str.replace(/1/g, 'Si').replace(/0/g, 'No');
}

export const filtroPorEtapa = (data, etapaDeseada) => {
  //   const etapaLimpiada = limpiarTexto(etapaDeseada);

  return data.filter((objeto) => {
    // Limpiar el valor de 'etapa' antes de comparar
    // const etapaObjeto = limpiarTexto(objeto.etapa);
    return objeto.etapa === etapaDeseada;
  });
};

export const filtroDiesel = (data) => {
  return data.filter((item) => {
    return (
       item.tipocomponente === "INYECTOR"||
      item.tipocomponente === "BOMBA"||
      item.tipocomponente === "BOMBA LINEAL"||
      item.tipocomponente === "RIEL"
    );
  });
};

export const filtroBombas = (data) => {
  return data.filter((item) => {
    return (
      // item.tipocomponente === "INYECTOR"||
      item.tipocomponente === "BOMBA"||
      item.tipocomponente === "RIEL"
    );
  });
};

export const filtroInyectores = (data) => {
  return data.filter((item) => {
    return (
       item.tipocomponente === "INYECTOR"
      // item.tipocomponente === "BOMBA"||
      // item.tipocomponente === "RIEL"
    );
  });
};

export const filtroTurbo = (data) => {
  return data.filter((item) => {
    return (
      item.tipocomponente === "TURBO"    
    );
  });
};

export const filtroDpf = (data) => {
  return data.filter((item) => {
    return (
      item.tipocomponente === "DPF" ||
      item.tipocomponente === "CATALIZADOR" ||
      item.tipocomponente === "SCR" /*||
      item.tipocomponente === "BOMBA DE UREA" ||
      item.tipocomponente === "Inyector Urea"    */    
    );
  });
};

export const filtroVehicular = (data) => {
  return data.filter((item) => {
    return (
        item.numot_vehicular != null  && item.tipo_componente_ot != null && item.numot != null && item.componentes != null
    );
  });
};

export const filtroVehicular2 = (data) => {
  return data.filter((item) => {
    return (
        item.numot_vehicular != null && item.numot != null
    );
  });
};

export const filtroGarantiaF = (data) => {
  return data.filter((item) => {
    return (
      item.garantia === "Posible Garantía Fabrica"
      
    );
  });
};

export const filtroGarantiaC = (data) => {
  return data.filter((item) => {
    return (
      item.garantia === "Posible Garantía Cliente"
      );
  });
};

export const FiltroDiagnostico = (data) => {
  return data.filter((item) => {
    return (
      item.etapa === "Diagnostico y/o Evaluación" ||
      item.etapa === "Prueba Básica" ||
      item.etapa === "Evaluación " ||
      item.etapa === "Prueba"
    );
  });
};

export const FiltroReparacion = (data) => {
  return data.filter((item) => {
    return (
      item.etapa === "Reparación" ||
      item.etapa === "Cambio de Piezas / Limpieza" ||
      item.etapa === "Mecanizado" ||
      item.etapa === "Limpieza (Arenado)"
    );
  });
};

export const FiltroEmbalaje = (data) => {
  return data.filter((item) => {
    return item.etapa === "Armar Sin Reparar" || item.etapa === "Embalaje" && (item.numot != "12405050-515102");
  });
};

export const FiltroDesarme = (data) => {
  return data.filter((item) => {
    return item.etapa === "Desarme";
  });
};

export const filtroAdrianS = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Adrian Soto"
      
    );
  });
};

export const filtroAlvaroR = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Alvaro Ramirez"
      
    );
  });
};

export const filtroArielS = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Ariel Segovia"
      
    );
  });
};

export const filtroJuanR = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Juan Francisco Rodriguez"
      
    );
  });
};

export const filtroMiltonR = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Milton Rivas"
      
    );
  });
};

export const filtroPabloZ = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Pablo Zuñiga"
      
    );
  });
};

export const filtroSergioP = (data) => {
  return data.filter((item) => {
    return (
      item.usuarioevaluacion === "Sergio Parra"
      
    );
  });
};
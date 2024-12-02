import { Box, Container, Grid, Stack, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import TablaContador from "../components/TablaContador";
import Cargando from "../assets/Cargando";
  import {
    FiltroDiagnostico,
    FiltroDesarme,
    FiltroEmbalaje,
    FiltroReparacion,
    filtroTurbo,
    filtroPorEtapa,
  } from "../utils/Limpieza";
  
  import { diferencia } from "../utils/TiemposOt";
  import { infoOTTurbo } from "../hooks/useFetch";
import Contador from "../components/Contador";
  
  let fechaHoy = (new Date)
  
   //Tiempos En minutos
  const TurboContador = () => {
    const tiempoMedioAtrasadoeasignacion = 1500/60;
    const tiempoMedioPorVencereasignacion = 1140/60;
  
    const tiempoMedioPorVencerDesarme = 2340/60;
    const tiempoMedioAtrasadoDesarme = 3120/60;
  
    const tiempoMedioAtrasadodiagnostico = 3900/60;
    const tiempoMedioPorVencerdiagnostico = 2940/60;
  
    const tiempoMedioAtrasadoasignacion = 6180/60;
    const tiempoMedioPorVencerasignacion = 4680/60;
  
    const tiempoMedioAtrasadoreparacion = 11400/60;
    const tiempoMedioPorVencerreparacion = 8580/60;
    
    const tiempoMedioAtrasadoembalaje = 14100/60;
    const tiempoMedioPorVencerembalaje = 10620/60;
    let dia = 0;
    let atrasada = 0;
    let vencida = 0;
    let garan = 0;
  
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      flexGrow: 1,
    }));
    const { data, loading } = infoOTTurbo();
  
    
  
    if (loading)
      return (
        <>
          <Cargando />
        </>
      );
    const Turbo = filtroTurbo(data);

    const Asignacion = filtroPorEtapa(Turbo, "En Asignación Evaluación");
    let Diagnostico = FiltroDiagnostico(Turbo);
    let Desarme = filtroPorEtapa(Turbo, "Desarme");
    let Reparacion = filtroPorEtapa(Turbo, "En Asignación Reparación");
    let Preparacion = filtroPorEtapa(Turbo, "Preparación de Repuestos");
    let EnReparacion = FiltroReparacion(Turbo);
    let Embalaje = FiltroEmbalaje(Turbo);
  
    let AsignacionL = 0;
    let DesarmeL = 0;
    let DiagnosticoL = 0;
    let ReparacionL = 0;
    let EnreparacionL =0;
    let EmbalajeL = 0;

    let resultados = [];

    Asignacion & Turbo;
    Asignacion.map((item) => {
      if(item.numot != ""){AsignacionL += 1}
      const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
  
      if (
        item.garantia === "Posible Garantía Cliente" ||
        item.garantia === "Posible Garantía Fabrica"
      ) {
        garan += 1;
      } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencereasignacion) {
        dia += 1;
      } else if (
        tiempo.tiempoDiferencia >= tiempoMedioPorVencereasignacion &&
        tiempo.tiempoDiferencia <= tiempoMedioAtrasadoeasignacion
      ) {
        atrasada += 1;
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoeasignacion) {
        vencida += 1;
      } else {
        dia += 1;
      }
      //console.log(item.numot,"aaa",(tiempo))
   let resultado = calcularResultado(item);
    resultados.push(resultado);

    });
    Desarme &&
    Desarme.map((item) => {
      if(item.numot != ""){DesarmeL += 1}
      const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (
        item.garantia === "Posible Garantía Cliente" ||
        item.garantia === "Posible Garantía Fabrica"
      ) {
        garan += 1;
      } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencerDesarme) {
        dia += 1;
      } else if (
        tiempo.tiempoDiferencia >= tiempoMedioPorVencerDesarme &&
        tiempo.tiempoDiferencia <= tiempoMedioAtrasadoDesarme
      ) {
        atrasada += 1;
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoDesarme) {
        vencida += 1;
      } else {
        dia += 1;
      }
      let resultado = calcularResultado(item);
      resultados.push(resultado);

  
    });
  
    Diagnostico &&
      Diagnostico.map((item) => {
        if(item.numot != ""){DiagnosticoL += 1}
        const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
        if (
          item.garantia === "Posible Garantía Cliente" ||
          item.garantia === "Posible Garantía Fabrica"
        ) {
          garan += 1;
        } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencerdiagnostico) {
          dia += 1;
        } else if (
          tiempo.tiempoDiferencia >= tiempoMedioPorVencerdiagnostico &&
          tiempo.tiempoDiferencia <= tiempoMedioAtrasadodiagnostico
        ) {
          atrasada += 1;
        } else {
          vencida += 1;
        }
        let resultado = calcularResultado(item);
    resultados.push(resultado);
      });
    Reparacion &&
      Reparacion.map((item) => {
        if(item.numot != ""){ReparacionL += 1}
        const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
        if (
          item.garantia === "Posible Garantía Cliente" ||
          item.garantia === "Posible Garantía Fabrica"
        ) {
          garan += 1;
        } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencerasignacion) {
          dia += 1;
        } else if (
          tiempo.tiempoDiferencia >= tiempoMedioPorVencerasignacion &&
          tiempo.tiempoDiferencia <= tiempoMedioAtrasadoasignacion
        ) {
          atrasada += 1;
        } else {
          vencida += 1;
        }
        let resultado = calcularResultado(item);
    resultados.push(resultado);
      });
    EnReparacion &&
      EnReparacion.map((item) => {
        if(item.numot != ""){EnreparacionL += 1}
        const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
        if (
          item.garantia === "Posible Garantía Cliente" ||
          item.garantia === "Posible Garantía Fabrica"
        ) {
          garan += 1;
        } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencerreparacion) {
          dia += 1;
        } else if (
          tiempo.tiempoDiferencia >= tiempoMedioPorVencerreparacion &&
          tiempo.tiempoDiferencia <= tiempoMedioAtrasadoreparacion
        ) {
          atrasada += 1;
        } else {
          vencida += 1;
        }
        let resultado = calcularResultado(item);
    resultados.push(resultado);
      });
    Embalaje &&
      Embalaje.map((item) => {
        if(item.numot != ""){EmbalajeL += 1}
        const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
        if (
          item.garantia === "Posible Garantía Cliente" ||
          item.garantia === "Posible Garantía Fabrica"
        ) {
          garan += 1;
        } else if (tiempo.tiempoDiferencia < tiempoMedioPorVencerembalaje) {
          dia += 1;
        } else if (
          tiempo.tiempoDiferencia >= tiempoMedioPorVencerembalaje &&
          tiempo.tiempoDiferencia <= tiempoMedioAtrasadoembalaje
        ) {
          atrasada += 1;
        } else {
          vencida += 1;
        }
        let resultado = calcularResultado(item);
        resultados.push(resultado);
      });
// Función para calcular el resultado de cada item
function calcularResultado(item) {

  //console.log(resultado)
  let resultado = {
    tecnico: item.usuarioevaluacion,
    numot: item.numot
  };

  // Realiza tus cálculos y asignaciones aquí
  return resultado;
}
    return (
      <>
        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          <Container maxWidth="x1">
            <Grid container spacing={6} padding={2}>
               <Grid item xs={4}>
                <TablaContador
                  sx={{ height: "100%" }}
                  title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                  {"1. Espera de Asignación > "} {resultados.length}
                  </Typography>}
                  ots={resultados}
                  maxLines={4}
                  alDia={tiempoMedioPorVencereasignacion}
                  Atraso={tiempoMedioAtrasadoeasignacion}
                />
              </Grid>
            
             
            </Grid>
            
          </Container>
        </Box>
      </>
    );
  };

export default TurboContador;

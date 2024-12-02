import { Box, Container, Grid, Typography } from "@mui/material";
import Tabla from "../components/Tabla";
import { infoOT } from "../hooks/useFetch";
import Cargando from "../assets/Cargando";
import {
  FiltroDiagnostico,
  FiltroEmbalaje,
  FiltroReparacion,
  filtroInyectores,
  filtroDiesel,
  filtroPorEtapa,
} from "../utils/Limpieza";
import { diferencia } from "../utils/TiemposOt";

const Inyectores = () => {
 let tiempoMedioAtrasadoeasignacion = 0;
 let tiempoMedioPorVencereasignacion = 0;

 let tiempoMedioAtrasadodiagnostico = 0;
 let tiempoMedioPorVencerdiagnostico = 0;

 let tiempoMedioAtrasadoasignacion = 0;
 let tiempoMedioPorVencerasignacion = 0;

 let tiempoMedioAtrasadoreparacion = 0;
 let tiempoMedioPorVencerreparacion = 0;

 let tiempoMedioAtrasadoembalaje = 0;
 let tiempoMedioPorVencerembalaje = 0;
 
 let dia = 0;
 let atrasada = 0;
 let vencida = 0;
 let garan = 0;

 

  const { data, loading } = infoOT();

  if (loading)
    return (
      <>
        <Cargando />
      </>
    );

  const Diesel = filtroInyectores(data);
  const Asignacion = filtroPorEtapa(Diesel, "En Asignación Evaluación");
  let Diagnostico = FiltroDiagnostico(Diesel);
  let Reparacion = filtroPorEtapa(Diesel, "En Asignación Reparación");
  let Preparacion = filtroPorEtapa(Diesel, "Preparación de Repuestos");
  let EnReparacion = FiltroReparacion(Diesel);
  let Embalaje = FiltroEmbalaje(Diesel);

  let AsignacionL = 0;
  //let DesarmeL = 0;
  let DiagnosticoL = 0;
  let ReparacionL = 0;
  let EnreparacionL =0;
  let EmbalajeL = 0;
  
  Asignacion &&
    Asignacion.map((item) => {
      if(item.numot != ""){AsignacionL += 1}
      let tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (item.tipocomponente === 'BOMBA' || item.tipocomponente === 'RIEL') {
    tiempoMedioPorVencereasignacion = 180;
    tiempoMedioAtrasadoeasignacion = 270;
  }
  else if(item.tipocomponente != 'BOMBA' || item.tipocomponente != 'RIEL')
   tiempoMedioAtrasadoeasignacion = 780;
   tiempoMedioPorVencereasignacion = 585;
      if (
        item.garantia === "Posible Garantía Cliente" ||
        item.garantia === "Posible Garantía Fabrica"
      ) {
        garan += 1;
      } else if (tiempo.minutosTotales < tiempoMedioPorVencereasignacion) {
        dia += 1;
      } else if (
        tiempo.minutosTotales >= tiempoMedioPorVencereasignacion &&
        tiempo.minutosTotales <= tiempoMedioAtrasadoeasignacion
      ) {
        atrasada += 1;
      } else if (tiempo.minutosTotales > tiempoMedioAtrasadoeasignacion) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });
  Diagnostico &&
    Diagnostico.map((item) => { 
      if(item.numot != ""){DiagnosticoL += 1}  
      let tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (item.tipocomponente === 'BOMBA' || item.tipocomponente === 'RIEL') {
    tiempoMedioPorVencerdiagnostico = 210;
    tiempoMedioAtrasadodiagnostico = 315;
  }
  else if(item.tipocomponente != 'BOMBA' || item.tipocomponente != 'RIEL')
   tiempoMedioAtrasadodiagnostico = 930;
   tiempoMedioPorVencerdiagnostico = 698;
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
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadodiagnostico) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });
  Reparacion &&
    Reparacion.map((item) => {
      if(item.numot != ""){ReparacionL += 1} 
      let tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (item.tipocomponente === 'BOMBA' || item.tipocomponente === 'RIEL') {
    tiempoMedioPorVencereasignacion = 700;
    tiempoMedioAtrasadoeasignacion = 1050;
  }
  else if(item.tipocomponente != 'BOMBA' || item.tipocomponente != 'RIEL')
   tiempoMedioAtrasadoasignacion = 1290;
   tiempoMedioPorVencerasignacion = 967;
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
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoasignacion) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });
  EnReparacion &&
    EnReparacion.map((item) => {
      if(item.numot != ""){EnreparacionL += 1}
       let tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (item.tipocomponente === 'BOMBA' || item.tipocomponente === 'RIEL') {
    tiempoMedioPorVencerreparacion = 550;
    tiempoMedioAtrasadoreparacion = 825;
  }
  else if(item.tipocomponente != 'BOMBA' || item.tipocomponente != 'RIEL')
   tiempoMedioAtrasadoreparacion = 1720;
   tiempoMedioPorVencerreparacion = 1282;
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
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoreparacion) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });
  Embalaje &&
    Embalaje.map((item) => { 
      if(item.numot != ""){EmbalajeL += 1}
      let tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (item.tipocomponente === 'BOMBA' || item.tipocomponente === 'RIEL') {
    tiempoMedioPorVencerembalaje = 760;
    tiempoMedioAtrasadoembalaje = 1140;
  }
  else if(item.tipocomponente != 'BOMBA' || item.tipocomponente != 'RIEL')
   tiempoMedioAtrasadoembalaje = 1780;
   tiempoMedioPorVencerembalaje = 1335;
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
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoembalaje) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });

      //console.log(Diagnosticol)
      let numSlides = 0;
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth="x1">
          <Grid container spacing={4} padding={2}>
          <Grid item xs={12} sm={6} md={4}>
              <Tabla
                sx={{ height: "105%" }}
                numSlides={numSlides}
                title={
                  <Typography variant="h8" sx={{ fontWeight: 'bolder' }}>
                    {"1. Espera de Asignación > "}{AsignacionL}
                  </Typography>}
                tiempo={10000}
                maxLines={15}
                ots={Asignacion}
                alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Tabla
                sx={{ height: "105%" }}
                title={
                  <Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                    {"3. Espera de Asignación Reparación > "}{ReparacionL}
                  </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={15}
                ots={Reparacion}
                alDia={tiempoMedioPorVencerasignacion}
                Atraso={tiempoMedioAtrasadoasignacion}
              />
            </Grid>
                    
            <Grid item xs={12} sm={6} md={4}>
              <Tabla
                
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"2. Diagnóstico > "} {DiagnosticoL}
              </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={3}
                ots={Diagnostico}
                alDia={tiempoMedioPorVencerdiagnostico}
                Atraso={tiempoMedioAtrasadodiagnostico}
              />  
              <Tabla
                
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"4. En Reparación > "}{EnreparacionL}
              </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={3}
                ots={EnReparacion}
                alDia={tiempoMedioPorVencerreparacion}
                Atraso={tiempoMedioAtrasadoreparacion}
              />
              <Tabla
                
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                  {"5. Embalaje > "} {EmbalajeL}
                  </Typography>}
                compleja={true}
                tiempo={7000}
                maxLines={3}
                ots={Embalaje}
                alDia={tiempoMedioPorVencerembalaje}
                Atraso={tiempoMedioAtrasadoembalaje}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Inyectores;

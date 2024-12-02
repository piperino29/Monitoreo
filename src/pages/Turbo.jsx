import { Box, Container, Grid, Stack, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import Contador from "../components/Contador";
import Tabla from "../components/Tabla";
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

let fechaHoy = (new Date)

 //Tiempos En minutos
const Turbo = () => {
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
    });

/*console.log( "dia",dia )
    console.log( "atrasada",atrasada )*/
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth="x1">
          <Grid container spacing={1} sx={{ py: 1 }}>
            <Grid item xs={6} sm={6} lg={1}>
              <Contador
                valor={dia}
                sx={{ height: "75%" }}
                title={"Al día"}
                color="#B0F0A5"
              />
            </Grid>
            <Grid item xs={2} sm={6} lg={1}>
              <Contador
                valor={atrasada}
                sx={{ height: "75%" }}
                title={"Por Vencer"}
                color="yellow"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Contador
                valor={vencida}
                sx={{ height: "75%" }}
                title={"Atrasada"}
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Contador
                valor={garan}
                sx={{ height: "75%" }}
                title={"Garantía"}
                color="#FF909A"
              />
            </Grid>
          </Grid>
          <Grid container spacing={6} padding={2}>
             <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"1. Espera de Asignación > "} {AsignacionL}
                </Typography>}
                ots={Asignacion}
                maxLines={4}
                alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
		tiempo={10000}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"2. Desarme > "} {DesarmeL}
                </Typography>}
                maxLines={4}
                ots={Desarme}
                tiempo={10000}
		alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"3. Diagnóstico > "} {DiagnosticoL}
              </Typography>}
                compleja={true}
                maxLines={4}
                ots={Diagnostico}
		tiempo={10000}
                alDia={tiempoMedioPorVencerdiagnostico}
                Atraso={tiempoMedioAtrasadodiagnostico}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"4. Espera de Asignación Reparación > "} {ReparacionL}
              </Typography>}
                compleja={true}
                maxLines={4}
                ots={Reparacion}
		tiempo={10000}
                alDia={tiempoMedioPorVencerasignacion}
                Atraso={tiempoMedioAtrasadoasignacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"5. En Reparación > "}{EnreparacionL}
              </Typography>}
                compleja={true}
                maxLines={4}
                ots={EnReparacion}
		tiempo={10000}
                alDia={tiempoMedioPorVencerreparacion}
                Atraso={tiempoMedioAtrasadoreparacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                    {"6. Embalaje > "} {EmbalajeL}
                  </Typography>}
                compleja={true}
                maxLines={4}
                ots={Embalaje}
		tiempo={10000}
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

export default Turbo;

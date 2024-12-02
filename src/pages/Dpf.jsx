import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Contador from "../components/Contador";
import Tabla from "../components/Tabla";
import Cargando from "../assets/Cargando";
import {
  FiltroDiagnostico,
  FiltroEmbalaje,
  FiltroReparacion,
  filtroDpf,
  filtroPorEtapa,
} from "../utils/Limpieza";
import { diferencia } from "../utils/TiemposOt";
import { infoOTDPF } from "../hooks/useFetch";

const Dpf = () => {
  const tiempoMedioAtrasadoeasignacion = 68;
  const tiempoMedioPorVencereasignacion = 45;

  const tiempoMedioAtrasadodiagnostico = 91;
  const tiempoMedioPorVencerdiagnostico = 60;

  const tiempoMedioAtrasadoasignacion = 176;
  const tiempoMedioPorVencerasignacion = 116;

  const tiempoMedioAtrasadoreparacion = 255;
  const tiempoMedioPorVencerreparacion = 168;

  const tiempoMedioAtrasadoembalaje = 368;
  const tiempoMedioPorVencerembalaje = 244;

  let dia = 0;
  let atrasada = 0;
  let vencida = 0;
  let garan = 0;
  const { data, loading } = infoOTDPF();

  if (loading)
    return (
      <>
        <Cargando />
      </>
    );
  const Turbo = filtroDpf(data);
  const Asignacion = filtroPorEtapa(Turbo, "En Asignación Evaluación");
  let Diagnostico = FiltroDiagnostico(Turbo);
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
      } else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadodiagnostico) {
        vencida += 1;
      } else {
        dia += 1;
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
      }else if (tiempo.tiempoDiferencia > tiempoMedioAtrasadoasignacion) {
          vencida += 1;
        } else {
          dia += 1;
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
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth="x1">
          <Grid container spacing={1} sx={{ py: 1 }}>
            <Grid item xs={6} sm={6} lg={1}>
              <Contador
                valor={dia}
                sx={{ height: "100%" }}
                title={"Al día"}
                color="#B0F0A5"
              />
            </Grid>
            <Grid item xs={2} sm={6} lg={1}>
              <Contador
                valor={atrasada}
                sx={{ height: "100%" }}
                title={"Por Vencer"}
                color="yellow"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Contador
                valor={vencida}
                sx={{ height: "100%" }}
                title={"Atrasada"}
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Contador
                valor={garan}
                sx={{ height: "100%" }}
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
                 maxLines={4}
                 tiempo={10000}
                ots={Asignacion}
                alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"2. Diagnóstico > "} {DiagnosticoL}
                </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={4}
                ots={Diagnostico}
                alDia={tiempoMedioPorVencerdiagnostico}
                Atraso={tiempoMedioAtrasadodiagnostico}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"3. Espera de Asignación Reparación > "} {ReparacionL}
              </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={4}
                ots={Reparacion}
                alDia={tiempoMedioPorVencerasignacion}
                Atraso={tiempoMedioAtrasadoasignacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                {"4. En Reparación > "}{EnreparacionL}
              </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={4}
                ots={EnReparacion}
                alDia={tiempoMedioPorVencerreparacion}
                Atraso={tiempoMedioAtrasadoreparacion}
              />
            </Grid>
            <Grid item xs={4}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                    {"5. Embalaje > "} {EmbalajeL}
                  </Typography>}
                compleja={true}
                tiempo={10000}
                maxLines={4}
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

export default Dpf;

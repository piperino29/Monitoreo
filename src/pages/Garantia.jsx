import { Box, Container, Grid } from "@mui/material";
import Contador from "../components/Contador";
import Tabla from "../components/Tabla";
import Cargando from "../assets/Cargando";
import { filtroGarantiaF, filtroGarantiaC } from "../utils/Limpieza";
import { diferencia } from "../utils/TiemposOt";
import { infoOTGarantia } from "../hooks/useFetch";
import TablaTurbo from "../components/TablaContador";

const Garantia = () => {
  const tiempoMedioAtrasadoeasignacion = 780;
  const tiempoMedioPorVencereasignacion = 585;
  const tiempoMedioAtrasadodiagnostico = 930;
  const tiempoMedioPorVencerdiagnostico = 698;

  let dia = 0;
  let atrasada = 0;
  let vencida = 0;
  let garan = 0;

  const { data, loading } = infoOTGarantia();

  if (loading)
    return (
      <>
        <Cargando />
      </>
    );
  const garantiaF = filtroGarantiaF(data);
  const garantiaC = filtroGarantiaC(data);
  const Asignacion = filtroGarantiaF(garantiaF);
  let Diagnostico = filtroGarantiaC(garantiaC);

  Asignacion &&
    Asignacion.map((item) => {
      const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (
        item.garantia === "Posible Garantía Cliente" ||
        item.garantia === "Posible Garantía Fabrica"
      ) {
        garan += 1;
      } else if (tiempo < tiempoMedioPorVencereasignacion) {
        dia += 1;
      } else if (
        tiempo >= tiempoMedioPorVencereasignacion &&
        tiempo <= tiempoMedioAtrasadoeasignacion
      ) {
        atrasada += 1;
      } else if (tiempo > tiempoMedioAtrasadoeasignacion) {
        vencida += 1;
      } else {
        dia += 1;
      }
    });
  Diagnostico &&
    Diagnostico.map((item) => {
      const tiempo = diferencia(item.fecha_ingreso_tarea, item.fecha_hora_hoy);
      if (
        item.garantia === "Posible Garantía Cliente" ||
        item.garantia === "Posible Garantía Fabrica"
      ) {
        garan += 1;
      } else if (tiempo < tiempoMedioPorVencerdiagnostico) {
        dia += 1;
      } else if (
        tiempo >= tiempoMedioPorVencerdiagnostico &&
        tiempo <= tiempoMedioAtrasadodiagnostico
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
              <TablaTurbo
                sx={{ height: "100%" }}
                title={"1. Garantia Fabrica"}
                ots={Asignacion}
                alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
              />
            </Grid>
            <Grid item xs={4}>
              <TablaTurbo
                sx={{ height: "100%" }}
                title={"2. Garantia Cliente"}
                compleja={true}
                ots={Diagnostico}
                alDia={tiempoMedioPorVencerdiagnostico}
                Atraso={tiempoMedioAtrasadodiagnostico}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Garantia;

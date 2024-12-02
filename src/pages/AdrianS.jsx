import { Box, Container, Grid, Typography } from "@mui/material";
import Contador from "../components/Contador";
import Tabla from "../components/TablaVehicular";
import Cargando from "../assets/Cargando";
import { filtroAdrianS } from "../utils/Limpieza";
import { diferencia } from "../utils/TiemposOt";
import { useEffect, useState } from "react";
import { infoOTVehicular } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Vehicular = () => {
  const tiempoMedioAtrasadoeasignacion = 780;
  const tiempoMedioPorVencereasignacion = 585;
  let dia = 0;
  let atrasada = 0;
  let vencida = 0;
  let garan = 0;

  const navigate = useNavigate()
  useEffect(()=>{
    const tiempoEspera = 40 * 1000
    const temporizador = setTimeout(()=>{
      navigate ("/ArielS")
    },tiempoEspera)
    return ()=> clearTimeout (temporizador)
  },[navigate])

  const { data, loading } = infoOTVehicular();

  if (loading)
    return (
      <>
        <Cargando />
      </>
    );
    const Tecnico = filtroAdrianS(data);
  Tecnico &&
    Tecnico.map((item) => {
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

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth="x1">
          <Grid container spacing={1} sx={{ py: 1 }}>
            {/* <Grid item xs={6} sm={6} lg={1}>
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
            </Grid> */}
          </Grid>
          <Grid container spacing={6} padding={2}>
          <Grid item xs={12} sm={12} md={12}>
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}>{"Adrian Soto > "}{Tecnico.length}
                </Typography>}
                ots={Tecnico}
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

export default Vehicular;

import { Box, Container, Grid, Typography } from "@mui/material";
import Tabla from "../components/TablaVehicular";
import Cargando from "../assets/Cargando";
import { filtroVehicular, filtroVehicular2 } from "../utils/Limpieza";
import { diferencia } from "../utils/TiemposOt";
import { useMemo } from "react";
import { infoOTVehicular } from "../hooks/useFetch";

const Vehicular = () => {
  const tiempoMedioAtrasadoeasignacion = 1440;
  const tiempoMedioPorVencereasignacion = 2880;

  const { data, loading, error } = infoOTVehicular();

  const Asignacion = useMemo(() => {
    if (data) {
      return filtroVehicular(data);
    }
    return [];
  }, [data]);

  if (loading) return <Cargando />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={1} sx={{ py: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
         
              <Tabla
                sx={{ height: "100%" }}
                title={<Typography variant="h8" sx={{ fontWeight: 'bold' }}> {"1. Gestión Vehicular > "}{Asignacion.length}
                </Typography>}
                tiempo={10000}
                maxLines={15}
                ots={Asignacion}
                alDia={tiempoMedioPorVencereasignacion}
                Atraso={tiempoMedioAtrasadoeasignacion}
              />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Vehicular;

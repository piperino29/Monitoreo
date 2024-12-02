import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { diferencia, getColor } from "../utils/TiemposOt";

const Tabla = (props) => {
  const { ots, sx, title, compleja, alDia, Atraso, maxLines, tiempo, dots } = props;
  const [sortedOts, setSortedOts] = useState([]);

  useEffect(() => {
    const fechaHoy = new Date();
    if (ots && ots.length > 0) {
      const sorted = ots.slice().sort((a, b) => {
        const tiempoA = diferencia(a.fecha_ingreso_tarea, fechaHoy);
        const tiempoB = diferencia(b.fecha_ingreso_tarea, fechaHoy);
        return tiempoB.tiempoDiferencia - tiempoA.tiempoDiferencia;
      });
      setSortedOts(sorted);
    }
  }, [ots]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 12,
      fontWeight: "bolder",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      fontWeight: "bolder",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const generateRows = (data) => {
    return data.map((o, rowIndex) => {
      const tiempo = diferencia(o.fecha_ingreso_tarea, o.fecha_hora_hoy);
      const color = getColor(o, tiempo.tiempoDiferencia, alDia, Atraso);
      const rowStyle = { backgroundColor: color };

      return (
        <StyledTableRow hover key={rowIndex} sx={rowStyle}>
          <StyledTableCell align="center">
            {o.numot_vehicular && o.numot_vehicular}
          </StyledTableCell>
          <StyledTableCell align="center">
            {o.numot && o.numot}
          </StyledTableCell>
          <StyledTableCell align="center">
            {o.razonsocial}
          </StyledTableCell>
          <StyledTableCell align="center">
          {o.tipo_componente_ot ? o.tipo_componente_ot : "Sin Componentes"}
          </StyledTableCell>
          <StyledTableCell align="center">
            {tiempo.tiempoFormateado}
          </StyledTableCell>
          <StyledTableCell align="center">
            {o.etapa}
          </StyledTableCell>
            <StyledTableCell align="center">
              {o.usuarioevaluacion}
            </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  const generateTable = useMemo(() => {
    if (!sortedOts.length) return null;

    if (sortedOts.length > maxLines) {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: tiempo,
        swipeToSlide: false,
        adaptiveHeight: true        
       };

      const slides = [];
      const numSlides = Math.ceil(sortedOts.length / maxLines);

      for (let i = 0; i < numSlides; i++) {
        const start = i * maxLines;
        const end = Math.min(start + maxLines, sortedOts.length);
        const slide = sortedOts.slice(start, end);
        const rows = generateRows(slide);
        slides.push(
          <div key={i}>
            <Table key={i} sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">OT VEHICULAR</StyledTableCell>
                  <StyledTableCell align="center">OT</StyledTableCell>
                  <StyledTableCell align="center">Cliente</StyledTableCell>
                  <StyledTableCell align="center">Componente</StyledTableCell>
                  <StyledTableCell align="center">Tiempo</StyledTableCell>
                  <StyledTableCell align="center">ETAPA</StyledTableCell>
                  <StyledTableCell align="center">Técnico</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
          </div>
        );
      }

      return (
        <Slider {...settings}>
          {slides}
        </Slider>
      );
    } else {
      return (
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
            <StyledTableCell align="center">OT VEHICULAR</StyledTableCell>
              <StyledTableCell align="center">OT</StyledTableCell>
              <StyledTableCell align="center">Cliente</StyledTableCell>
              <StyledTableCell align="center">Componente</StyledTableCell>
              <StyledTableCell align="center">Tiempo</StyledTableCell>
              <StyledTableCell align="center">ETAPA</StyledTableCell>
              <StyledTableCell align="center">Técnico</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateRows(sortedOts)}
          </TableBody>
        </Table>
      );
    }
  }, [sortedOts, alDia, Atraso, compleja, maxLines, tiempo]);

  return (
    <Card sx={sx}>
      <CardHeader title={title} sx={{ textAlign: "center" }} />
      <Box sx={{ minWidth: 450 }}>
        {generateTable}
      </Box>
    </Card>
  );
};

export default Tabla;
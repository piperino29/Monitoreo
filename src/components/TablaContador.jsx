import React, { useEffect, useState } from "react";
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

const TablaContador = (props) => {
  const { ots, sx, title, compleja, alDia, Atraso, maxLines } = props;
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
      console.log(sorted)
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
  const rowStyle = {};
  

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Card sx={sx}>
      <CardHeader title={title} sx={{ textAlign: "center" }} />
      <Box sx={{ minWidth: 450 }}>
               <Table sx={{ tableLayout: "auto" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Técnico</StyledTableCell>
                    <StyledTableCell align="center">OT Abiertas</StyledTableCell>
                    <StyledTableCell align="center">OT Cerradas</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedOts.map((o, rowIndex) => {
                    return (
                      <StyledTableRow hover key={rowIndex} sx={rowStyle}>

                        <StyledTableCell align="center">
                          {o.usuarioevaluacion ? `${(o.usuarioevaluacion)}` : "-" }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {o.numot ? `${(o.numot).slice(9)}` : "-"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {o.numot ? `${(o.numot).slice(9)}` : "-"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {o.numot ? `${(o.numot).slice(9)}` : "-"}
                        </StyledTableCell>
                        
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
      </Box>
    </Card>
  );
};
export default TablaContador;
import { Card, CardContent, Stack, Typography } from "@mui/material";

const Contador = (props) => {
  const { valor, sx, title, color } = props;
  return (
    <Card sx={sx} style={{ backgroundColor: color}}>
    <div style={{ display: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <CardContent>
        <Stack
          alignItems={"center"}
          direction={"column"}
          spacing={0}
        >
          <Stack  alignItems={"center"}>
            <Typography style={{display: "column",
             alignItems: "center", 
             justifyContent: "center",
             fontWeight: "bolder",
             fontSize: 14}}>{title}: {valor}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </div>
  </Card>
  

  );
};

export default Contador;

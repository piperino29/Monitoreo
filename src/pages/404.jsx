import Error from "../assets/Error";
const Page = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <Error />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: La página que estas consultando no existe
          </Typography>
          <Typography></Typography>
        </Container>
      </Box>
    </>
  );
};

export default Page;

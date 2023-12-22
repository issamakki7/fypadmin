import { Box, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderImage from "../../assets/images/order.jpg";
import ReviewImage from "../../assets/images/review.jpg";

function MenuDecision() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-item");
  };

  const handleEditClick = () => {
    navigate("/edit-menu");
  };

  return (
    <Container sx={{ marginTop: "7rem", marginBottom: "9rem" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Choose an Option
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              width: "100%",
              borderRadius: "0 0 50% 50% / 20% 20% 0 0",
              padding: "13px",
              margin: "1rem",
              cursor: "pointer",
              transition: "transform 0.3s ease-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={handleAddClick}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Add Item to Menu
            </Typography>
            <CardMedia sx={{ width: "100%", height: "78%" }} component="img" image={OrderImage} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              width: "100%",
              borderRadius: "0 0 50% 50% / 20% 20% 0 0",
              padding: "13px",
              margin: "1rem",
              cursor: "pointer",
              backgroundColor: "#fafafa",
              transition: "transform 0.3s ease-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={handleEditClick}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Edit Menu
            </Typography>
            <CardMedia
              sx={{ width: "100%", height: "78%", backgroundColor: "#ffff" }}
              component="img"
              image={ReviewImage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MenuDecision;

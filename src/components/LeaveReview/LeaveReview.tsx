import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  Rating,
  Container,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { styled } from "@mui/system";
import ReviewImage from "../../assets/images/review.jpg";

const Section = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const GoldStar = styled(Star)(({ theme }) => ({
  color: theme.palette.warning,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function LeaveReview() {
  const [review, setReview] = useState("");
  const [foodRating, setFoodRating] = useState<number | null>(null);
  const [serviceRating, setServiceRating] = useState<number | null>(null);
  const [atmosphereRating, setAtmosphereRating] = useState<number | null>(null);

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleFoodRatingChange = (value: number | null) => {
    setFoodRating(value);
  };

  const handleServiceRatingChange = (value: number | null) => {
    setServiceRating(value);
  };

  const handleAtmosphereRatingChange = (value: number | null) => {
    setAtmosphereRating(value);
  };

  const handleSubmit = () => {
    //Backend Integration
    // Handle form submission
    // You can access the review, foodRating, serviceRating, atmosphereRating values here
  };

  const isFullScreen = useMediaQuery("(min-width: 1224px)");

  return (
    <div
      style={{
        backgroundImage: `url(${ReviewImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        {isFullScreen && (
          <Box
            sx={{
              marginRight: "8rem",
              marginLeft: "-1.5rem",
              flex: "0.8",
              backgroundColor: "#24262b",
              padding: "2rem 0",
              marginTop: "3rem",
            }}
          >
            <Typography
              style={{ marginTop: "8.5rem", color: "#f9f9f9" }}
              variant="h1"
              align="center"
              gutterBottom
            >
              Your Opinion Matters To Us
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              margin: "4rem auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "right",
              gap: "16px",
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              style={{ color: "#24262b", borderBottom: "dotted 1px #24262b" }}
              variant="h3"
              align="center"
              gutterBottom
            >
              Leave a Review!
            </Typography>
            <Section>
              <Typography variant="h6">Food Quality</Typography>
              <Rating
                name="foodRating"
                value={foodRating}
                onChange={(event, value) => handleFoodRatingChange(value)}
                icon={<GoldStar fontSize="inherit" />}
              />
            </Section>

            <Section>
              <Typography variant="h6">Customer Service</Typography>
              <Rating
                name="serviceRating"
                value={serviceRating}
                onChange={(event, value) => handleServiceRatingChange(value)}
                icon={<GoldStar fontSize="inherit" />}
              />
            </Section>

            <Section>
              <Typography variant="h6">Restaurant Atmosphere</Typography>
              <Rating
                name="atmosphereRating"
                value={atmosphereRating}
                onChange={(event, value) => handleAtmosphereRatingChange(value)}
                icon={<GoldStar fontSize="inherit" />}
              />
            </Section>

            <TextField
              label="Leave your review here..."
              fullWidth
              multiline
              rows={4}
              value={review}
              onChange={handleReviewChange}
            />

            <SubmitButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Review
            </SubmitButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LeaveReview;

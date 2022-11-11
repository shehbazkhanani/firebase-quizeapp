import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import pic from "../../images/img.jpg";
import pic1 from "../../images/Quiz.jpg";


function Home() {
  return (
    <>
      <Typography style={{ marginTop: 30 }}> Home </Typography>
      <Box sx={{ display: { md: "flex", sm: "flex", xs: "none" } }}>
        <img src={pic} width="100%" height="600vh" />
      </Box>
      <Box sx={{ display: { md: "none", sm: "none", xs: "flex" } }}>
        <img src={pic} width="100%" height="300vh" />
      </Box>
      <Grid container>
        <Grid item sm="6" md="12" sx="12">
          <Box
            sx={{
              position: { md: "absolute", sm: "absolute", xs: "relative" },
              top: { md: 0, sm: 0 },
              marginTop: { md: "20vh", sm: "18vh" },
              backgroundColor: {
                md: "rgba(0, 0, 0, 0.25)",
                sm: "rgba(0, 0, 0, 0.25)",
                xs: "black",
              },
              marginLeft: { md: "10" },
              width: { xs: "100vw", md: "100%" },
            }}
          >
            <Box sx={{ padding: 5 }}>
              <Typography
                sx={{
                  fontSize: { md: "3rem", sm: "2rem", xs: "1.5rem" },
                  color: "white",
                }}
              >
                {" "}
                Education is the passport{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "3rem", sm: "2rem", xs: "1.5rem" },
                  color: "white",
                }}
              >
                {" "}
                to the future,{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "3rem", sm: "2rem", xs: "1.5rem" },
                  color: "white",
                }}
              >
                {" "}
                for tomorrow belongs to those{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "3rem", sm: "2rem", xs: "1.5rem" },
                  color: "white",
                }}
              >
                {" "}
                who prepare for it today.{" "}
              </Typography>

              <Link to="information">
                {" "}
                <Button
                  style={{ marginTop: 30, marginBottom: 20 }}
                  variant="contained"
                  color="primary"
                >
                  Getting Started
                </Button>{" "}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{display : "flex", justifyContent : "center", marginTop : 5}}>
        <Grid item md="3" sm="6" xs="12">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={pic1}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md="3" sm="6" xs="12">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md="3" sm="6" xs="12">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;

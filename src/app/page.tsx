import ThemeWrapper from "@/components/ThemeWrapper";
import { Container, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeWrapper>
        <Grid container spacing={2}>
          {/* Shopping Cart */}
          <Grid item xs={8}>
            <Container className="bg-slate-300 p4">
              <Container className="flex justify-between">
                <Typography variant="h4" component="h1">
                  Shopping Cart
                </Typography>
                <Typography variant="h6" component="h2">
                  Price
                </Typography>
              </Container>

              <Divider />



            </Container>
          </Grid>
          
          {/* Checkout Button */}
          <Grid item xs={4}>
            <Container className="bg-slate-300 p-4">

            </Container>
          </Grid>
        </Grid>
      </ThemeWrapper>
    </main>
  );
}

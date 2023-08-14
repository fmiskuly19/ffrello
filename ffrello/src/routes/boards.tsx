import { Box, Container, Grid, Stack } from "@mui/material";
import Navbar from "../components/nav/navbar";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";

const BoardsPage = () => {
    return (
    <>
        <Navbar />
        <Container sx={{ padding: '10px', pt: '30px' }}>
            <Grid container spacing={6}>
                <Grid item xl={3}>
                    <HomePageLeftSidebar />
                </Grid>
                <Grid item>
                    <Stack direction="column">
                        <Box>
                            
                        </Box>
                        <Box>
                            
                        </Box>
                        <Box>
                            
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container >
    </>
    )
}

export default BoardsPage;
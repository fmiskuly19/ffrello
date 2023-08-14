import { Box, Button, Divider, Grid, Stack } from "@mui/material";

const buttons = ["Pricing", "Apps", "Blog", "Privacy", "Notice at collection", "More..."]

const InformationDropdownContent = () => {
    return (
            <Stack direction="column" spacing={1} sx={{ maxWidth: '250px' }} m={"12px"} ml={"20px"} mr={"20px"}>
                <Box sx={{ backgroundColor: '#0000FF' }}>
                    Hello
                </Box>
                <Divider />
                <Grid container justifyContent={"center"}>
                    {buttons.map((x) => {
                        return (<Grid item><Button sx={{ textTransform: 'none' }}>{x}</Button></Grid>)
                    })}
                </Grid>
            </Stack>
    )
}

export default InformationDropdownContent;
import { Box, Stack, Typography } from "@mui/material";

const templateNames = ['Elegant Minimalist', 'Vibrant Spectrum', 'Coastal Retreat', 'Urban Chic', 'Modern Fusion', 'Serene Zen', 'Retro Remix', 'Botanical Bliss', 'Timeless Elegance', 'Industrial Edge', 'Whimsical Wonderland', 'Cosmic Dreams', 'Rustic Charm', 'Eclectic Fusion', 'Art Deco Glam', 'Tropical Paradise', 'Nordic Haven', 'Boho Chic', 'Geometric Harmony', 'Vintage Vibe']

const TemplateDropdownContent = () => {
    return (
        <>
            <Box m='12px'>
                <Stack direction="column" spacing={1}>
                    {templateNames.map((x) => {
                        return (
                            <Stack direction="row" alignContent="center">
                                <Box sx={{ backgroundColor: 'lightpink', height: '32px', width: '40px' }} />
                                <Typography>{x}</Typography>
                            </Stack>
                        )
                    })}

                </Stack>
            </Box>
        </>
    )
}

export default TemplateDropdownContent;
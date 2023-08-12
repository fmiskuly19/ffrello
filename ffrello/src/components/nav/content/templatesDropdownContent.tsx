import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const templateNames = ['Elegant Minimalist', 'Vibrant Spectrum', 'Coastal Retreat', 'Urban Chic', 'Modern Fusion', 'Serene Zen', 'Retro Remix', 'Botanical Bliss', 'Timeless Elegance', 'Industrial Edge', 'Whimsical Wonderland', 'Cosmic Dreams', 'Rustic Charm', 'Eclectic Fusion', 'Art Deco Glam', 'Tropical Paradise', 'Nordic Haven', 'Boho Chic', 'Geometric Harmony', 'Vintage Vibe']

const TemplateDropdownContent = () => {
    return (
        <>
            <Box sx={{ maxWidth: '300px' }}>
                <Accordion sx={{ margin: '0px' }} defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        aria-expanded="true"
                    >
                        <Typography fontSize="12px">Templates</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Stack sx={{ display: 'flex' }} direction="column" spacing={1}>
                            {templateNames.map((x) => {
                                return (

                                    <Stack direction="row" alignContent="center" spacing={1} alignItems="center">
                                        <Box sx={{ display: 'block', backgroundColor: 'lightpink', height: '32px', width: '40px', minHeight: '32px', minWidth: '40px', borderRadius: '5px' }} />
                                        <Typography>{x}</Typography>
                                    </Stack>

                                )
                            })}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Box m='12px'>
                    <Stack direction="column">
                        <Stack direction="row" spacing={1}>
                            <BackupTableIcon />
                            <Typography fontSize="14px">See hundreds of templates from the FFrello community</Typography>
                        </Stack>
                        <Button sx={{ textDecoration: 'none !important' }}><Typography>Explore Templates</Typography></Button>
                    </Stack>
                </Box>

            </Box>
        </>
    )
}

export default TemplateDropdownContent;
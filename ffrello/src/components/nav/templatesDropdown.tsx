import { Accordion, AccordionDetails, AccordionSummary, Box, Button, MenuItem, Stack, Typography } from "@mui/material";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { templateNames } from '../../data/hardcodes'

const TemplateDropdown = () => {
    return (
        <>
            <Box sx={{ maxWidth: '300px' }}>
                <Stack direction="column">
                    <Box sx={{ overflowY: 'auto' }}>
                        <Accordion sx={{ margin: '0px' }} defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                aria-expanded="true"
                            >
                                <Typography fontSize="12px">Top Templates</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack sx={{ display: 'flex', maxHeight: '350px' }} direction="column" spacing={1}>
                                    {templateNames.map((x) => {
                                        return (
                                            <MenuItem sx={{ padding: '0px' }}>
                                                <Stack direction="row" alignContent="center" spacing={1} alignItems="center">
                                                    <Box sx={{ display: 'block', backgroundColor: 'lightpink', height: '32px', width: '40px', minHeight: '32px', minWidth: '40px', borderRadius: '5px' }} />
                                                    <Typography>{x}</Typography>
                                                </Stack>
                                            </MenuItem>
                                        )
                                    })}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box m='12px'>
                        <Stack direction="column" alignItems="center" spacing={1}>
                            <Stack direction="row" spacing={1}>
                                <BackupTableIcon />
                                <Typography fontSize="14px">See hundreds of templates from the FFrello community</Typography>
                            </Stack>
                            <Button component={Link} to="/templates" sx={{ minWidth: '80%', textDecoration: 'none', textTransform: 'none' }}>Explore Templates</Button>
                        </Stack>
                    </Box>
                </Stack >
            </Box >
        </>
    )
}

export default TemplateDropdown;
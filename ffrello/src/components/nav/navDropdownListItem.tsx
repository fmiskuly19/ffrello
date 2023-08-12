import { Stack, Box, Typography } from "@mui/material"

interface NavDropdownListItemProps{
    boardName: string, 
    workspaceName: string,
    img?: any
}

const NavDropdownListItem = (props: NavDropdownListItemProps) => {
    return (
        <Stack direction="row" spacing={1} minWidth="300px">
            <Box sx={{ height: '32px', width: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,255,1) 0%, rgba(0,100,255,1) 100%)', borderRadius: '5px' }}></Box>
            <Stack direction="column">
                <Typography variant="h2" fontSize="14px">{props.boardName}</Typography>
                <Typography variant="h2" fontSize="12px">{props.workspaceName}</Typography>
            </Stack>
        </Stack>
    )
}

export default NavDropdownListItem;
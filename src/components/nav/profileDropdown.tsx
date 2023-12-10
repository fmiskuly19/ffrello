import { Box, Stack, Switch, Typography } from "@mui/material";

const ProfileDropdown = () => {

    return (
        <Box m="12px">
            <Stack direction="row" alignItems="center">
                <Typography>
                    Profile Dropdown!
                </Typography>
                <Switch size="small" defaultChecked />
            </Stack>
        </Box>
    )
}

export default ProfileDropdown;
import { Box, Stack, Switch, Typography } from "@mui/material";

const NotificationsDropdown = () => {

    return (
        <Box m="12px">
            <Stack direction="row" alignItems="center">
                <Typography>
                    Notifications
                </Typography>
                <Switch size="small" defaultChecked />
            </Stack>
        </Box>
    )
}

export default NotificationsDropdown;
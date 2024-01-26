import { Avatar, Box, Divider, MenuItem, Stack, Switch, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutUser } from "../../redux/authSlice";
import { enqueueSnackbar } from "notistack";

const ProfileDropdown = () => {

    const googleUser = useAppSelector((state) => state.authSlice.googleUser);
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(logoutUser());
        enqueueSnackbar('Logged out', { variant: 'warning' })
    }

    return (
        <Box pt="15px" pb="10px">
            <Stack direction="column" spacing={1}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center" pl="15px" pr="15px">
                        <Avatar alt={googleUser?.name} src={googleUser?.pictureUrl} />
                        <Stack direction="column">
                            <Typography variant="subtitle1">
                                {googleUser?.name}
                            </Typography>
                            <Typography variant="subtitle2">
                                {googleUser?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <MenuItem>
                        Switch Accounts
                    </MenuItem>
                </Stack>
                <Divider />
                <div>
                    <MenuItem>
                        Theme
                    </MenuItem>
                    <MenuItem>
                        Help
                    </MenuItem>
                </div>
                <Divider />
                <div>
                    <MenuItem onClick={logOut}>
                        Log out
                    </MenuItem>
                </div>
            </Stack>
        </Box>
    )
}

export default ProfileDropdown;
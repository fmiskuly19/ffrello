import { Box, MenuItem, Radio, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setTheme } from "../../redux/themeSlice";
import * as Themes from '../../themes/themeIndex';

const ThemeDropdown = () => {

    const dispatch = useAppDispatch()

    const theme = useAppSelector((state) => state.themeSlice.theme);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTheme(event.target.value))
    };

    const handleClick = (theme: string) => {
        dispatch(setTheme(theme))
    }

    return (
        <>
            <Box m="12px" sx={{ minWidth: '200px' }}>
                <Stack direction="column" spacing={.25}>
                    {Object.keys(Themes).map((x) => {
                        return (
                            <>
                                <MenuItem sx={{ padding: '4px', borderRadius: '5px', display: 'block' }} onClick={() => handleClick(Themes[x as keyof Object].name)}>
                                    <Box sx={{ display: 'flex' }} flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <Typography>{Themes[x as keyof Object].name}</Typography>
                                        <Radio
                                            checked={theme === Themes[x as keyof Object].name}
                                            onChange={handleChange}
                                            size="small"
                                            value={Themes[x as keyof Object].name}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': Themes[x as keyof Object].name }}
                                        />
                                    </Box>
                                </MenuItem >
                            </>
                        )
                    })}
                </Stack>
            </Box >
        </>
    )
}

export default ThemeDropdown;
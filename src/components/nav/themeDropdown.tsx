import { Box, MenuItem, Radio, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentThemeName } from "../../redux/themeSlice";
import ThemeEditorModal from "../modals/themeEditorModal";
import { FFrelloTheme } from "../../types/FFrelloTheme";


const ThemeDropdown = () => {

    const dispatch = useAppDispatch()

    const theme = useAppSelector((state) => state.themeSlice.currentThemeName);
    const themes = useAppSelector((state) => state.themeSlice.themes);

    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () => {
        setOpenModal(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentThemeName(event.target.value))
    };

    const handleClick = (themeName: string) => {
        console.log(`clicked theme ${themeName}`)
        let name = themes.find(x => x.name == themeName).name;
        dispatch(setCurrentThemeName(name))
    }

    return (
        <>
            <Box m="12px" sx={{ minWidth: '200px' }}>
                <Stack direction="column" spacing={.25}>

                    {themes.map((ffrelloTheme: FFrelloTheme) => {
                        return (
                            <>
                                <MenuItem sx={{ padding: '4px', borderRadius: '5px', display: 'block' }} onClick={() => handleClick(ffrelloTheme.name)}>
                                    <Box sx={{ display: 'flex' }} flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <Typography>{ffrelloTheme.name}</Typography>
                                        <Radio
                                            checked={theme === ffrelloTheme.name}
                                            onChange={handleChange}
                                            size="small"
                                            value={ffrelloTheme.name}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': ffrelloTheme.name }}
                                        />
                                    </Box>
                                </MenuItem >
                            </>
                        )
                    })}

                    {/* Create Theme Menu Item */}
                    <MenuItem onClick={() => setOpenModal(true)}>
                        <Typography>Edit/Create Theme</Typography>
                    </MenuItem >
                </Stack>
            </Box >

            <ThemeEditorModal openModal={openModal} parentHandleClose={handleModalClose} />
        </>
    )
}

export default ThemeDropdown;
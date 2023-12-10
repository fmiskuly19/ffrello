import { SetStateAction, useEffect, useState } from "react";

import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem, OutlinedInput, Radio, Select, SelectChangeEvent, Stack, Switch, ThemeOptions, Tooltip, Typography, createTheme, styled, useTheme } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import { usePopupState, bindToggle, bindMenu, anchorRef } from 'material-ui-popup-state/hooks'

import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';

import { CompactPicker } from 'react-color';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addTheme } from "../../redux/themeSlice";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { FFrelloTheme } from "../../types/FFrelloTheme";

import { invertHex } from '../../helpers/invertHex'

interface ThemeEditorModalProps {
    openModal: boolean,
    parentHandleClose: any
}

const ThemeEditorModal = (props: ThemeEditorModalProps) => {

    const fonts = [
        'Montserrat',
        'Rubik Bubbles',
        'Silkscreen',
        'Shadows Into Light',
        'Nova Square'
    ]

    const globalTheme = useTheme();
    const dispatch = useAppDispatch();

    const [isLiveBackgroundPreview, setIsLiveBackgroundPreview] = useState(false);
    const currentThemeName = useAppSelector((state) => state.themeSlice.currentThemeName);

    //#region Form Values

    //TODO
    //put all of these into a single state object called formValues
    const [primaryColor, setPrimaryColor] = useState(globalTheme.palette.primary.main)
    const [primaryContrastTextColor, setPrimaryContrastTextColor] = useState(globalTheme.palette.primary.contrastText)
    const [secondaryColor, setSecondaryColor] = useState(globalTheme.palette.secondary.main)
    const [secondaryContrastTextColor, setSecondaryContrastTextColor] = useState(globalTheme.palette.secondary.contrastText)

    const [backgroundColor, setBackgroundColor] = useState(globalTheme.palette.background.default)
    const [paperColor, setPaperColor] = useState(globalTheme.palette.background.paper)

    const [primaryTextColor, setPrimaryTextColor] = useState(globalTheme.palette.text.primary)
    const [secondaryTextColor, setSecondaryTextColor] = useState(globalTheme.palette.text.secondary)

    const [fontName, setFontName] = useState('Roboto')
    const [themeName, setThemeName] = useState('')

    const [isDarkTheme, setIsDarkTheme] = useState(globalTheme.palette.mode == 'dark')


    //react to theme switch, component will not be rerendered unless its state changes, so we need to manually switch colors to the theme colors if its switched 
    useEffect(() => {
        reset()
    }, [globalTheme]) // I am surprised this works? dont udnerstand how its doing its comparison ie shallow or deep. theme is a deep unserializable object

    const handleThemeModeSwitchFlip = (value: boolean) => {

        //set state to flip the switch
        setIsDarkTheme(value)

        //also invert the background colors to match the selected theme
        setBackgroundColor(invertHex(backgroundColor))
        setPaperColor(invertHex(paperColor))

        setPrimaryTextColor(invertHex(primaryTextColor))
        setSecondaryTextColor(invertHex(secondaryTextColor))
    }

    const reset = () => {
        setOpenModal(false)
        setPrimaryColor(globalTheme.palette.primary.main)
        setPrimaryContrastTextColor(globalTheme.palette.primary.contrastText)

        setSecondaryColor(globalTheme.palette.secondary.main)
        setSecondaryContrastTextColor(globalTheme.palette.secondary.contrastText)

        setBackgroundColor(globalTheme.palette.background.default)
        setPaperColor(globalTheme.palette.background.paper)

        setPrimaryTextColor(globalTheme.palette.text.primary)
        setSecondaryTextColor(globalTheme.palette.text.secondary)

        setFontName(globalTheme.typography.fontFamily?.toString() ?? '')
        setThemeName(currentThemeName)

        setIsDarkTheme(globalTheme.palette.mode == 'dark')

        console.log(globalTheme);
    }

    const updateFormWithTheme = (theme: any) => {
        setPrimaryColor(theme.palette.primary.main)
        setPrimaryContrastTextColor(theme.palette.primary.contrastText)

        setSecondaryColor(theme.palette.secondary.main)
        setSecondaryContrastTextColor(theme.palette.secondary.contrastText)

        setBackgroundColor(theme.palette.background.default)
        setPaperColor(theme.palette.background.paper)

        setPrimaryTextColor(theme.palette.text.primary)
        setSecondaryTextColor(theme.palette.text.secondary)

        setIsDarkTheme(theme.palette.mode == 'dark')
        setFontName(theme.typography.fontFamily?.toString() ?? '')
    }

    //#endregion

    //#region Modal

    const [openModal, setOpenModal] = useState(false);

    //if our parent changes the value of the isOpen prop, change state accordingly so it will know to re render
    useEffect(() => {
        setOpenModal(props.openModal)
    }, [props.openModal]);

    //reset form values and tell the parent that is has been closed
    const handleModalClose = () => {
        reset()
        props.parentHandleClose();
    };

    //#endregion

    //#region color popups

    const primaryPopupState = usePopupState({ variant: 'popover', popupId: 'primaryPopper' })
    const primaryContrastTextPopupState = usePopupState({ variant: 'popover', popupId: 'primaryContrastTextPopper' })

    const secondaryPopupState = usePopupState({ variant: 'popover', popupId: 'secondaryPopper' })
    const secondaryContrastTextPopupState = usePopupState({ variant: 'popover', popupId: 'secondaryContrastTextPopper' })

    const backgroundColorPopupState = usePopupState({ variant: 'popover', popupId: 'backgroundColorPopper' })
    const paperColorPopupState = usePopupState({ variant: 'popover', popupId: 'paperColorPopper' })

    const primaryTextColorPopupState = usePopupState({ variant: 'popover', popupId: 'primaryTextColorPopper' })
    const secondaryTextColorPopupState = usePopupState({ variant: 'popover', popupId: 'secondaryTextColorPopper' })

    //#endregion

    //#region theme switching/theme name dropdown

    const themeNamePopupState = usePopupState({ variant: 'popover', popupId: 'themeNamePopper' })
    const themes = useAppSelector((state) => state.themeSlice.themes);

    const handleUpdateFormWithSelectedTheme = (themeName: string) => {

        setThemeName(themeName);
        let theme = themes.find(x => x.name == themeName).theme;
        if (theme) {
            updateFormWithTheme(theme);
        }
    }

    //#endregion

    const handleThemeSave = () => {
        const newTheme: ThemeOptions = createTheme({
            typography: {
                fontFamily: fontName,
            },
            palette: {
                mode: isDarkTheme ? 'dark' : 'light',
                primary: {
                    main: primaryColor,
                    contrastText: primaryContrastTextColor
                },
                secondary: {
                    main: secondaryColor,
                    contrastText: secondaryContrastTextColor
                },
                background: {
                    default: backgroundColor,
                    paper: paperColor
                },
                text: {
                    primary: primaryTextColor,
                    secondary: secondaryTextColor,
                },
            },
        })

        dispatch(addTheme({ name: themeName, theme: newTheme }))
    }

    return (
        <Dialog onClose={handleModalClose} open={openModal} maxWidth={"md"}>
            <DialogContent sx={{ padding: '0px' }} dividers={true}>

                {/* set min height for this modal window */}
                <Box sx={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '0px' }}>

                    <DialogTitle sx={{ padding: '0px' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={"5px"}>
                            <Typography variant="h4" fontWeight="800">Theme Editor</Typography>

                            <Stack direction="row" spacing={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="body2">Background Preview</Typography>
                                    <Tooltip placement="top" title="Click to enable a live preview" TransitionProps={{ timeout: 600 }} >
                                        <Checkbox
                                            sx={{ height: '24px', width: '24px' }}
                                            checkedIcon={<CircleIcon className="record-pulse" sx={{ height: '16px', width: '16px', color: 'red' }} />}
                                            icon={<CircleTwoToneIcon sx={{ height: '16px', width: '16px', color: '#FF7276' }} />}
                                            checked={isLiveBackgroundPreview}
                                            onChange={(_event, value) => setIsLiveBackgroundPreview(value)}
                                        />
                                    </Tooltip>
                                </Stack>
                                <IconButton onClick={() => handleModalClose()} sx={{ color: globalTheme.palette.text.primary }}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>

                        </Stack>
                    </DialogTitle>

                    <Box sx={{ height: '100%' }}>
                        <Divider sx={{ mb: '15px' }} />

                        <Box display="flex">

                            {/* this is the container holding the two 50% halves */}
                            <Stack direction="row" display="flex" spacing={4}>
                                <Box sx={{ width: '50%' }}>
                                    <Stack direction="column" spacing={1} justifyContent="space-between" display="flex">

                                        <Stack direction="column" spacing={1}>
                                            <Stack direction="row" alignItems="center" spacing={3}>
                                                <Typography variant="body1">Mode: </Typography>
                                                <Stack direction="row" alignItems="center" justifyContent="center" alignContent="flex-start">
                                                    <Typography>Light</Typography><MaterialUISwitch checked={isDarkTheme} onChange={(event, value) => handleThemeModeSwitchFlip(value)} /><Typography>Dark</Typography>
                                                </Stack>
                                            </Stack>

                                            <Stack id="theme-name-stack" direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                                <Typography variant="body1" id="theme-name-label">Name:</Typography>
                                                <OutlinedInput
                                                    id="theme-name-input"
                                                    aria-describedby="theme-name-label"
                                                    inputProps={{
                                                        'aria-label': 'Theme Name',
                                                    }}
                                                    ref={anchorRef(themeNamePopupState)}
                                                    sx={{ height: '36px', paddingRight: '0px' }}
                                                    fullWidth={true}
                                                    value={themeName}
                                                    onChange={(e) => setThemeName(e.target.value)}
                                                    endAdornment={
                                                        <IconButton size="small" sx={{ borderRadius: '5px' }}  {...bindToggle(themeNamePopupState)}>
                                                            {themeNamePopupState.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                                        </IconButton>
                                                    }
                                                />
                                                <Menu {...bindMenu(themeNamePopupState)} MenuListProps={{ 'disablePadding': true }} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} >
                                                    {themes.map((ffrelloTheme: FFrelloTheme) => {
                                                        return (
                                                            <MenuItem sx={{ padding: '10px', borderRadius: '5px', display: 'block', minWidth: '345px' }} onClick={() => handleUpdateFormWithSelectedTheme(ffrelloTheme.name)}>
                                                                <Box sx={{ display: 'flex' }} flexDirection="row" alignItems="center" justifyContent="space-between">
                                                                    <Typography>{ffrelloTheme.name}</Typography>
                                                                    <Radio
                                                                        onChange={() => handleUpdateFormWithSelectedTheme(ffrelloTheme.name)}
                                                                        checked={themeName == ffrelloTheme.name}
                                                                        size="small"
                                                                        value={ffrelloTheme.name}
                                                                        name="radio-buttons"
                                                                        inputProps={{ 'aria-label': ffrelloTheme.name }}
                                                                    />
                                                                </Box>
                                                            </MenuItem >
                                                        )
                                                    })}
                                                </Menu>
                                            </Stack>
                                        </Stack>

                                        <Stack direction="column" spacing={1}>
                                            <Divider><Typography variant="h6">Colors</Typography></Divider>

                                            <Stack spacing={2}>
                                                <Stack id="primary-color-stack" direction="column" >
                                                    <Stack direction="row" justifyContent="space-between" >
                                                        <Typography variant="body1">Primary:</Typography>
                                                        <Button variant="outlined" {...bindToggle(primaryPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: primaryColor }} />
                                                        <Menu {...bindMenu(primaryPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={primaryColor} onChange={(color: { hex: SetStateAction<string>; }) => setPrimaryColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2">Contrast Text:</Typography>
                                                        <Button variant="outlined" {...bindToggle(primaryContrastTextPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: primaryContrastTextColor }} />
                                                        <Menu {...bindMenu(primaryContrastTextPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={primaryContrastTextColor} onChange={(color: { hex: SetStateAction<string>; }) => setPrimaryContrastTextColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                </Stack>

                                                <Stack id="secondary-color-stack" direction="column" >
                                                    <Stack direction="row" justifyContent="space-between" >
                                                        <Typography variant="body1">Secondary:</Typography>
                                                        <Button variant="outlined" {...bindToggle(secondaryPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: secondaryColor }} />
                                                        <Menu {...bindMenu(secondaryPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={secondaryColor} onChange={(color: { hex: SetStateAction<string>; }) => setSecondaryColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" >
                                                        <Typography variant="body2">Contrast Text:</Typography>
                                                        <Button variant="outlined" {...bindToggle(secondaryContrastTextPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: secondaryContrastTextColor }} />
                                                        <Menu {...bindMenu(secondaryContrastTextPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={secondaryContrastTextColor} onChange={(color: { hex: SetStateAction<string>; }) => setSecondaryContrastTextColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                </Stack>

                                                <Stack id="background-colors-stack" direction="column">
                                                    <Stack direction="row" justifyContent="space-between" >
                                                        <Typography variant="body1">Background:</Typography>
                                                        <Button variant="outlined" {...bindToggle(backgroundColorPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: backgroundColor }} />
                                                        <Menu {...bindMenu(backgroundColorPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={backgroundColor} onChange={(color: { hex: SetStateAction<string>; }) => setBackgroundColor(color.hex)} onChangeComplete={(color: { hex: SetStateAction<string>; }) => setBackgroundColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" >
                                                        <Typography variant="body2">Paper:</Typography>
                                                        <Button variant="outlined" {...bindToggle(paperColorPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: paperColor }} />
                                                        <Menu {...bindMenu(paperColorPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                            <CompactPicker color={paperColor} onChange={(color: { hex: SetStateAction<string>; }) => setPaperColor(color.hex)} />
                                                        </Menu>
                                                    </Stack>
                                                </Stack>

                                            </Stack>
                                        </Stack>


                                        <Stack direction="column" spacing={1}>
                                            <Divider><Typography variant="h6">Text</Typography></Divider>
                                            <Stack direction="column" spacing={2}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                                    <Typography variant="body1">Font: </Typography>
                                                    <Select
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        value={fontName}
                                                        defaultValue={fonts[0]}
                                                        onChange={(event) => setFontName(event.target.value as string)}
                                                        sx={{ height: '36px' }}>
                                                        {fonts.map((fontName) => {
                                                            return (<MenuItem value={fontName}>{fontName}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </Stack>

                                                <Stack direction="row" justifyContent="space-between" >
                                                    <Typography variant="body1">Primary Color:</Typography>
                                                    <Button variant="outlined" {...bindToggle(primaryTextColorPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: primaryTextColor }} />
                                                    <Menu {...bindMenu(primaryTextColorPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                        <CompactPicker color={primaryTextColor} onChange={(color: { hex: SetStateAction<string>; }) => setPrimaryTextColor(color.hex)} onChangeComplete={(color: { hex: SetStateAction<string>; }) => setPrimaryTextColor(color.hex)} />
                                                    </Menu>
                                                </Stack>

                                                <Stack direction="row" justifyContent="space-between" >
                                                    <Typography variant="body1">Secondary Color:</Typography>
                                                    <Button variant="outlined" {...bindToggle(secondaryTextColorPopupState)} sx={{ borderRadius: '10px', width: '28px', height: '28px', backgroundColor: secondaryTextColor }} />
                                                    <Menu {...bindMenu(secondaryTextColorPopupState)} MenuListProps={{ 'disablePadding': true }}>
                                                        <CompactPicker color={secondaryTextColor} onChange={(color: { hex: SetStateAction<string>; }) => setSecondaryTextColor(color.hex)} onChangeComplete={(color: { hex: SetStateAction<string>; }) => setSecondaryTextColor(color.hex)} />
                                                    </Menu>
                                                </Stack>
                                            </Stack>
                                        </Stack>



                                    </Stack>
                                </Box>


                                <Box sx={{ width: '50%', padding: '10px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: backgroundColor, borderRadius: '5px' }}>

                                    <Stack direction="column" spacing={1}>
                                        <Stack direction="row" display="flex" justifyContent="center" spacing={1}>
                                            {/* if we have a theme selected, show the name of the theme next to the preview header */}
                                            {themes.find(x => x.name == themeName) ? <Typography variant="h6" sx={{ fontFamily: fontName }}>{themeName}</Typography> : <></>}
                                            <Typography variant="h6" sx={{ fontFamily: fontName }}>Preview</Typography>
                                        </Stack>
                                        <Card sx={{ backgroundColor: paperColor }}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar sx={{ bgcolor: primaryColor, color: primaryContrastTextColor, fontFamily: fontName }} aria-label="recipe">
                                                        F
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                sx={{ color: primaryTextColor }}
                                                title={<Typography sx={{ fontFamily: fontName }}>River Otter in funny hat</Typography>}
                                                subheader={<Typography sx={{ fontFamily: fontName }}>May 20th, 2019</Typography>}
                                            />
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="/src/assets/fishfearme.jpg"
                                                title="women want me, fish fear me"
                                            />
                                            <CardContent sx={{ color: primaryTextColor }}>
                                                <Tooltip title="Primary text Color" placement="left" >
                                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: fontName }}>
                                                        River Otter
                                                    </Typography>
                                                </Tooltip>

                                                <Tooltip title="Secondary text Color" placement="left">
                                                    <Typography variant="body2" color={secondaryTextColor} sx={{ fontFamily: fontName }}>
                                                        The playful North American river otter is well adapted for semi-aquatic living.
                                                        They are very flexible and can make sharp, sudden turns that help them catch fish.
                                                    </Typography>
                                                </Tooltip>

                                                <Stack direction="row" display="flex" justifyContent="flex-end" spacing={1} mt="15px">

                                                    <Stack direction="row" display="flex" justifyContent="flex-end" spacing={1} mt="15px">
                                                        <Tooltip title="Primary color with contrast text" placement="bottom">
                                                            <Button variant={globalTheme.palette.mode == 'light' ? "contained" : "text"} sx={{ backgroundColor: primaryColor, color: primaryContrastTextColor, fontFamily: fontName }} >Primary</Button>
                                                        </Tooltip>

                                                        <Tooltip title="Secondary color with contrast text" placement="bottom">
                                                            <Button variant={globalTheme.palette.mode == 'light' ? "contained" : "text"} sx={{ backgroundColor: secondaryColor, color: secondaryContrastTextColor, fontFamily: fontName }}>Secondary</Button>
                                                        </Tooltip>
                                                    </Stack>

                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>

                        <Divider sx={{ mt: '15px' }} />
                    </Box>
                </Box>
                <DialogActions sx={{ paddingRight: '30px', paddingBottom: '15px', paddingTop: '10px' }}>
                    <Button
                        variant={globalTheme.palette.mode == 'light' ? "contained" : "text"}
                        endIcon={<SaveIcon />}
                        onClick={handleThemeSave}>Save</Button>
                </DialogActions>
            </DialogContent >
        </Dialog >
    );
}














//custom light/dark theme switch from material ui website docs https://mui.com/material-ui/react-switch/
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default ThemeEditorModal;
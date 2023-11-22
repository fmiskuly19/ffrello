import { Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { setTheme } from "../../../redux/themeSlice";
import * as Themes from '../../../themes/themeIndex';

const ThemeDropdown = () => {

    const themesList = Object.keys(Themes);

    const dispatch = useAppDispatch()

    const [selectedTheme, setSelectedTheme] = useState('Frutiger Aero');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTheme(event.target.value);
    };

    useEffect(() => {
        switch (selectedTheme) {
            case 'Frutiger Aero':
                dispatch(setTheme(Themes.FrutigerAero.name))
                break;
            case 'Default':
                dispatch(setTheme(Themes.Default.name))
                break;
        }
    }, [selectedTheme])

    const getThemeRadioButtons = () => {

    }

    return (
        <>
            {/* {themesList.map((x) => {
                console.log(x);
            })} */}
            <Radio
                checked={selectedTheme === Themes.FrutigerAero.name}
                onChange={handleChange}
                value={Themes.FrutigerAero.name}
                name="radio-buttons"
                inputProps={{ 'aria-label': Themes.FrutigerAero.name }}
            />
            <Radio
                checked={selectedTheme === Themes.Default.name}
                onChange={handleChange}
                value={Themes.Default.name}
                name="radio-buttons"
                inputProps={{ 'aria-label': Themes.Default.name }}
            />
        </>
    )
}

export default ThemeDropdown;
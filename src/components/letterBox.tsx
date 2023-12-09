import { Box, Typography } from "@mui/material";


interface LetterBoxProps {
    backgroundColor: any,
    size: number,
    letter: string,
}

const LetterBox = (props: LetterBoxProps) => {
    return (
        <Box display='flex' minHeight={props.size} minWidth={props.size} sx={{ background: props.backgroundColor, borderRadius: '5px' }} alignItems="center" justifyContent="center">
            <Typography variant="h6" sx={{ color: 'black' }} fontWeight="800">{props.letter}</Typography>
        </Box>
    )
}

export default LetterBox;
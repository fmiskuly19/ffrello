import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Board from '../../../types/Board'
import NavDropdownListItem from "../navDropdownListItem";

const boards = [
    { id: 1, name: 'Fwanks Board', Workspace: { id: 1, name: 'Catherine Workspace', isStarred: false } },
    { id: 1, name: 'Cafwins Board', Workspace: { id: 2, name: 'Catherine Workspace', isStarred: false } }
]

const StarredDropdownContent = () => {

    useEffect(() => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);

        setStarredBoards(rand > 50 ? boards : []);
    }, [])

    const [starredBoards, setStarredBoards] = useState<Board[]>([]);

    return (
        <>
            <Box m="12px" sx={{ maxWidth: '250px' }}>
                {
                    starredBoards.length > 0
                        ?
                        <Stack direction='column' spacing={1}>
                            {starredBoards.map((x) => {
                                return (<NavDropdownListItem boardName={x.name} workspaceName={x.Workspace.name}></NavDropdownListItem>)
                            })}
                        </Stack>
                        :
                        <Stack direction="column">
                            <Box sx={{ width: '250px', height: '100px', borderRadius: '8px', mb: '10px', background: 'linear-gradient(304deg, rgba(255,255,255,1) 0%, rgba(0,237,255,1) 0%, rgba(0,3,135,1) 100%)' }}>

                            </Box>
                            <Box justifyContent="center" alignItems="center">
                                <Container>
                                    <Typography textAlign="center" fontSize="14px">
                                        Star important boards to access them quickly and easily.
                                    </Typography>
                                </Container>
                            </Box>
                        </Stack>
                }
            </Box>
        </>
    )
}

export default StarredDropdownContent;
import { useParams } from "react-router-dom";

const BoardPage = () => {

    let { boardid } = useParams();

    return (<>BoardPage {boardid}</>)
}

export default BoardPage;
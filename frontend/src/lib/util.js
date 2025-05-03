import { useLocation } from "react-router-dom";

const getCurrentUrl = () => {
    const pathName = useLocation().pathname.split('/');
    return pathName[1];
}
export default getCurrentUrl;
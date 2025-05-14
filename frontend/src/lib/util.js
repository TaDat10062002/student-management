import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const getCurrentUrl = () => {
    const pathName = useLocation().pathname.split('/');
    return pathName[1];
}
export default getCurrentUrl;
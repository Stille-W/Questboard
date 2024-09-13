import { useEffect, useState } from "react";
import { redirectLogin } from "../hooks/GetJsonData";

function RedirectPage () {

    const[msg, setMsg] = useState(null);

    useEffect(() => {
        setMsg(null);
        redirectLogin().then(res => setMsg(res.data));
    }, [])

    return (
        <h2>{msg}</h2>
    )

}

export default RedirectPage;
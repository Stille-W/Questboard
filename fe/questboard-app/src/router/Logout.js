import { useEffect } from "react";
import { logout } from "../hooks/GetJsonData";
import { deleteToken } from "../hooks/TokenUtils";

function Logout () {
    useEffect(()=>{
        logout().then(res => {
            console.log(res.data);
            deleteToken();
            window.setTimeout(() => {
                window.location.href = "../";
            }, 3000);
        }).catch(err => console.error(err));
    });

     return (
        <h2>Logout Successfully, redirect...</h2>
     )
}

export default Logout;
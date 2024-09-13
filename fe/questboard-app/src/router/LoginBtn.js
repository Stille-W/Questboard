import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuthToken } from "../hooks/TokenUtils";

function LoginBtn() {

    const [cookie, setCookie] = useState(null);
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setCookie(getAuthToken('token'));
        setId(sessionStorage.getItem('id'));
        setUsername(sessionStorage.getItem('username'));
        // console.log('username:' +username);
        // console.log("cookie: "+cookie);
    }, [cookie, username])

    return (
        <div className="userNameBlock" >
            {cookie ? 
                <>
                <Link to={`/adventurer/${id}`} reloadDocument><div className="username">{username}</div></Link>
                <Link className='login' to="/logout" reloadDocument>Logout</Link></>
                : <Link className='login' to="/login" reloadDocument>Login</Link>}
        </div>
    )
}

export default LoginBtn;
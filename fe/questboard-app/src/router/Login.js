import "../css/Login.css"
import { useState } from "react";
import { login } from "../hooks/GetJsonData";
import { setToken } from "../hooks/TokenUtils";

// import { ReactSession } from 'react-client-session';

function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        if (account?.trim() && password?.trim()) {
            setLoading(true);
            setErrorMsg(null);
            login(account, password).then((data) => {
                console.log(`Login data: + ${JSON.stringify(data)}`);
                // const session = sessionStorage.getItem("SPRING_SECURITY_LAST_EXCEPTION");
                // console.log("Session: "+ session);
                if (data?.token) {
                    setLoading(false);
                    setToken(data.token);
                    sessionStorage.setItem('id', data.id);
                    sessionStorage.setItem('username', data.username);
                    window.location.href = "../";
                } else {
                    // let errMsg = data.split(":")[1].trim();
                    window.setTimeout(() => {
                        window.location.href = "../login";
                        setLoading(false);
                    }, 3000);
                    return setErrorMsg('帳號或密碼錯誤, 3秒後跳轉...');
                }
            }).catch((err) => {
                console.error(err);
                setErrorMsg(err.message);
            });
        } else {
            setErrorMsg("帳號或密碼不可為空");
        }

    }

    const handleAccount = (e) => {
        setAccount(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
            <div className="loginContent">
                <div className="column userName">
                    <div className="instr userNameTxt">
                        <p>Account</p>
                        <p className="subP"><a href="../register" >New to here ? Join us !</a></p>
                    </div>
                    <input type="text" value={account} onChange={handleAccount} />
                </div>
                <div className="column password">
                    <div className="instr passwordTxt">
                        <p>Password</p>
                        <p className="subP">Forgot password ?</p>
                    </div>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>
                {errorMsg && <div className="column">
                    <p className="errorMsg">{errorMsg}</p>
                </div>}
                <div className="loginArea">
                    <input type="submit" className="loginBtn" value={loading ? 'Waiting...' : 'Login'}
                        onClick={handleLogin} disabled={loading} onBlur={() => setErrorMsg(null)} />
                </div>
                {/* <p className="loginSucc">You've Logged in successfully.</p> */}
            </div>

        </div>
    )
}

export default Login;
import { useEffect, useState } from "react";
import { permit } from "../hooks/GetJsonData";
import ErrorPage from "./ErrorPage";

function Permit() {
    const [data, setData] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setData(null);
        setError(null);
        permit().then(res => {
            console.log(res.data)
            if (res?.data.includes("權限")) {
                // window.location.href = "../redirect"
            } else {
                setData(res.data);
            }
        }).catch(err => {
            console.error(err);
            // console.log(err.response.status);
            if (err.response.status == 418) {
                window.setTimeout(() => {
                    window.location.href = "../logout";
                }, 3000);
                setError('token已過期，請重新登入');
            } else {
                setError(err.message);
            }
            // window.location.href = "../redirect"
        });
    }, [])

    return (
        <>
            {error ? <ErrorPage message={error} /> : data && <h2>Login Successfully: {data}</h2>}
        </>
    )
}

export default Permit;
import { useEffect, useState } from "react";
import { editAccount, getAdventurer, getAdventurerList, register } from "../hooks/GetJsonData";
import { useParams } from "react-router-dom";

function Register() {

    let params = useParams();
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [species, setSpecies] = useState("");
    const [job, setJob] = useState("");
    const [status, setStatus] = useState("");
    const [isEmpty, setIsEmpty] = useState({
        isAccount: true, isPassword: true, isName: true,
        isGender: true, isSpecies: true, isJob: true, isStatus: true
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [accountCheckMsg, setAccountCheckMsg] = useState({ isCheck: false, msg: null });
    const [loading, setLoading] = useState(false);
    const emptyMsg = "此欄位不可為空";

    useEffect(() => {
        if (params?.id) {
            getAdventurer(params.id).then((res) => {
                setAccount(res.data.account);
                setPassword(res.data.password);
                setName(res.data.aname);
                setGender(res.data.gender);
                setSpecies(res.data.species.sid);
                setJob(res.data.job);
                setStatus(res.data.astatus);
                setIsEmpty({
                    isAccount: false, isPassword: false, isName: false,
                    isGender: false, isSpecies: false, isJob: false, isStatus: false
                })
            }).catch((err) => {
                console.error(err);
                if (err.response.status == 418) {
                    window.setTimeout(() => {
                        window.location.href = "../logout";
                    }, 3000);
                    setErrorMsg('token已過期，請重新登入');
                } else {
                    setErrorMsg(err.message);
                }
            });
        }
    }, [params]);

    const handleAccount = (e) => {
        if (e.target.value?.trim()) {
            setAccount(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isAccount: false });
        } else {
            setAccount("");
            setIsEmpty({ ...isEmpty, isAccount: true });
        }
    }
    const accountCheck = () => {
        getAdventurerList().then((res) => {
            setAccountCheckMsg({ ...accountCheck, isCheck: true });
            res.data.forEach((d) => {
                if (d.account == account) {
                    setAccountCheckMsg({ isCheck: true, msg: '帳號重複' });
                    // break;
                }
            })
        })
    }
    const handlePassword = (e) => {
        if (params?.id) {
            if (e.target.value?.trim()) {
                setNewPassword(e.target.value.trim());
            } else {
                setNewPassword("");
            }
        } else {
            if (e.target.value?.trim()) {
                setPassword(e.target.value.trim());
                setIsEmpty({ ...isEmpty, isPassword: false });
            } else {
                setPassword("");
                setIsEmpty({ ...isEmpty, isPassword: true });
            }
        }
    }
    const handleName = (e) => {
        if (e.target.value?.trim().trim()) {
            setName(e.target.value);
            setIsEmpty({ ...isEmpty, isName: false });
        } else {
            setName("");
            setIsEmpty({ ...isEmpty, isName: true });
        }
    }
    const handleGender = (e) => {
        if (e.target.value?.trim()) {
            setGender(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isGender: false });
        } else {
            setIsEmpty({ ...isEmpty, isGender: true });
        }
    }
    const handleSpecies = (e) => {
        if (e.target.value?.trim()) {
            setSpecies(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isSpecies: false });
        } else {
            setIsEmpty({ ...isEmpty, isSpecies: true });
        }
    }
    const handleJob = (e) => {
        if (e.target.value?.trim()) {
            setJob(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isJob: false });
        } else {
            setJob("");
            setIsEmpty({ ...isEmpty, isJob: true });
        }
    }
    const handleStatus = (e) => {
        if (e.target.value?.trim()) {
            setStatus(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isStatus: false });
        } else {
            setIsEmpty({ ...isEmpty, isStatus: true });
        }
    }

    const handleSubmit = (e) => {
        setLoading(true);
        // edit
        if (params?.id) {
            // console.log("edit");
            editAccount(params.id, newPassword ? newPassword : password, name, job, status).then((data) => {
                console.log(data);
                if (data?.includes('success')) {
                    alert('Successfully edited!');
                    window.location.href = "../adventurer/" + params.id;
                } else {
                    window.location.href = "../editAccount/" + params.id;
                }
            }).catch((err) => {
                console.error(err);
                if (err.response.status == 418) {
                    window.setTimeout(() => {
                        window.location.href = "../logout";
                    }, 3000);
                    setErrorMsg('token已過期，請重新登入');
                } else {
                    window.setTimeout(() => {
                        window.location.href = "../editAccount/" + params.id;
                        setLoading(false);
                    }, 3000);
                    return setErrorMsg('錯誤：' + err.message + ', 3秒後跳轉...');
                }
            });
            // register
        } else {
            if (!isEmpty.isAccount && !isEmpty.isPassword && !isEmpty.isName && !isEmpty.isGender
                && !isEmpty.isJob && !isEmpty.isSpecies && !isEmpty.isStatus) {
                register(account, password, name, gender, species, job, status).then((data) => {
                    console.log(data);
                    if (data?.includes('success')) {
                        alert('Successfully registered!');
                        window.location.href = "../login";
                    } else {
                        window.location.href = "../redirect"
                    }
                }).catch((err) => {
                    console.error(err);
                    if (err.response.status == 418) {
                        window.setTimeout(() => {
                            window.location.href = "../logout";
                        }, 3000);
                        setErrorMsg('token已過期，請重新登入');
                    } else {
                        window.setTimeout(() => {
                            window.location.href = "../register";
                            setLoading(false);
                        }, 3000);
                        return setErrorMsg('錯誤：' + err.message + ', 3秒後跳轉...');
                    }
                });
            } else {
                setErrorMsg("尚有欄位未填")
                setLoading(false);
            }
        }
    }

    return (
        <fieldset>
            {params.id ? <legend>請輸入欲修改資訊</legend>
                : <legend>請輸入註冊資訊</legend>}
            <div>
                AccountId: <input type="text" name="account" value={account} onChange={handleAccount} disabled={params?.id} />
                {!params?.id && <button onClick={() => accountCheck()} onBlur={() => setAccountCheckMsg({ isCheck: false, msg: null })}>檢查是否重複</button>}
                {accountCheckMsg.isCheck && (accountCheckMsg.msg ? <span style={{ color: "red", fontSize: "14px" }}>{accountCheckMsg.msg}</span>
                    : <span style={{ color: "green", fontSize: "14px" }}>OK!</span>)}
                <div style={{ marginLeft: "6px", fontSize: "14px" }}>your login account</div>
                {isEmpty.isAccount && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Password: {params.id ? <input type="password" name="password" value={newPassword} onChange={handlePassword} />
                    : <input type="password" name="password" value={password} onChange={handlePassword} />}
                <div style={{ marginLeft: "6px", fontSize: "14px" }}>your login password</div>
                {isEmpty.isPassword && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Name: <input type="text" name="name" value={name} onChange={handleName} />
                <div style={{ marginLeft: "6px", fontSize: "14px" }}>your registered name</div>
                {isEmpty.isName && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Gender:
                <input type="radio" name="gender" id="male" value="M" onChange={handleGender} checked={gender === "M"} disabled={params.id} /> <label htmlFor="male">男/雄性</label>
                <input type="radio" name="gender" id="female" value="F" onChange={handleGender} checked={gender === "F"} disabled={params.id} /> <label htmlFor="female">女/雌性</label>
                {isEmpty.isGender && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Species: <select onChange={handleSpecies} value={species} disabled={params.id}>
                    <option value="">--Please choose your species--</option>
                    <option value="1" >咪</option>
                    <option value="2" >人類</option>
                    <option value="3" >殭屍</option>
                    <option value="4" >鳥人</option>
                    <option value="5" >精靈</option>
                    <option value="6" >矮人</option>
                    <option value="7" >哈比人</option>
                </select>
                {isEmpty.isSpecies && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Job: <input type="text" name="job" value={job} onChange={handleJob} />
                {isEmpty.isJob && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                Status:
                <input type="radio" name="status" id="work" value="承接中" onChange={handleStatus} checked={status === "承接中"} /> <label htmlFor="work">承接中</label>
                <input type="radio" name="status" id="break" value="休假中" onChange={handleStatus} checked={status === "休假中"} /> <label htmlFor="break">休假中</label>
                <input type="radio" name="status" id="travel" value="旅行中" onChange={handleStatus} checked={status === "旅行中"} /> <label htmlFor="travel">旅行中</label>
                <input type="radio" name="status" id="full" value="已滿接" onChange={handleStatus} checked={status === "已滿接"} /> <label htmlFor="full">已滿接</label>
                {isEmpty.isStatus && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                <input type="submit" value={loading ? 'Waiting...' : 'Submit'}
                    onClick={handleSubmit} disabled={loading} onBlur={() => { setErrorMsg(null) }} />
                {errorMsg && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>
                </div>}
            </div>
        </fieldset>

    )
}

export default Register;
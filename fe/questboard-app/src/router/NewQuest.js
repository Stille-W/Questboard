import { useState } from "react";
import { newQuest } from "../hooks/GetJsonData";

function NewQuest() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [exp, setExp] = useState("");
    const [rewards, setRewards] = useState("");
    const [requester, setRequester] = useState("");
    const [isEmpty, setIsEmpty] = useState({
        isTitle: true, isDescription: true, isRequirements: true,
        isRequester: true
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const emptyMsg = "此欄位不可為空";

    const handleTitle = (e) => {
        if (e.target.value?.trim()) {
            setTitle(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isTitle: false });
        } else {
            setTitle("");
            setIsEmpty({ ...isEmpty, isTitle: true });
        }
    }

    const handleDescription = (e) => {
        if (e.target.value?.trim()) {
            setDescription(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isDescription: false });
        } else {
            setDescription("");
            setIsEmpty({ ...isEmpty, isDescription: true });
        }
    }

    const handleRequirements = (e) => {
        if (e.target.value?.trim()) {
            setRequirements(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isRequirements: false });
        } else {
            setRequirements("");
            setIsEmpty({ ...isEmpty, isRequirements: true });
        }
    }

    const handleTimeframe = (e) => {
        if (e.target.value?.trim()) {
            setTimeframe(e.target.value.trim());
        } else {
            setTimeframe("");
        }
    }

    const handleExp = (e) => {
        if (e.target.value?.trim()) {
            setExp(e.target.value.trim());
        } else {
            setExp("");
        }
    }

    const handleRewards = (e) => {
        if (e.target.value?.trim()) {
            setRewards(e.target.value.trim());
        } else {
            setRewards("");
        }
    }

    const handleRequester = (e) => {
        if (e.target.value?.trim()) {
            setRequester(e.target.value.trim());
            setIsEmpty({ ...isEmpty, isRequester: false });
        } else {
            setRequester("");
            setIsEmpty({ ...isEmpty, isRequester: true });
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        if (!isEmpty.isTitle && !isEmpty.isDescription && !isEmpty.isRequirements && !isEmpty.isRequester) {
            newQuest(title, description, requirements, timeframe, exp, rewards, requester).then((data) => {
                console.log(data);
                if (data?.includes('success')) {
                    alert('Successfully posted!');
                    window.location.href = "../questList";
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
                        window.location.href = "../newPost";
                        setLoading(false);
                    }, 3000);
                    return setErrorMsg('錯誤：' + err.message + ', 3秒後跳轉...');
                }
            });
        }
    }

    return (
        <fieldset>
            <legend>請輸入委託內容</legend>
            <div>
                主旨 <input type="text" onChange={handleTitle} value={title} name="title" />
                {isEmpty.isTitle && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                說明 <br/>
                <textarea rows="5" cols="33" onChange={handleDescription} value={description} name="description" />
                {isEmpty.isDescription && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                需求 <input type="text" onChange={handleRequirements} value={requirements} name="requirements" />
                {isEmpty.isRequirements && <div>
                    <p style={{ color: "red", fontSize: "14px" }}>{emptyMsg}</p>
                </div>}
            </div>
            <div>
                時限 <input type="text" onChange={handleTimeframe} value={timeframe} name="timeframe" />
            </div>
            <div>
                exp <input type="text" onChange={handleExp} value={exp} name="exp" />
            </div>
            <div>
                獎勵 <input type="text" onChange={handleRewards} value={rewards} name="rewards" />
            </div>
            <div>
                委託人 <input type="text" onChange={handleRequester} value={requester} name="requester" />
                {isEmpty.isRequester && <div>
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

export default NewQuest;
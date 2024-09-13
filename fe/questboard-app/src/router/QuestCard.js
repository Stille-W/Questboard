import '../css/QuestCard.css'
import { useEffect, useState } from "react";
import { acceptQuest } from "../hooks/GetJsonData";
import { getAuthToken } from "../hooks/TokenUtils";

function QuestCard({ qid, title, description, requirements, timeframe, exp, rewards, status, requester }) {

    const [isContent, setIsContent] = useState(false);
    const [cookie, setCookie] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        setCookie(getAuthToken('token'));
        setId(sessionStorage.getItem('id'));
        // console.log(data);
    }, [])

    const accept = () => {
        console.log('Accept: ' + qid);
        acceptQuest(id, qid).then((data) => {
            console.log(data);
            if (data?.includes('success')) {
                alert('承接成功！');
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
                alert('token已過期，請重新登入');
            } else {
                window.setTimeout(() => {
                    window.location.href = "../";
                }, 3000);
                return alert('錯誤：' + err.message + ', 3秒後跳轉...');
            }
        });
    }

    return (
        <>
            {isContent && (
                <div className='questBg'>
                    <div className="questContent">
                        <button className='closeBtn' onClick={() => setIsContent(false)}>X</button>
                        <div style={{ paddingLeft: "18%", width: "85%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                                <div className="cardTilte">{title}</div>
                                <div className="cardTime">{timeframe}</div>
                            </div>
                            <hr className='cardHr' />

                            <div className='cardContext' style={{ width: "100%" }}>
                                <div className="cardDesc">{description}</div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <ul>
                                        <li className="cardRequire">{requirements}</li>
                                        <li className="cardExp">Exp：{exp ? exp : '-'}</li>
                                        <li className="cardRewards">獎勵：{rewards ? rewards : '-'}</li>
                                    </ul>
                                    <div className="cardStatus">{status}</div>
                                </div>

                                <div className="cardRequester">委託人：{requester}</div>


                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <div style={{ padding: " 0 18%", marginTop: "32px", width: "65%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="cardTilte">{title}</div>
                        <div className="cardTime">{timeframe}</div>
                    </div>
                    <hr className='cardHr' />
                    <div className='cardContext'>
                        <ul>
                            <li className="cardRequire">{requirements}</li>
                            <li className="cardExp">Exp：{exp ? exp : '-'}</li>
                            <li className="cardRewards">獎勵：{rewards ? rewards : '-'}</li>
                        </ul>
                        {/* <div className="cardStatus">{status}</div> */}
                        <div className="cardRequester">委託人：{requester}</div>
                    </div>
                    <div className='btnArea'>
                        <button className='moreBtn' onClick={() => setIsContent(true)}>more</button>
                        {cookie && <input type='button' className='acceptBtn' onClick={() => accept()}
                            disabled={status === '已承接'} value={status === '已承接' ? '已承接' : 'accept'} />}
                    </div>

                </div>
            </div>
        </>
    )
}

export default QuestCard;
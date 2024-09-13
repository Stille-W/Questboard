import '../css/AdventurerCard.css'
import '../css/QuestCard.css'
import { useEffect, useState } from "react";
import { getAuthToken } from "../hooks/TokenUtils";

function AdventurerCard({ aid, name, gender, species, job, status, exp, rank, registeredTime }) {

    const [isContent, setIsContent] = useState(false);
    const [cookie, setCookie] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        setCookie(getAuthToken('token'));
        setId(sessionStorage.getItem('id'));
        // console.log(id+"/"+aid);
    }, [])

    return (
        <>
            {/* {isContent && (
            )} */}

            <div className="acard">
                <div style={{ padding: " 0 18%", marginTop: "32px", width: "65%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="cardTilte">{name}</div>
                        <div className="cardTime">{status}</div>
                    </div>
                    <hr className='cardHr' />
                    <div className='aCardContext'>
                        <ul>
                            <li>職業：{job}</li>
                            <li className="cardExp">EXP：{exp ? exp : "-"}</li>
                            <li className="cardRewards">RANK：{rank ? rank : "-"}</li>
                        </ul>
                        {/* <div className="cardStatus">{status}</div> */}
                        <div className="cardRequester">登記在案時間：{registeredTime}</div>
                    </div>
                    <div className='aBtnArea'>
                        <button className='moreBtn' onClick={() => window.location.href=`../adventurer/${aid}`}>more</button>
                        {cookie && aid == id && <button className='acceptBtn' onClick={() => window.location.href = "../editAccount/" + aid}>edit</button>}
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdventurerCard;
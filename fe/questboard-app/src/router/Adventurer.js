import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdventurer } from "../hooks/GetJsonData";
import { getAuthToken } from "../hooks/TokenUtils";
import { useParams } from "react-router-dom";
import Quest from "./Quest";

function Adventurer() {

    let params = useParams();
    const [data, setData] = useState([]);
    const [species, setSpecies] = useState();
    const [cookie, setCookie] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        setSpecies(null);
        setCookie(getAuthToken('token'));
        setId(sessionStorage.getItem('id'));
        getAdventurer(params.id).then(res => {
            setData(res.data);
        }).catch(err => console.error(err));
        // console.log(data);
    }, [cookie])

    const renderTable = (d) => (
        <table style={{
            width: "100%", borderCollapse: "collapse",
            textAlign: "center"
        }} border={1}>
            <thead>
                <tr>
                    <th>name</th>
                    <th>account</th>
                    <th>gender</th>
                    <th>species</th>
                    <th>job</th>
                    <th>status</th>
                    <th>exp</th>
                    <th>rank</th>
                    <th>登記在案時間</th>
                </tr>

            </thead>
            <tbody>
                {
                    <tr key={d.aid}>
                        <td>{d.aname}</td>
                        <td>{d.account}</td>
                        <td>{d.gender === 'M' ? '男/雄性' : '女/雌性'}</td>
                        <td>
                            <button onClick={() => setSpecies(
                                <div>
                                    <div>{d.species?.sname}</div>
                                    <div>{d.species?.description}</div>
                                    <div>{d.species?.note}</div>
                                </div>)}>
                                {d.species?.sname}
                            </button>
                        </td>
                        <td>{d.job ? d.job : ""}</td>
                        <td>{d.astatus ? d.astatus : ""}</td>
                        <td>{d.exp}</td>
                        <td>{d.rank}</td>
                        <td>{d.registeredTime}</td>
                    </tr>
                }
            </tbody>
        </table>
    );

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "80%" }}>
                            <h2>{data.aname}</h2>
                            <div className="aCardTime">{data.astatus}</div>
                        </div>
            <hr className="mainHr" />
            <div className='aBg'>
                <div className="aContent">
                    {/* <button className='aCloseBtn' onClick={() => setIsContent(false)}>X</button> */}
                    <div style={{ paddingLeft: "12%" }}>
                        {/* <hr className='cardHr' /> */}

                        <div className='cardContext' style={{ width: "100%" }}>
                            {/* <div className="cardDesc">{description}</div> */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <ul>
                                    <li>性別：{data.gender === 'M' ? '男/雄性' : '女/雌性'}</li>
                                    <li>種族：{data.species?.sname}</li>
                                    <li className="cardRequire">職業：{data.job}</li>
                                    <li className="cardExp">EXP：{data.exp ? data.exp : '-'}</li>
                                    <li className="cardRewards">RANK：{data.rank ? data.rank : '-'}</li>
                                </ul>
                                {/* <div className="cardStatus">{status}</div> */}
                            </div>

                            <div className="cardRequester">登記在案時間：{data.registeredTime}</div>
                        </div>
                    </div>
                </div>
            </div></>
        //     <div>
        //         <h2 style={{ display: "inline-block", marginRight: "32px" }}>
        //             Adventurer
        //         </h2>
        //         {cookie && id === params.id && <Link className="edit" to={`../editAccount/${params.id}`} reloadDocument>Edit</Link>}
        //         <div style={{ padding: "16px" }}>
        //             {renderTable(data)}
        //         </div>
        //         <div>
        //             {species}
        //         </div>
        //         {cookie && id === params.id && <Quest id={params.id} />}
        //         <hr />
        //         <button onClick={() => window.location.href = "../adventurerList/"}>回到AdventurerList</button>
        //     </div>
    )
}

export default Adventurer;
import { useEffect, useState } from "react";
import { getAdventurerList } from "../hooks/GetJsonData";
import AdventurerCard from "./AdventurerCard";

function AdventurerList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getAdventurerList().then(res => {
            setData(res.data);
        }).catch(err => console.error(err));
        // console.log(data);
    }, [])

    const card = (data) => (
        data.map(d=> (
            <AdventurerCard key={d.aid} aid={d.aid} name={d.aname} gender={d.gender} species={d.species}
                        job={d.job} status={d.astatus} exp={d.exp} rank={d.rank} registeredTime={d.registeredTime}/>
        ))
    )

    const renderTable = (data) => (
        <table style={{
            width: "100%", borderCollapse: "collapse",
            textAlign: "center"}} border={1}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>name</th>
                    <th>job</th>
                    <th>status</th>
                    <th>exp</th>
                    <th>rank</th>
                </tr>

            </thead>
            <tbody>
                {
                    data.map(d => (
                        <tr key={d.aid}>
                            <td>{d.aid}</td>
                            <td><button onClick={() => window.location.href=`../adventurer/${d.aid}`}>{d.aname}</button></td>
                            <td>{d.job ? d.job : ""}</td>
                            <td>{d.astatus ? d.astatus : ""}</td>
                            <td>{d.exp}</td>
                            <td>{d.rank}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );

    return (
        <div>
            <h2>
                Adventurer List
            </h2>
            <hr className="mainHr"/>
            <div style={{ padding: "16px", display: "flex", flexWrap: "wrap", transition: "all 0.3s" }}>
                {/* {renderTable(data)} */}
                {card(data)}
            </div>
        </div>
    )
}

export default AdventurerList;
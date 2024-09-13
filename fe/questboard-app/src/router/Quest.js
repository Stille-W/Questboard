import { useEffect, useState } from "react";
import { getAdventurerQuest } from "../hooks/GetJsonData";

function Quest({ id }) {

    const [data, setData] = useState([]);
    useEffect(() => {
        getAdventurerQuest(id).then(res => {
            setData(res.data);
        }).catch(err => console.error(err));
        // console.log(data);
    }, [])

    const renderTable = (data) => (
        data?.length!==0?
        <div>
            <h3>
                | 已接委託
            </h3>
        <table style={{
            tableLayout: "fixed", width: "100%", borderCollapse: "collapse",
            textAlign: "center"
        }} border={1}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>title</th>
                    <th>description</th>
                    <th>requirements</th>
                    <th>timeframe</th>
                    <th>exp</th>
                    <th>rewards</th>
                    <th>status</th>
                    <th>requester</th>
                </tr>

            </thead>
            <tbody>
                {
                    data.map(d => (
                        <tr key={d.qid}>
                            <td>{d.qid}</td>
                            <td>{d.title}</td>
                            <td>{d.description}</td>
                            <td>{d.requirements}</td>
                            <td>{d.timeframe}</td>
                            <td>{d.exp ? d.exp : "-"}</td>
                            <td>{d.rewards ? d.rewards : "-"}</td>
                            <td>{d.status}</td>
                            <td>{d.requester}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        :
        <div>
            <h3>
                尚無任何委託
            </h3>
        </div>
    );

    return (

            <div style={{ padding: "16px" }}>
                {renderTable(data)}
            </div>
    )
}

export default Quest;
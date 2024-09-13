import { useEffect, useState } from "react";
import { getQuestList } from "../hooks/GetJsonData";
import QuestCard from "./QuestCard";

function QuestList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getQuestList().then(res => {
            setData(res.data);
        }).catch(err => console.error(err));
        // console.log(data);
    }, [])

    const card = (data) => (
        data.map(d => (
            <QuestCard key={d.qid} qid={d.qid} title={d.title} description={d.description} requirements={d.requirements}
                timeframe={d.timeframe} exp={d.exp} rewards={d.rewards} status={d.status} requester={d.requester} />
        ))
    )

    // const renderTable = (data) => (
    //     <table style={{
    //         tableLayout: "fixed", width: "100%", borderCollapse: "collapse",
    //         textAlign: "center"
    //     }} border={1}>
    //         <thead>
    //             <tr>
    //                 <th>Id</th>
    //                 <th>title</th>
    //                 <th>description</th>
    //                 <th>requirements</th>
    //                 <th>timeframe</th>
    //                 <th>exp</th>
    //                 <th>rewards</th>
    //                 <th>status</th>
    //                 <th>requester</th>
    //                 {cookie && <th>accept</th>}
    //             </tr>

    //         </thead>
    //         <tbody>
    //             {
    //                 data.map(d => (
    //                     <tr key={d.qid}>
    //                         <td>{d.qid}</td>
    //                         <td>{d.title}</td>
    //                         <td>{d.description}</td>
    //                         <td>{d.requirements}</td>
    //                         <td>{d.timeframe}</td>
    //                         <td>{d.exp ? d.exp : "-"}</td>
    //                         <td>{d.rewards ? d.rewards : "-"}</td>
    //                         <td>{d.status}</td>
    //                         <td>{d.requester}</td>
    //                         {cookie && <th><button onClick={() => accept(d.qid)} disabled={d.requestee}>accept</button></th>}
    //                     </tr>
    //                 ))
    //             }
    //         </tbody>
    //     </table>
    // );

    return (
        <>
            <h2>
                Quest List
            </h2>
            <hr className="mainHr"/>
            <div style={{ padding: "16px", display: "flex", flexWrap: "wrap", transition: "all 0.3s" }}>
                {/* {renderTable(data)} */}
                {card(data)}
            </div>
        </>
    )
}

export default QuestList;
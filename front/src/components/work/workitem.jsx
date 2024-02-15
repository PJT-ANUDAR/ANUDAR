import { React } from "react";
import "./workitem.css";

function WorkItem(props) {
    return (
        <div className="likeworkarea">
            <img style={{ width: props.width, height: props.height, backgroundSize: "cover" }} src={props.work.image} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", }}><div className="likeworkname">{props.work.title}</div><div className="likeworkartist">{props.work.author}</div></div>
        </div>
    );
}

export default WorkItem;
import {getLabel} from "../helpers/helper";
import {Table} from "react-bootstrap";
import "./RecordList.css";

function RecordList(props) {
    return (
        <div className="RecordList">
            <Table>
                <thead>
                <tr>
                    <th>{getLabel('RECIPE_NAME')}</th>
                    <th>{getLabel('RECIPE_DESCRIPTION')}</th>
                </tr>
                </thead>
                <tbody>
                {props.records.map((record) => {
                    return (
                        <tr key={record.name}>
                            <td>{record.name}</td>
                            <td>{record.description}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default RecordList;
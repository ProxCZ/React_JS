import {getLabel} from "../helpers/helper";
import {Table} from "react-bootstrap";

function RecordList(props) {
    return (
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
    );
}

export default RecordList;
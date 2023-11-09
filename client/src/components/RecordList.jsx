import {getLabel} from "../helpers/helper";
import {Table} from "react-bootstrap";
import "./RecordList.css";
import {mdiPencilOutline} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

function RecordList(props) {
    return (
        <div className="RecordList">
            <Table>
                <thead>
                <tr>
                    <th>{getLabel('RECIPE_NAME')}</th>
                    <th>{getLabel('RECIPE_DESCRIPTION')}</th>
                    <th>{""}</th>
                </tr>
                </thead>
                <tbody>
                {props.records.map((record) => {
                    return (
                        <tr key={record.name}>
                            <td>{record.name}</td>
                            <td>{record.description}</td>
                            <td>
                                <Icon
                                    size={0.8}
                                    path={mdiPencilOutline}
                                    style={{ color: 'brown', cursor: 'pointer' }}
                                    onClick={() => props.onClick(record)}
                                />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default RecordList;
import {getLabel} from "../helpers/helper";
import {Table} from "react-bootstrap";
import "./RecordList.css";
import {mdiPencilOutline} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import DeleteRecipe from "./DeleteRecipe";
import UserContext from "../UserProvider";
import {useContext} from "react";

function RecordList(props) {

    const { isAuthorized } = useContext(UserContext);

    return (
        <div className="RecordList">
            <Table>
                <thead>
                <tr>
                    <th>{getLabel('RECIPE_NAME')}</th>
                    <th>{getLabel('RECIPE_DESCRIPTION')}</th>
                    {isAuthorized && <th>{""}</th>}
                </tr>
                </thead>
                <tbody>
                {props.records.map((record) => {
                    return (
                        <tr key={record.name}>
                            <td>{record.name}</td>
                            <td>{record.description}</td>
                            {isAuthorized &&
                                <td>
                                    <Icon
                                        size={0.8}
                                        path={mdiPencilOutline}
                                        style={{ color: 'brown', cursor: 'pointer' }}
                                        onClick={() => props.onClick(record)}
                                    />
                                    <DeleteRecipe
                                        recipe={record}
                                        onError={(error) => props.setDeleteRecipeError(error)}
                                        onDelete={(id) => props.handleRecipeDeleted(id)}
                                    />
                                </td>
                            }
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default RecordList;
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import {mdiBlur, mdiPencilOutline} from '@mdi/js';
import './RecordLittleCard.css';
import React from "react";
import {CardFooter} from "react-bootstrap";
import DeleteRecipe from "./DeleteRecipe";
import UserContext from "../UserProvider";
import {useContext} from "react";

function RecordLittleCard(props) {

    const { isAuthorized } = useContext(UserContext);

    return (
        <Card className="RecordLittleCard col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" style={{ width: '259.5px', height: '380px'}}>
            <Card.Img variant="top" width={250} src={props.record.imgUri} />
            <Card.Body>
                <Card.Title className="RecordLittleCard">{props.record.name}</Card.Title>
                <Icon path={mdiBlur} size={1} />
                <div className="card-text RecordLittleCard">
                    <ul>
                        {
                            props.record.ingredients.map((ingredient) => {
                                    const selectedIngredient = props.ingredientsList.find((ingredientInList)=>ingredientInList.id === ingredient.id);
                                    return <li key={selectedIngredient.id}>{selectedIngredient.name}</li>;
                                }
                            )
                        }
                    </ul>
                </div>
            </Card.Body>
            {isAuthorized &&
                <CardFooter className="EditIcons">
                    <Icon
                        size={0.8}
                        path={mdiPencilOutline}
                        style={{ color: 'brown', cursor: 'pointer' }}
                        onClick={() => props.onClick(props.record)}
                    />
                    <DeleteRecipe
                        recipe={props.record}
                        onError={(error) => props.setDeleteRecipeError(error)}
                        onDelete={(id) => props.handleRecipeDeleted(id)}
                    />
                </CardFooter>
            }
        </Card>
    );
}

export default RecordLittleCard;
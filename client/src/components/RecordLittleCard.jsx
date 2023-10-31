import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiBlur } from '@mdi/js';
import './RecordLittleCard.css';
import React from "react";

function RecordLittleCard(props) {
    return (
        <Card className="RecordLittleCard" style={{ width: '300px', height: '360px'}}>
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
        </Card>
    );
}

export default RecordLittleCard;
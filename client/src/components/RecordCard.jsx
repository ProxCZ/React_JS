import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import {mdiBlur, mdiPencilOutline} from '@mdi/js';
import './RecordCard.css';
import {CardFooter} from "react-bootstrap";
import DeleteRecipe from "./DeleteRecipe";

function RecordCard(props) {
    return (
        <Card className="RecordCard col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" style={{ width: '259.5px', height: '460px'}}>
            <Card.Img variant="top" width={250} src={props.record.imgUri} />
            <Card.Body>
                <Card.Title className="RecordCard">{props.record.name}</Card.Title>
                <Icon path={mdiBlur} size={1} />
                <Card.Text className="RecordCard">{props.record.description}</Card.Text>
            </Card.Body>
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
        </Card>
    );
}

export default RecordCard;
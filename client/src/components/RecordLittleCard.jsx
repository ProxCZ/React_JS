import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiBlur } from '@mdi/js';
import './RecordLittleCard.css';

function RecordLittleCard(props) {
    return (
        <Card className="RecordLittleCard" style={{ width: '300px', height: '280px'}}>
            <Card.Img variant="top" width={250} src={props.record.imgUri} />
            <Card.Body>
                <Card.Title className="RecordLittleCard">{props.record.name}</Card.Title>
                <Icon path={mdiBlur} size={1} />
                <Card.Text className="RecordLittleCard">{props.record.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecordLittleCard;
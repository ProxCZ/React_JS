import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiBlur } from '@mdi/js';
import './RecordCard.css';

function RecordCard(props) {
    return (
        <Card className="RecordCard" style={{ width: '300px', height: '420px'}}>
            <Card.Img variant="top" width={250} src={props.record.imgUri} />
            <Card.Body>
                <Card.Title className="RecordCard">{props.record.name}</Card.Title>
                <Icon path={mdiBlur} size={1} />
                <Card.Text className="RecordCard">{props.record.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecordCard;
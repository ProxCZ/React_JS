import Card from 'react-bootstrap/Card';

function RecordCard(props) {
    return (
        <Card style={{ width: '300px', height: '400px'}}>
            <Card.Img variant="top" width={250} src={props.record.imgUri} />
            <Card.Body>
                <Card.Title>{props.record.name}</Card.Title>
                <Card.Text>{props.record.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecordCard;
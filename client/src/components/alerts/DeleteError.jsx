import {Alert, Modal} from "react-bootstrap";

function DeleteError(props) {

    const handleClose = () => {
        props.setDeleteRecipeError("");
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.deleteRecipeError &&
                    <Alert variant="danger">
                        Error: { props.deleteRecipeError }
                    </Alert>
                }
            </Modal.Body>
        </Modal>
    )
}

export default DeleteError;
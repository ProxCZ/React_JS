import {Modal, Form, Col, Button} from "react-bootstrap";
import {getLabel} from "../helpers/helper";
import {useState} from "react";

function AddRecipe(props) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [],
    });

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(formData);
        handleClose();
    };

    const handleClose = () => props.setAddRecipeShow(false);

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {getLabel("ADD_RECIPE")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>{getLabel("RECIPE_NAME")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={getLabel("PLACEHOLDER_NAME")}
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{getLabel("RECIPE_DESCRIPTION")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={getLabel("PLACEHOLDER_DESCRIPTION")}
                            value={formData.description}
                            onChange={(e) => setField("description", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{getLabel("TITLE_INGREDIENTS")}</Form.Label>
                        <Form.Select
                            value={formData.ingredients}
                            onChange={(e) => setField("ingredients", e.target.value)}
                        >
                            <option value="" disabled>
                                {getLabel("TITLE_INGREDIENTS")}
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-row gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            {getLabel("BUTTON_CLOSE")}
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            {getLabel("BUTTON_ADD")}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddRecipe;
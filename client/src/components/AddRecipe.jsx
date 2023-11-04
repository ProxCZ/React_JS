import {Modal, Form, Button, Row, Col} from "react-bootstrap";
import {getLabel} from "../helpers/helper";
import {useState} from "react";
import "./AddRecipe.css";

function AddRecipe(props) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [],
    });

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            ingredients: [],
        })
    }

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    const setIngredient = (id) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === id);
            if (index <= -1) {
                newData.ingredients.push({id: id, unit: "", amount: ""})
            }

            return newData;
        });
    };

    const setIngredientUnit = (id, value) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === id);
            if (index > -1) {
                newData.ingredients[index].unit = value;
            }
            return newData;
        });
    };

    const setIngredientAmount = (id, value) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === id);
            if (index > -1) {
                newData.ingredients[index].amount = value;
            }
            return newData;
        });
    };

    const handleChangeIngredient = (id, value) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === id);
            if (index > -1) {
                newData.ingredients[index] = {id: value, unit: "", amount: ""};
            }
            return newData;
        });
    };

    const handleDeleteIngredient = (id) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.indexOf(id);
            if (index > -1) {
                newData.ingredients.splice(index, 1);
            }
            return newData;
        });
    };

    const getIngredientName = (id) => {
        return props.ingredientsList.filter(ingredientFromList => ingredientFromList.id === id)[0].name;
    }

    const getIngredientsOptions = () => {
        const newData = JSON.parse(JSON.stringify(formData));
        let filteredOptions;
        if (newData.ingredients.length > 0) {
            filteredOptions = props.ingredientsList.filter(ingredient => {
                const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === ingredient.id);
                if (index > -1) {
                    return false;
                }
                return true;
            })
        } else {
            filteredOptions = props.ingredientsList;
        }
        return (
            filteredOptions.map(ingredient => {
                return <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
            })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(formData);
        handleClose();
        resetForm();
    };

    const handleClose = () => {
        props.setAddRecipeShow(false);
        resetForm();
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} className="modal-lg">
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
                    <Row>
                        <Form.Group as={Col} className="col-7">
                            <Form.Label>{getLabel("TITLE_INGREDIENTS")}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} className="col">
                            <Form.Label>{getLabel("TITLE_UNIT")}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} className="col">
                            <Form.Label>{getLabel("TITLE_AMOUNT")}</Form.Label>
                        </Form.Group>
                    </Row>
                    {formData.ingredients.length !== 0 && formData.ingredients.map(ingredient =>
                        <div
                            key={ingredient.id}
                            className="AddNextIngredient"
                        >
                            <Row>
                                <Form.Group as={Col} className="col-7">
                                    <Form.Select
                                        value=""
                                        onChange={(e) => handleChangeIngredient(ingredient.id, e.target.value)}
                                    >
                                        <option
                                            value=""
                                            disabled
                                        >
                                            {getIngredientName(ingredient.id)}
                                        </option>
                                        {
                                            getIngredientsOptions()
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="col">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={ingredient.unit}
                                        onChange={(e) => setIngredientUnit(ingredient.id, e.target.value)}
                                    />
                                    {/*TODO change to select*/}
                                </Form.Group>
                                <Form.Group as={Col} className="col">
                                    <Form.Control
                                        type="number"
                                        placeholder={""}
                                        value={ingredient.amount}
                                        onChange={(e) => setIngredientAmount(ingredient.id, parseFloat(e.target.value))}
                                    />
                                </Form.Group>
                            </Row>
                        </div>
                        )
                    }
                    <div className="AddNextIngredient">
                        <Row>
                            <Form.Group as={Col} className="col-7">
                                <Form.Select
                                    value=""
                                    onChange={(e) => setIngredient(e.target.value)}
                                >
                                    <option
                                        key="AddNextIngredient"
                                        value=""
                                        disabled
                                    >
                                        {getLabel("PLACEHOLDER_ADD_NEXT_INGREDIENT")}
                                    </option>
                                    {
                                        getIngredientsOptions()
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </div>
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
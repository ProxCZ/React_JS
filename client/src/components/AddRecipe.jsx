import {Modal, Form, Button, Row, Col, Image} from "react-bootstrap";
import {getLabel} from "../helpers/helper";
import React, {useEffect, useState} from "react";
import "./AddRecipe.css";
import {mdiLoading, mdiTrashCanOutline} from "@mdi/js";
import { useMediaQuery } from 'react-responsive'
import Icon from "@mdi/react";
import {LOADING} from "../helpers/const";

function AddRecipe(props) {

    const [validated, setValidated] = useState(false);
    const [addRecipeCall, setAddRecipeCall] = useState({
        state: LOADING.INACTIVE,
    });

    useEffect(() => {
        if (props.recipeData) {
            setFormData({
                name: props.recipeData.name,
                description: props.recipeData.description,
                ingredients: props.recipeData.ingredients,
                imgUri: props.recipeData.imgUri
            });
        } else {
            setFormData({
                name: "",
                description: "",
                ingredients: [],
                imgUri: ""
            });
        }
    }, [props.recipeData]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [],
        imgUri: ""
    });

    const isSmallScreen = useMediaQuery({ query: '(max-width: 991px)' })

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            ingredients: [],
            imgUri: ""
        });
        setValidated(false);
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
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === id);
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
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        const payload = {
            ...formData,
            id: props.recipeData ? props.recipeData.id : null
        };

        setAddRecipeCall({ state: LOADING.PENDING });
        const res = await fetch(`http://localhost:3000/recipe/${props.recipeData ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setAddRecipeCall({ state: LOADING.ERROR, error: data });
        } else {
            setAddRecipeCall({ state: LOADING.SUCCESS, data });
            handleClose();
            if (typeof props.onComplete === 'function') {
                props.onComplete(data);
            }
        }
    };

    const handleClose = () => {
        props.setAddRecipeShow({ state: false });
        resetForm();
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} className="modal-lg">
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {props.recipeData ? getLabel("EDIT_RECIPE") : getLabel("ADD_RECIPE")}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>{getLabel("RECIPE_NAME")}</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder={getLabel("PLACEHOLDER_NAME")}
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                maxLength={50}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {getLabel("ERROR_REQUIRED_NAME")}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{getLabel("IMG_URL")}</Form.Label>
                            <Form.Control
                                name="img"
                                type="text"
                                placeholder={getLabel("PLACEHOLDER_IMG")}
                                value={formData.imgUri}
                                onChange={(e) => setField("imgUri", e.target.value)}
                            />
                            {formData.imgUri && <Image className="img-fluid rounded mx-auto d-block m-3" alt={formData.name} src={formData.imgUri}/>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{getLabel("RECIPE_DESCRIPTION")}</Form.Label>
                            <Form.Control
                                name="description"
                                type="text"
                                placeholder={getLabel("PLACEHOLDER_DESCRIPTION")}
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                maxLength={4000}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {getLabel("ERROR_REQUIRED_DESCRIPTION")}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="IngredientColumn">
                            <Row>
                                <Form.Group as={Col} className="col-7">
                                    <Form.Label>{getLabel("TITLE_INGREDIENTS")}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} className="col LittleLabel">
                                    <Form.Label className="d-none d-lg-flex">{getLabel("TITLE_UNIT")}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} className="col LittleLabel">
                                    <Form.Label className="d-none d-lg-flex">{getLabel("TITLE_AMOUNT")}</Form.Label>
                                </Form.Group>
                            </Row>
                        </div>
                        {formData.ingredients.length !== 0 && formData.ingredients.map(ingredient =>
                            <div
                                key={ingredient.id}
                                className="IngredientRow"
                            >
                                <div className="IngredientColumn">
                                    <Row>
                                        <Form.Group as={Col} className="col-7 IngredientResponsibleColumn">
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
                                        <Form.Group as={Col} className="col IngredientResponsibleColumn">
                                            <Form.Control
                                                type="text"
                                                placeholder={isSmallScreen ? getLabel("PLACEHOLDER_UNIT") : ""}
                                                value={ingredient.unit}
                                                onChange={(e) => setIngredientUnit(ingredient.id, e.target.value)}
                                                maxLength={20}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <div className="d-none d-lg-flex ObjectCenter">
                                                    {getLabel("ERROR_REQUIRED_UNIT")}
                                                </div>
                                            </Form.Control.Feedback>
                                            {/*TODO change to select*/}
                                        </Form.Group>
                                        <Form.Group as={Col} className="col IngredientResponsibleColumn">
                                            <Form.Control
                                                type="number"
                                                placeholder={isSmallScreen ? getLabel("PLACEHOLDER_AMOUNT") : ""}
                                                value={ingredient.amount}
                                                onChange={(e) => setIngredientAmount(ingredient.id, parseFloat(e.target.value))}
                                                min="0.01"
                                                step="0.01"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <div className="d-none d-lg-flex ObjectCenter">
                                                    {getLabel("ERROR_REQUIRED_AMOUNT")}
                                                </div>
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </div>
                                <div className="EditColumn">
                                    <Button
                                        onClick={() => handleDeleteIngredient(ingredient.id)}
                                    >
                                        <Icon path={mdiTrashCanOutline } size={1} />
                                    </Button>
                                </div>
                            </div>
                            )
                        }
                        <div className="AddIngredientRow IngredientColumn">
                            <Row>
                                <Form.Group as={Col} className="col-7 IngredientResponsibleColumn">
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
                            <div>
                                { addRecipeCall.state === LOADING.ERROR &&
                                    <div className="text-danger">{getLabel("LABEL_ERROR") + addRecipeCall.error.errorMessage}</div>
                                }
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                {getLabel("BUTTON_CLOSE")}
                            </Button>
                            <Button variant="primary" type="submit">
                                { addRecipeCall.state === LOADING.PENDING ? (
                                        <Icon size={0.8} path={mdiLoading} spin={true} />
                                    ) : (
                                        props.recipeData ? getLabel("BUTTON_EDIT") : getLabel("BUTTON_ADD")
                                    )}
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddRecipe;
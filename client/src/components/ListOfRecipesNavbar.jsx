import React from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { mdiViewGrid , mdiApps ,mdiViewList, mdiMagnify  } from "@mdi/js";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import {getLabel} from "../helpers/helper";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Icon from "@mdi/react";
import './ListOfRecipesNavbar.css';
import {Button} from "react-bootstrap";

function ListOfRecipesNavbar(props) {

    return (
        <div>
            <div>
                <Navbar collapseOnSelect expand="sm" bg="light">
                    <div className="container-fluid">
                        <Navbar.Brand>{getLabel("TITLE_RECIPES")}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse style={{ justifyContent: "right" }}>
                        <div className="NavbarActions">
                            <Form
                                className="Searching"
                                onSubmit={props.onSubmit}
                            >
                                <Form.Control
                                    id={"search"}
                                    style={{ maxWidth: "200px" }}
                                    placeholder={getLabel('SEARCH')}
                                    onChange={props.onChange}
                                />
                                <Button
                                    style={{ marginRight: "8px" }}
                                    type="submit"
                                >
                                    <Icon className="Searching_icon" size={1} path={mdiMagnify} />
                                </Button>
                            </Form>
                            <ToggleButtonGroup className={"d-none d-sm-flex"} type="radio" name="viewTypeOptions" defaultValue={LIST_OF_RECIPES_VIEW_TYPE.CARD}>
                                <ToggleButton id={LIST_OF_RECIPES_VIEW_TYPE.CARD} value={LIST_OF_RECIPES_VIEW_TYPE.CARD} onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.CARD)}>
                                    <Icon size={1} path={mdiViewGrid} />
                                </ToggleButton>
                                <ToggleButton id={LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD} value={LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD} onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD)}>
                                    <Icon size={1} path={mdiApps} />
                                </ToggleButton>
                                <ToggleButton id={LIST_OF_RECIPES_VIEW_TYPE.LIST} value={LIST_OF_RECIPES_VIEW_TYPE.LIST} onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.LIST)}>
                                    <Icon size={1} path={mdiViewList} />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        </div>
    );
}

export default ListOfRecipesNavbar;
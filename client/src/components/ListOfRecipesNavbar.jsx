import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { mdiViewGrid , mdiApps ,mdiViewList } from "@mdi/js";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import {getLabel} from "../helpers/helper";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Icon from "@mdi/react";
import './ListOfRecipesNavbar.css';

function ListOfRecipesNavbar(props) {

    return (
        <div>
            <div>
                <Navbar bg="light">
                    <div className="container-fluid">
                        <Navbar.Brand>{getLabel("LIST_OF_RECIPES_NAVBAR_HEADER")}</Navbar.Brand>
                        <ToggleButtonGroup type="radio" name="viewTypeOptions" defaultValue={LIST_OF_RECIPES_VIEW_TYPE.CARD}>
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
                </Navbar>
            </div>
        </div>
    );
}

export default ListOfRecipesNavbar;
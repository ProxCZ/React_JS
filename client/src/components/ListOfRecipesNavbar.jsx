import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { mdiViewGrid , mdiApps ,mdiViewList } from "@mdi/js";
import './buttons/ViewTypeButton.css'
import ViewTypeButton from "./buttons/ViewTypeButton";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import {getLabel} from "../helpers/helper";

function ListOfRecipesNavbar(props) {

    return (
        <div>
            <div>
                <Navbar bg="light">
                    <div className="container-fluid">
                        <Navbar.Brand>{getLabel("LIST_OF_RECIPES_NAVBAR_HEADER")}</Navbar.Brand>
                        <div>
                            <ViewTypeButton
                                onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.CARD)}
                                icon={mdiViewGrid}
                            />
                            <ViewTypeButton
                                onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD)}
                                icon={mdiApps}
                            />
                            <ViewTypeButton
                                onClick={() => props.onClick(LIST_OF_RECIPES_VIEW_TYPE.LIST)}
                                icon={mdiViewList}
                            />
                        </div>
                    </div>
                </Navbar>
            </div>
        </div>
    );
}

export default ListOfRecipesNavbar;
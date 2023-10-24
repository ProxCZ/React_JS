import React, { useState } from "react";
import Recipes from '../data/recipes.json'
import RecordCard from "../components/RecordCard";
import './buttons/ViewTypeButton.css'
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";

function ListOfRecipes() {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD)

    function selectViewType(selectedViewType) {
        if (viewType !== selectedViewType) {
            setViewType(selectedViewType);
        }
    }

    return (
        <div>
            <ListOfRecipesNavbar
                onClick={selectViewType}
            />
            <div className="Records">
                {
                    Recipes.map(record => {
                        return (
                            <RecordCard
                                record={record}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ListOfRecipes;
import React, { useState } from "react";
import Recipes from '../data/recipes.json'
import RecordCard from "../components/RecordCard";
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import RecordLittleCard from "./RecordLittleCard";
import RecordList from "./RecordList";

function ListOfRecipes() {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD)

    function selectViewType(selectedViewType) {
        if (viewType !== selectedViewType) {
            setViewType(selectedViewType);
        }
    }

    function getRecords(selectedViewType) {
        switch (selectedViewType) {
            case LIST_OF_RECIPES_VIEW_TYPE.CARD:
                return Recipes.map(record => {return (<RecordCard record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD:
                return Recipes.map(record => {return (<RecordLittleCard record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LIST:
                return <RecordList records={Recipes}/>;
            default:
                return null;
        }
    }

    return (
        <div>
            <ListOfRecipesNavbar
                onClick={selectViewType}
            />
            <div className="Records">
                {getRecords(viewType)}
            </div>
        </div>
    );
}

export default ListOfRecipes;
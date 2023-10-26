import React, {useMemo, useState} from "react";
import Recipes from '../data/recipes.json'
import RecordCard from "../components/RecordCard";
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import RecordLittleCard from "./RecordLittleCard";
import RecordList from "./RecordList";

function ListOfRecipes() {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD);
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipesList = useMemo(() => {
        return Recipes.filter(item =>
            item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
            item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
        );
    }, [searchBy]);

    function selectViewType(selectedViewType) {
        if (viewType !== selectedViewType) {
            setViewType(selectedViewType);
        }
    }

    function handleSearchOnChange(event) {
        if (!event.target.value) setSearchBy("");
    }

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["search"].value);
    }

    function getRecords(selectedViewType) {
        switch (selectedViewType) {
            case LIST_OF_RECIPES_VIEW_TYPE.CARD:
                return filteredRecipesList.map(record => {return (<RecordCard record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD:
                return filteredRecipesList.map(record => {return (<RecordLittleCard record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LIST:
                return <RecordList records={filteredRecipesList}/>;
            default:
                return null;
        }
    }

    return (
        <div>
            <ListOfRecipesNavbar
                onSubmit={handleSearch}
                onChange={handleSearchOnChange}
                onClick={selectViewType}
            />
            <div className="Records">
                {getRecords(viewType)}
            </div>
        </div>
    );
}

export default ListOfRecipes;
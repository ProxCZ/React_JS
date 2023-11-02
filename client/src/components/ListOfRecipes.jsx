import React, {useMemo, useState} from "react";
import RecordCard from "../components/RecordCard";
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import RecordLittleCard from "./RecordLittleCard";
import RecordList from "./RecordList";
import "./ListOfRecipes.css";
import {getLabel} from "../helpers/helper";

function ListOfRecipes(props) {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD);
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipesList = useMemo(() => {
        if (props.recipesList) {
            return props.recipesList.filter(item =>
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        } else {
            return null;
        }
    }, [searchBy, props.recipesList]);

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
                return filteredRecipesList.map(record => {return (<RecordCard key={record.name} record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD:
                return filteredRecipesList.map(record => {return (<RecordLittleCard key={record.name} record={record} ingredientsList={props.ingredientsList}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LIST:
                return <RecordList records={filteredRecipesList}/>;
            default:
                return (
                    <div className="error">
                        <div>{getLabel("LOADING_ERROR")}</div>
                    </div>
                );
        }
    }

    return (
        <div>
            <div>
                <ListOfRecipesNavbar
                    onSubmit={handleSearch}
                    onChange={handleSearchOnChange}
                    onClick={selectViewType}
                />
                <div className={"d-flex d-sm-none"}>
                    {filteredRecipesList !== null && filteredRecipesList.map(record => {return (<RecordCard key={record.name} record={record}/>)})}
                </div>
                <div className={"d-none d-sm-flex"}>
                    {filteredRecipesList !== null && getRecords(viewType)}
                </div>
            </div>
        </div>
    );
}

export default ListOfRecipes;
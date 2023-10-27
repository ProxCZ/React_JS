import React, {useMemo, useState} from "react";
import RecordCard from "../components/RecordCard";
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE, LOADING} from "../helpers/const";
import RecordLittleCard from "./RecordLittleCard";
import RecordList from "./RecordList";
import Loader from "./Loader";

function ListOfRecipes(props) {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD);
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipesList = useMemo(() => {
        console.log(props.recipesList);
        if (props.recipesList && props.recipesList.data) {
            return props.recipesList.data.filter(item =>
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        } else {
            return null;
        }
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
            { props.recipesList.state === LOADING.SUCCESS &&
                <div>
                    <ListOfRecipesNavbar
                        onSubmit={handleSearch}
                        onChange={handleSearchOnChange}
                        onClick={selectViewType}
                    />
                    <div className="Records">
                        {filteredRecipesList !== null && getRecords(viewType)}
                    </div>
                </div>
            }
            <Loader
                load={props.recipesList}
            />
        </div>
    );
}

export default ListOfRecipes;
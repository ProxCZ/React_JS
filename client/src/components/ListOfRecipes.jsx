import React, {useMemo, useState} from "react";
import RecordCard from "../components/RecordCard";
import ListOfRecipesNavbar from "./ListOfRecipesNavbar";
import {LIST_OF_RECIPES_VIEW_TYPE} from "../helpers/const";
import RecordLittleCard from "./RecordLittleCard";
import RecordList from "./RecordList";
import "./ListOfRecipes.css";
import {getLabel} from "../helpers/helper";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";
import {Button} from "react-bootstrap";
import AddRecipe from "./AddRecipe";
import DeleteError from "./alerts/DeleteError";

function ListOfRecipes(props) {

    const [viewType, setViewType] = useState(LIST_OF_RECIPES_VIEW_TYPE.CARD);
    const [searchBy, setSearchBy] = useState("");
    const [addRecipeShow, setAddRecipeShow] = useState({
        state: false
    });
    const [recipesData, setRecipesData] = useState(props.recipesList);
    const [deleteRecipeError, setDeleteRecipeError] = useState('');

    const handleAddRecipeShow = (data) => setAddRecipeShow({ state: true, data: data });

    const filteredRecipesList = useMemo(() => {
        if (recipesData) {
            return recipesData.filter(item =>
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        } else {
            return null;
        }
    }, [searchBy, recipesData]);

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
                return filteredRecipesList.map(record => {return (<RecordCard key={record.name} onClick={handleAddRecipeShow} setDeleteRecipeError={setDeleteRecipeError} handleRecipeDeleted={handleRecipeDeleted} record={record}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LITTLE_CARD:
                return filteredRecipesList.map(record => {return (<RecordLittleCard key={record.name} onClick={handleAddRecipeShow} setDeleteRecipeError={setDeleteRecipeError} handleRecipeDeleted={handleRecipeDeleted} record={record} ingredientsList={props.ingredientsList}/>)});
            case LIST_OF_RECIPES_VIEW_TYPE.LIST:
                return <RecordList onClick={handleAddRecipeShow} setDeleteRecipeError={setDeleteRecipeError} handleRecipeDeleted={handleRecipeDeleted} records={filteredRecipesList}/>;
            default:
                return (
                    <div className="error">
                        <div>{getLabel("LOADING_ERROR")}</div>
                    </div>
                );
        }
    }

    const handleRecipeAdded = (recipe) => {
        let recipesDataList = [...recipesData];

        if (recipe.id) {
            recipesDataList = recipesDataList.filter((record) => record.id !== recipe.id);
        }
        setRecipesData([...recipesDataList, recipe]);
    }

    const handleRecipeDeleted = (recipeId) => {
        let recipesDataList = [...recipesData];

        if (recipeId) {
            recipesDataList = recipesDataList.filter((record) => record.id !== recipeId);
        }
        setRecipesData([...recipesDataList]);
    }

    return (
        <div>
            <div>
                <ListOfRecipesNavbar
                    onSubmit={handleSearch}
                    onChange={handleSearchOnChange}
                    onClick={selectViewType}
                />
                <div className="PageBody">
                    <div>
                        <Button
                            style={{ float: "right" }}
                            variant="secondary"
                            className="btn btn-success btn-sm"
                            onClick={() => handleAddRecipeShow()}
                        >
                            <Icon path={mdiPlus} size={1} />
                            {getLabel("ADD_RECIPE")}
                        </Button>
                    </div>
                    <div className={"d-flex d-sm-none"}>
                        {filteredRecipesList !== null && filteredRecipesList.map(record => {return (<RecordCard onClick={handleAddRecipeShow} setDeleteRecipeError={setDeleteRecipeError} handleRecipeDeleted={handleRecipeDeleted} key={record.name} record={record}/>)})}
                    </div>
                    <div className={"d-none d-sm-flex"}>
                        {filteredRecipesList !== null && getRecords(viewType)}
                    </div>
                </div>
            </div>
            <AddRecipe
                setAddRecipeShow={setAddRecipeShow}
                ingredientsList={props.ingredientsList}
                show={addRecipeShow.state}
                recipeData={addRecipeShow.data}
                onComplete={(recipe) => handleRecipeAdded(recipe)}
            />
            <DeleteError
                deleteRecipeError={deleteRecipeError}
                show={!!deleteRecipeError}
                setDeleteRecipeError={setDeleteRecipeError}
            />
        </div>
    );
}

export default ListOfRecipes;
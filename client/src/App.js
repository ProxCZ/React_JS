import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfRecipes from "./components/ListOfRecipes";
import Labels from './data/labels.json'
import React, {useEffect, useState} from "react";
import {LOADING} from "./helpers/const";
import Loader from "./components/Loader";
import {getLabel} from "./helpers/helper";

function App() {

    const [loadRecipes, setLoadRecipes] = useState({
        state: LOADING.PENDING,
    });

    const [loadIngredients, setLoadIngredients] = useState({
        state: LOADING.PENDING,
    });

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setLoadIngredients({ state: LOADING.ERROR, error: responseJson });
            } else {
                setLoadIngredients({ state: LOADING.SUCCESS, data: responseJson });
            }
        }).catch((error) => {
            setLoadIngredients({ state: LOADING.ERROR, data: "{txt}" });
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setLoadRecipes({ state: LOADING.ERROR, error: responseJson });
            } else {
                setLoadRecipes({ state: LOADING.SUCCESS, data: responseJson });
            }
        }).catch((error) => {
            setLoadIngredients({ state: LOADING.ERROR, data: "{txt}" });
        });
    }, []);

  return (
    <div className="App">
      <h1>{getLabel("MAIN_TITLE")}</h1>
        <p>{getLabel("SECOND_TITLE")}</p>
      <div className="body">
          { loadRecipes.state === LOADING.SUCCESS &&
              <ListOfRecipes
                  labels={Labels}
                  recipesList={loadRecipes.data}
                  ingredientsList={loadIngredients.data && loadIngredients.data}
              />
          }
          <Loader
              load={loadRecipes}
          />
      </div>
    </div>
  );
}

export default App;

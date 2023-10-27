import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfRecipes from "./components/ListOfRecipes";
import Labels from './data/labels.json'
import {useEffect, useState} from "react";
import {LOADING} from "./helpers/const";

function App() {

    const [loadRecipes, setLoadRecipes] = useState({
        state: LOADING.PENDING,
    });

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
        });
    }, []);

  return (
    <div className="App">
      <h1>CookBook</h1>
        <p>Aplikace vytvořená v ReactJS</p>
      <div className="body">
          <ListOfRecipes
              labels={Labels}
              recipesList={loadRecipes}
          />
      </div>
    </div>
  );
}

export default App;

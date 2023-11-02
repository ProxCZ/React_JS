import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {LOADING} from "../helpers/const";
import Loader from "../components/Loader";

function Ingredients() {

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

    return (
        <div className="body">
            { loadIngredients.state === LOADING.SUCCESS &&
                <ul>
                    {
                        loadIngredients.data.map((ingredient) => {
                                return <li key={ingredient.id}>{ingredient.name}</li>;
                            }
                        )
                    }
                </ul>
            }
            <Loader
                load={loadIngredients}
            />
        </div>
    );
}

export default Ingredients;
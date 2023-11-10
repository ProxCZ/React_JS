import {useState} from "react";
import Icon from "@mdi/react";
import {mdiTrashCanOutline} from "@mdi/js";
import {LOADING} from "../helpers/const";
import Confirmation from "./Confirmation";

function DeleteRecipe(props) {
    const [deleteRecipeCall, setDeleteRecipeCall] = useState({
        state: LOADING.INACTIVE
    });

    const handleDelete = async () => {
        if (deleteRecipeCall.state === LOADING.PENDING)
            return

        setDeleteRecipeCall({ state: LOADING.PENDING });

        const res = await fetch(`http://localhost:3000/recipe/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: props.recipe.id })
        });

        const data = await res.json();

        if (res.status >= 400) {
            setDeleteRecipeCall({ state: LOADING.ERROR, error: data });

            if (typeof props.onError === 'function')
                props.onError(data.errorMessage);

        } else {
            setDeleteRecipeCall({ state: LOADING.SUCCESS, data });

            if (typeof props.onDelete === 'function') {
                props.onDelete(props.recipe.id);
            }
        }
    }

    return (
        <Confirmation
            title="Smazat Recept"
            message="Opravdu si přejete smazat Recept?"
            confirmText="Smazat"
            onConfirm={handleDelete}
        >
            <div>
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'red' }}
                    size={0.8}
                ></Icon>
            </div>
        </Confirmation>
    )
}

export default DeleteRecipe;
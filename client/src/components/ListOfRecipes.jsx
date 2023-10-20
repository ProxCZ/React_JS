import Recipes from '../data/recipes.json'
import RecordCard from "../components/RecordCard";

function ListOfRecipes() {
    return (
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
    );
}

export default ListOfRecipes;
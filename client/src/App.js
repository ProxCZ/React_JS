import './App.css';
import Recipes from './data/recipes.json'
import RecordCard from "./components/RecordCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>CookBook</h1>
        <p>Aplikace vytvořená v ReactJS</p>
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
    </div>
  );
}

export default App;

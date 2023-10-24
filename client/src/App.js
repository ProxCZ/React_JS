import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfRecipes from "./components/ListOfRecipes";
import Labels from './data/labels.json'

function App() {

  return (
    <div className="App">
      <h1>CookBook</h1>
        <p>Aplikace vytvořená v ReactJS</p>
      <div className="body">
        <ListOfRecipes labels={Labels}/>
      </div>
    </div>
  );
}

export default App;

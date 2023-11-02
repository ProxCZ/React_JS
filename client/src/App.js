import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import createRoutes from "./routes/routes";

function App() {

  return (
    <div className="App">
        {createRoutes()}
    </div>
  );
}

export default App;

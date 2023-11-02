import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NoPageFound from "../pages/NoPageFound"
import SharedLayout from "../pages/SharedLayout";
import Recipes from "../pages/Recipes";
import Ingredients from "../pages/Ingredients";

const createRoutes = () => {
    return<BrowserRouter>
        <Routes>
            <Route path="/" element={<SharedLayout />} >
                <Route index element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/ingredients" element={<Ingredients />} />
                <Route path="*" element={<NoPageFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default createRoutes
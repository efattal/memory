import {createBrowserRouter} from "react-router-dom";
import Welcome from "./Welcome.tsx";
import Game from "./Game.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome/>,
    },{
        path: "/games/:slug",
        element: <Game/>,
    },
]);

export default router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/Router";

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import { DefaultComponent } from "../components/default/default.component";
import { DetailsComponent } from "../components/details/details.component";
import { RoutePaths } from "../enums/route-paths";

export const staticRouter = createBrowserRouter([
  {
    path: RoutePaths.default,
    element: <DefaultComponent />,
  },
  {
    path: `${RoutePaths.details}/:factoryId/:month/:year?`,
    element: <DetailsComponent />,
  },
]);

import { create } from "axios";
import Routes from "../Routes";


export default create({
  baseURL: Routes.API.URL
});

import { ReducerFunctions } from "../../utils";
import { GetCatalogues, CatalogueProducts} from "./Action";

export const get_catalogue_reducer = ReducerFunctions(GetCatalogues, {});
export const get_catalogue_products_reducer = ReducerFunctions(CatalogueProducts, {});

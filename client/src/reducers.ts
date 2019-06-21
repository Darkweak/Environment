import { CategoryReducer } from "./components/Category/store/categoryReducer";
import { FormReducer } from "./components/Form/store/formReducer";
import { SubjectReducer } from "./components/Item/store/itemReducer";
import { UserReducer } from "./components/User/store/userReducer";
import { ThemeReducer } from "./components/Layout/store/themeReducer";
import { ResponseReducer } from "./components/Response/store/responseReducer";

export const reducers = {
    CategoryReducer,
    FormReducer,
    SubjectReducer,
    ResponseReducer,
    ThemeReducer,
    UserReducer
};

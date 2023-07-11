import { legacy_createStore, applyMiddleware, compose} from "redux";
import thunk  from "redux-thunk";
import rootReducer from "./reducer";



const composeEnhancers = (typeof window !== 'undefined' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; /*iniciamos la configuracion de redux para poder trabajar con redux DevTools*/

const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))/* esta linea nos permitira trabajar con funciones asincronas*/
)


export default store;

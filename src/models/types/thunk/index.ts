import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

import {TRootState} from "../../../redux/store/store";

export type ThunkVoid = ThunkAction<void, TRootState, unknown, AnyAction>
export type ThunkPromise = ThunkAction<Promise<void>, TRootState, unknown, AnyAction>
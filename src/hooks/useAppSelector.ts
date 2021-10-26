import {TypedUseSelectorHook, useSelector} from "react-redux";

import {TRootState} from "../redux/store/store";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
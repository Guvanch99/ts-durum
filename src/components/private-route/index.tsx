import React, {FC} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {ROUTER_SIGN_UP} from '../../constants/routers.constants'

const PrivateRoute:FC = ({children, ...rest}) => {
   // const {user} = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={() => (true ? children : <Redirect to={ROUTER_SIGN_UP}/>)}
        />
    )
}

export default PrivateRoute

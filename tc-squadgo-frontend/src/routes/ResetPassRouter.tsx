import React from 'react'
import { Route as ReactRoute, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean
    component: React.ComponentType<any>
}

const Router: React.FC<RouteProps> = ({ component: Component, isPrivate = true, ...rest }) => {
    const { user } = useAuth()

    if (!user && isPrivate) {
        return <Redirect to='/login' />
    }

    if (user && !isPrivate) {
        return <Redirect to='/' />
    }

    return (
        <ReactRoute {...rest} render={(props: any) => (
            <Component {...props} />
        )} />
    )
}

export default Router
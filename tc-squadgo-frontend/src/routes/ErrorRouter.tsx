import React from 'react'
import { Route as ReactRoute, RouteProps as ReactRouteProps } from 'react-router-dom'

interface RouteProps extends ReactRouteProps {
    component: React.ComponentType<any>
}

const ErrorRouter: React.FC<RouteProps> = ({ component: Component, ...rest }) => {

    return (
        <ReactRoute {...rest} render={(props: any) => (
            <Component {...props}/>
        )}/>
    )
}

export default ErrorRouter
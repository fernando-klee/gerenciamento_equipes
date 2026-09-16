import React from 'react'
import { Route as ReactRoute, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Auth from '../pages/_layouts/auth'
import { Cookies } from 'react-cookie'
import Default from '../pages/_layouts/default'

interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean
    permissions?: string[]
    component: React.ComponentType<any>
}

const PageBlankRouter: React.FC<RouteProps> = ({ component: Component, isPrivate = true, permissions, ...rest }) => {
    const { user } = useAuth()
    
//    if(!(new Cookies().get('tc-auth-token'))) {
//     window.location.href = 'https://auth.testingcompany.com.br/?url=https://squadgo.testingcompany.com.br/'
//    }
   //cookie.get('tc-auth-token'))

    if(!user && isPrivate) {
        return <Redirect to='/' />
    }

    if(user && !isPrivate) {
        return <Redirect to='/' />
    }

    if(permissions) {
        const userPermissions = user.permissions
        const hasPermission = userPermissions.some(userPermission => permissions.includes(userPermission))

        if(!hasPermission) return <Redirect to='/' />
    }

    const Layout = user ? Default : Auth

    return (
        <ReactRoute {...rest} render={(props: any) => (
                <Component {...props}/>
        )}/>
    )
}

export default PageBlankRouter
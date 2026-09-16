import React from 'react'
import { Route as ReactRoute, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MyProfile from '../pages/MyProfile'
import Auth from '../pages/_layouts/auth'
import Default from '../pages/_layouts/default'

interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean
    permissions?: string[]
    component: React.ComponentType<any>
}

const MyProfileRouter: React.FC<RouteProps> = ({ component: Component, isPrivate = true, permissions, ...rest }) => {
    const { user } = useAuth()

    if(!user && isPrivate) {
        return <Redirect to='/login' />
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
            <Layout>
                <MyProfile>
                    <Component {...props}/>
                </MyProfile>
            </Layout>
        )}/>
    )
}

export default MyProfileRouter
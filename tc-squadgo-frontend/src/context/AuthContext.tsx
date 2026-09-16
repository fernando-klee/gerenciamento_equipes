import { createContext, useContext, useState } from "react"
import { useToast } from '@chakra-ui/react'
import { Cookies } from 'react-cookie'
import { api } from "../services/api"

type Credentials = {
    email: string
    password: string
}

type UpdateUserProps = {
    name: string
    email: string
    password: string
    newPassword: string
}

type UserProps = {
    id: number
    name: string
    email: string
    permissions: string[]
}

type AuthStateProps = {
    user: UserProps
    isLoading: boolean
}

type AuthContextProps = {
    user: UserProps
    isAuthenticated: boolean
    isLoading: boolean
    signIn(data: Credentials): Promise<void>
    singOut(): void
    updateUser(data: UpdateUserProps): Promise<void>
    hasPermissions(permissions: string[]): boolean
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/; domain=";
    document.cookie = name + "=" + cookieValue;
}


export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
    const toast = useToast()
    const [cookie] = useState(new Cookies())
    const [data, setData] = useState<AuthStateProps>(() => {
        const token = cookie.get('tc-auth-token')
        
        // setCookie('tc-hml-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVJZCI6IlQyMDIxMDAyNCIsIm5hbWUiOiJNYXVybyBNZXR6IGRhIFNpbHZhIiwiZW1haWwiOiJtYXVyb0B0ZXN0aW5nY29tcGFueS5jb20uYnIiLCJyb2xlIjoiRW1wbG95ZWUiLCJuYmYiOjE2OTMzOTUxNjMsImV4cCI6MTY5MzQzMTE2MywiaWF0IjoxNjkzMzk1MTYzLCJpc3MiOiJ0Yy1hdXRoLWJhY2tFbmQtdjEiLCJhdWQiOiJodHRwczovL3RjLWF1dGgtYXBpLmF6dXJld2Vic2l0ZXMubmV0In0.bwoyEDXhpguzEp5dOvjHc0R3wVifDj-OTaw_kvvw-VM', 7);
        
        let userStored = localStorage.getItem('tcTeam:user')

        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            api.get('/me')
                .then(res => {
                    const userResponse = res.data
                    localStorage.setItem('tcTeam:user', JSON.stringify(userResponse))
                    setData({ user: userResponse, isLoading: false })
                })
                .catch((err) => {
                    // alert('err ---> '+err.response.data)
                    window.location.href = 'https://auth.testingcompany.com.br/?url=https://squadgo.testingcompany.com.br/'
                })

        } else {
            window.location.href = 'https://auth.testingcompany.com.br/?url=https://squadgo.testingcompany.com.br/'
        }

        if (userStored) {
            const userStoredParsed: UserProps = JSON.parse(userStored)
            return { user: userStoredParsed, isLoading: false } as AuthStateProps
        }
        return {} as AuthStateProps
    })

    async function signIn({ email, password }: Credentials) {
        setData((oldData) => {
            return { ...oldData, isLoading: true }
        })

        api.post('/sessions', {
            email,
            password
        }).then(async res => {
            const { token } = res.data

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            cookie.set('tcTeam:token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            const userResponse = await api.get('/me')
            const user = userResponse.data

            localStorage.setItem('tcTeam:user', JSON.stringify(user))

            setData({ user, isLoading: false })
        })
            .catch(err => {
                const { message } = err.response.data
                toast({
                    title: message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
                setData({ isLoading: false } as AuthStateProps)
            })
    }

    function singOut() {
        cookie.remove('tc-auth-token')
        localStorage.removeItem('tc-auth-token')
        localStorage.clear()
        // setCookie('tc-auth-token', 'nzxqherazugmelralsssqkeyalexanderhamiltonnzxqherazugmelralsssq', 7);
        window.location.href = 'https://auth.testingcompany.com.br/?url=https://squadgo.testingcompany.com.br/'
    }

    async function updateUser({ name, email, password, newPassword }: UpdateUserProps) {
        const newUserProps = {
            name,
            email
        }

        if (password && newPassword) {
            Object.assign(newUserProps, {
                password,
                newPassword
            })
        }

        await api.put('/me', newUserProps)

        setData(oldData => {
            return { ...oldData, user: { ...oldData.user, name, email } }
        })

    }

    function hasPermissions(permissions: string[]): boolean {
        return data.user.permissions.some(userPermission => permissions.includes(userPermission))
    }

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                isAuthenticated: !!data.user,
                isLoading: data.isLoading,
                signIn,
                singOut,
                updateUser,
                hasPermissions
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

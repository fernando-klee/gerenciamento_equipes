import { useAuth } from "../../context/AuthContext"

interface HasRoleProps {
  permissions: string[]
  children: React.ReactNode
}

export const HasPermission: React.FC<HasRoleProps> = ({ children, permissions }) => {
  const { user } = useAuth()

  const userPermissions = user.permissions

  const hasPermission = userPermissions.some(userPermission => permissions.includes(userPermission))

  if (hasPermission) return <>{children}</>

  return <></>
}
export function checkPermission (
  userPermissions: string[],
  requiredPermission: string
): boolean {
  return userPermissions.some(
    (userPermission) => userPermission === requiredPermission
  );
};
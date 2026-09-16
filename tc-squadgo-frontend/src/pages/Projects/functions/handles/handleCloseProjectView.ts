export function handleCloseProjectView(
  history: { replace: (path: string) => void },
  onCloseView: () => void
): void {
  history.replace("/projetos");
  onCloseView();
};
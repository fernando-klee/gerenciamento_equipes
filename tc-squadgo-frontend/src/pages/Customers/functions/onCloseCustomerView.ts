import { History } from "history";


export function onCloseCustomerView(
    history: History<unknown>, 
    onCloseView: () => void
) {
    history.replace('/clientes')
    onCloseView()
}
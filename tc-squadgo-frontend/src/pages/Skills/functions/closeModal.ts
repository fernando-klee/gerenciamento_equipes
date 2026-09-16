import { UseFormReset, UseFormClearErrors } from "react-hook-form";

export function closeModal(
  reset: UseFormReset<any>,
  clearErrors: UseFormClearErrors<any>,
  onClose: () => void
) {
  reset();
  clearErrors();
  onClose();
  console.log("onClose");
}
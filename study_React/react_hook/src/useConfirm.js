export const useConfirm = (message = "", callback, rejection, onCancel) => {
  if(onConfirm && typeof onConfirm !== "function") {
    return;
  }
  if(onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if(confirm(message)) {
      onConfirm();
    } else {
      oncancel();
    }
  };
  return confirmAction;
};
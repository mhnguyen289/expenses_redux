export const showMessage = message => ({
  type: types.SHOW_MESSAGE,
  message,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

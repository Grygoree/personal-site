const initialState = {
  appName: '',
  modalMode: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      console.log(`toggling modal: ${action.modalMode}`)
      return {
        ...defaultState,
        modalMode: action.modalMode
      }

    default:
      return state;
  }
}

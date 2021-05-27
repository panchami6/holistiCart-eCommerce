export function ProductsReducer(state, action) {
    switch (action.type) {
      case "TOGGLE_INVENTORY":
        return (state = {
          ...state,
          showInventoryAll: !state.showInventoryAll
        });

      case "TOGGLE_DELIVERY":
        return (state = {
          ...state,
          showFastDeliveryOnly: !state.showFastDeliveryOnly
        });
      case "SORT":
        return {
          ...state,
          sortBy: action.payload
        };
      default:
        return state;
    }
  }
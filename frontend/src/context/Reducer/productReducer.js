export const productReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ALL":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "EDIT":
      let updateIndex = state.findIndex((s) => s._id === action.payload.id);
      let keysArray = Object.keys(action.payload.details);
      keysArray.forEach((key) => {
        state[updateIndex][key] = action.payload.details[key];
      });
      return [...state];

    case "DELETE":
      return state.filter((s) => s._id !== action.payload);

    default:
      return state;
  }
};

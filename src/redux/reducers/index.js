const initialState = {
  date: Date.now()
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPDATEDATE": {
      return {
        ...state,
        date: action.payload
      };
    }

    default:
      return state;
  }
}

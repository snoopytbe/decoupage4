const initialState = {
  date: Date.now(),
  depense: { montant: 100, categorie: "Dépense" },
  part1: { montant: 100, categorie: "Dépense" },
  part2: [{ montant: 0, categorie: "" }]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPDATEDATE": {
      return {
        ...state,
        date: action.payload
      };
    }

    case "UPDATEDEPENSE": {
      return {
        ...state,
        depense: action.payload
      };
    }

    case "UPDATEPART1": {
      return {
        ...state,
        part1: action.payload
      };
    }

    case "UPDATEPART2": {
      return {
        ...state,
        part2: action.payload
      };
    }

    default:
      return state;
  }
}

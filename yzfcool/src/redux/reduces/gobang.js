const RECORDCOORDINATES = 'gobang/RECORDCOORDINATES';
const RELOAD = 'gobang/RELOAD';

const initialState = {
  currentPlayer: true, // true 为黑棋 , false 为白棋
  coordinates: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECORDCOORDINATES:
      const coordinatesItem = Object.assign(action.payload, { player: state.currentPlayer });
      return {
        ...state,
        coordinates: [...state.coordinates, coordinatesItem],
        currentPlayer: !state.currentPlayer
      }
    case RELOAD:
      return {
        ...state,
        coordinates: []
      }
    default:
      return state;
  }
}

export function recordCoordinates(payload) {
  return {
    type: RECORDCOORDINATES,
    payload
  };
}

export function reload() {
  return {
    type: RELOAD
  };
}
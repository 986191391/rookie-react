const RECORDCOORDINATES = 'gobang/RECORDCOORDINATES';
const RELOAD = 'gobang/RELOAD';
const INITCOORDINATES = 'gobang/INITCOORDINATES';

const initialState = {
  currentPlayer: true, // true 为黑棋 , false 为白棋
  coordinates: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECORDCOORDINATES:
      const coordinates = state.coordinates;
      const { x, y } = action.payload;
      const curCoordinatesItem = coordinates.find((coordinatesItem) => coordinatesItem.x === x && coordinatesItem.y === y);
      curCoordinatesItem.player = state.currentPlayer;
      return {
        ...state,
        coordinates,
        currentPlayer: !state.currentPlayer
      }
    case RELOAD:
      return {
        ...state,
        coordinates: [],
        currentPlayer: true
      }
    case INITCOORDINATES:
      return {
        ...state,
        coordinates: action.payload,
        currentPlayer: true
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

export function initCoordinates(payload) {
  return {
    type: INITCOORDINATES,
    payload
  }
}
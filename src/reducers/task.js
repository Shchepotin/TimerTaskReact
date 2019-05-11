import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  RECEIVE_CURRENT_TASK,
  RESET_INDICATORS,
  START_TASK,
  STOP_TASK,
  UPDATE_CURRENT_TASK,
  DESTROY_TASK,
  GENERATE_RANDOM_TASKS,
} from '../actions/task';

import generateRandomTasks from '../utils/generateRandomTasks';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
  item: {},
  currentItem: {
    start: null,
    name: '',
    stop: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TASK:
      return {
        ...state,
        currentItem: action.payload,
      };
    case UPDATE_CURRENT_TASK:
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          ...action.payload,
        },
      };
    case STOP_TASK:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            id: (state.items[state.items.length - 1] && state.items[state.items.length - 1].id + 1) || 1,
          }
        ],
        currentItem: initialState.currentItem,
      };
    case RECEIVE_CURRENT_TASK:
      return {
        ...state,
        currentItem: action.payload,
      };
    case RECEIVE_TASK:
      return {
        ...state,
        item: state.items.find(item => item.id === action.payload.id) || {},
        isError: !state.items.find(item => item.id === action.payload.id),
      };
    case RECEIVE_TASKS:
      return {
        ...state,
        items: action.payload,
      };
    case DESTROY_TASK:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case GENERATE_RANDOM_TASKS:
      return {
        ...state,
        items: generateRandomTasks(),
      };
    case RESET_INDICATORS:
      return {
        ...state,
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  }
};

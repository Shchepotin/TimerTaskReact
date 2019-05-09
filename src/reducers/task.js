import {
  REQUEST_TASKS,
  RECEIVE_TASKS,
  FAILURE_TASKS,
  REQUEST_TASK,
  RECEIVE_TASK,
  FAILURE_TASK,
  REQUEST_CURRENT_TASK,
  RECEIVE_CURRENT_TASK,
  FAILURE_CURRENT_TASK,
} from '../actions/task';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
  item: {},
  currentItem: {
    name: '',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TASKS:
      return { ...state, isFetching: true, isError: false };
    case RECEIVE_TASKS:
      return { ...state, items: action.payload, isFetching: false };
    case FAILURE_TASKS:
      return { ...state, isFetching: false, isError: true };

    case REQUEST_TASK:
      return { ...state, isFetching: true, isError: false };
    case RECEIVE_TASK:
      return { ...state, item: action.payload, isFetching: false };
    case FAILURE_TASK:
      return { ...state, isFetching: false, isError: true };

    case REQUEST_CURRENT_TASK:
      return { ...state, isFetching: true, isError: false };
    case RECEIVE_CURRENT_TASK:
      return { ...state, currentItem: action.payload, isFetching: false };
    case FAILURE_CURRENT_TASK:
      return { ...state, isFetching: false, isError: true };
    default:
      return state;
  }
};

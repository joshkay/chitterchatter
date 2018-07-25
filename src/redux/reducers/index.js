import { combineReducers } from 'redux';
import {
  SEND_MESSAGE
} from './actions';

function messages(state = [], action)
{
  switch (action.type)
  {
    case SEND_MESSAGE:
      return;
    default:
      return state;
  }
}

const blocChat = combineReducers({
  messages
});

export default blocChat;
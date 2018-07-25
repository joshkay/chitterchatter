// action types
export const GET_ROOMS = 'GET_ROOMS';
export const ADD_ROOM = 'ADD_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';

export const SEND_MESSAGE = 'SEND_MESSAGE';

// action creators
export function sendMessage(text)
{
  return {
    type: SEND_MESSAGE,
    text
  }
}
import io from 'socket.io-client';
import { socketUrl } from '../../api-routes';

const socket = io(socketUrl, {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 3,
  transports: ['websocket'],
});

var listeners = {}; // map event key to array of callback functions

var sendQueue = [];

socket.on('connect', () => {
  socket.connected = true;
  retrySend();
});

socket.on('reconnect', () => {
  socket.connected = true;
  retrySend();
});

socket.on('disconnect', () => {
  socket.connected = false;
});

function retrySend() {
  sendQueue.forEach(({ eventKey, data }) => {
    sendData(eventKey, data);
  });
}

function onEvent (eventKey, data) {
  listeners[eventKey].forEach((callbackFn) => {
    callbackFn(data);
  });
}

export function subscribe(eventKey, callbackFn) {
  if (!listeners[eventKey]) {
    listeners[eventKey] = [];
    socket.on(eventKey, (data) => {
      onEvent(eventKey, data);
    });
  }
  listeners[eventKey].push(callbackFn);
}

export function unsubscribe(eventKey, callbackFn) {
  const index = listeners[eventKey].indexOf(callbackFn);
  listeners[eventKey].splice(index, 1);

  // if there are no more listeners for the given event key, remove the listener from the socket
  if (listeners[eventKey].length === 0) {
    socket.off(eventKey);
  }
}

export function sendData(eventKey, data) {
  if (socket.connected) {
    socket.emit(eventKey, data);
  } else {
    sendQueue.push({ eventKey, data });
    console.log(sendQueue);
  }
}
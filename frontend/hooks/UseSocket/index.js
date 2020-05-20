import React, { useEffect, useState } from 'react';
import * as socketHandler from './socket';

function useSocket(eventKey, callbackFn) {
  // const [connected, setConnected] = useState(socket.connected);

  const sendData = (data) => {
    socketHandler.sendData(eventKey, data);
  };

  useEffect(() => {
    // if not registered, register the event key on the socket
    socketHandler.subscribe(eventKey, callbackFn);

    // on component unmount, remove the listener
    return () => {
      socketHandler.unsubscribe(eventKey, callbackFn)
    };
  }, []);

  return { sendData }
}

export default useSocket;
/**
 * Created by jarek on 22/12/2016.
 */
export default (io) => {

  console.log(io);

  io.sockets.on('connect', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {

      console.log('a user disconnected');
    });

    socket.on('list', () => {
      console.log('list requested');
    })
  });
};
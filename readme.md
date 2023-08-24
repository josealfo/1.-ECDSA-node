## ECDSA Node

This project is an example for Alchemy University, of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly centralized. We won't worry about distributed consensus for this project.

I incorporated Public Key Cryptography (by using Elliptic Curve Digital Signatures). First of all, we use public key addresses (longer one). Security is achieved with public/private keys. The server will only allow transfers that have been signed for by the person who owns the associated address. In this way we prove that the transfer of funds can be done only by the owner.

### Video instructions
There is a video to get started on this exercise:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

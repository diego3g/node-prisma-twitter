import 'dotenv/config';

import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

// import WebSocket from 'ws';

// import debug from 'debug';
// import jwt from 'jsonwebtoken';
import routes from './routes';

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      return response.status(500).json({ message: error.message });
    }
  );

  // const websocketServer = new WebSocket.Server({ server });

  server.listen(3333);
}

main();

// const connectedUsers = new Map<string, WebSocket>();

// interface AuthenticatePayload {
//   token: string;
// }

// interface TokenPayload {
//   iat: number;
//   exp: number;
//   sub: string;
// }

// const wsDebug = debug('ws')

// websocketServer.on('connection', (ws, request) => {
//   /**
//    * Proxy messages to the right handler
//    */
//   ws.on('message', function (message: string) {
//     try {
//       const { type, payload } = JSON.parse(message);

//       this.emit(type, payload);
//     } catch(err) {
//       console.error('ws: Not an event' , err);
//     }
//   });

//   ws.on('authenticate', ({ token }: AuthenticatePayload) => {
//     try {
//       const decoded = jwt.verify(token, 'secretKey') as TokenPayload;

//       connectedUsers.set(decoded.sub, ws);

//       wsDebug(`New connection: ${decoded.sub}`);

//       ws.on('close', () => {
//         connectedUsers.delete(decoded.sub);

//         wsDebug(`Closed connection: ${decoded.sub}`);
//       });
//     } catch (err) {
//       throw new Error('Authentication failed');
//     }
//   });
// });

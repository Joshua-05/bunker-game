import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateLobbiDTO } from 'src/modules/lobbi/dto';

@WebSocketGateway({
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],         
      credentials: true,                 
    },
  })
  export class LobbyListGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('lobbyCreated')
    handleLobbyCreated(lobbi: CreateLobbiDTO[]): void {
        this.server.emit('lobbyCreated', lobbi); 
    }

    @SubscribeMessage('lobbyUpdated')
    handleLobbyUpdate(lobby: CreateLobbiDTO): void {
        this.server.emit('lobbyDeleted', lobby);
    }

    @SubscribeMessage('lobbyDeleted')
    handleLobbyDeleted(lobbyId: number): void {
        this.server.emit('lobbyDeleted', lobbyId);
    }
  }
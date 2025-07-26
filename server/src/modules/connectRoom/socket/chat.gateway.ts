import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserDTO } from '../dto';

export interface ICardsIsOpen {
    type: string;
    name: string;
}

export interface IOpenCards {
    gameId: number;
    userId: number;
    cards: ICardsIsOpen[];
}

@WebSocketGateway({
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],         
      credentials: true,                 
    },
  })

  
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer()
    server: Server;

    private lobbyUsers: { [key: string]: Set<string> } = {};

    handleConnection() {
        // console.log('Client connected:', client.id);
    }
    
    handleDisconnect() {
        // console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('userUpdate')
    handleLobbyCreated(user: UserDTO): void {
        this.server.emit('userUpdate', user); 
    }

    @SubscribeMessage('joinLobby') 
    handleJoinLobby(client: Socket, {lobbyId, userId, count}: {lobbyId: string, userId: string, count: number}): void {
        client.join(lobbyId);
        console.log(`Client ${client.id} joined lobby: ${lobbyId}`);
        if (!this.lobbyUsers[lobbyId]) {
            this.lobbyUsers[lobbyId] = new Set();
        }
        if (this.lobbyUsers[lobbyId].has(userId)) {
            console.log(`User ${userId} is already in the lobby.`);
            return;
        }
        this.lobbyUsers[lobbyId].add(userId);
        console.log(this.lobbyUsers[lobbyId].size, 'users in lobby:', count);
        if (this.lobbyUsers[lobbyId].size >= count) { 
            this.server.to(lobbyId).emit('lobbyFull', { message: 'Lobby is full, starting the game!' });
        } else {
            this.server.to(lobbyId).emit('userJoined', { sender: 'System', message: `User ${userId} has joined the lobby.` });
        }
        
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, { lobbyId, sender, text }: { lobbyId: string; sender: string; text: string }): void {
        this.server.to(lobbyId).emit('messages', { sender, text });
    }

    // private removeUserFromLobby(clientId: string) {
    //     for (const lobbyId in this.lobbyUsers) {
    //         if (this.lobbyUsers[lobbyId].has(clientId)) {
    //             this.lobbyUsers[lobbyId].delete(clientId);
                
    //             this.server.to(lobbyId).emit('userLeft', { sender: 'System', message: `User ${clientId} has left the lobby.` });

                
    //             if (this.lobbyUsers[lobbyId].size === 0) {
    //                 delete this.lobbyUsers[lobbyId]; 
    //             }
    //         }
    //     }
    // }
    @SubscribeMessage('leaveLobby') 
    handleLeaveLobby(client: Socket, { lobbyId, userId }: { lobbyId: string, userId: string}): void {

    if (this.lobbyUsers[lobbyId] && this.lobbyUsers[lobbyId].has(userId)) {
        this.lobbyUsers[lobbyId].delete(userId);
        this.server.to(lobbyId).emit('userLeft', { sender: 'System', message: `User ${userId} has left the lobby.` });
        if (this.lobbyUsers[lobbyId].size === 0) {
            delete this.lobbyUsers[lobbyId];
        }
    }
    }

    @SubscribeMessage('openCard')
    handleOpenCard(client: Socket, card: IOpenCards): void {
        // console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
        const id = card.gameId.toString()
        
        client.to(id).emit('userOpenCard', {
            userId: card.userId,
            cards: card.cards
        });
    }
}
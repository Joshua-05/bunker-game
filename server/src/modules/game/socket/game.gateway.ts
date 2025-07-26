import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export interface ICardsIsOpen {
    type: string;
    name: string;
}

export interface IOpenCards {
    gameId: number;
    userId: number;
    cards: ICardsIsOpen[];
}

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }
    
    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('openCard')
    handleOpenCard(client: Socket, card: IOpenCards): void {
        console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
        
        client.to(card.gameId.toString()).emit('userOpenCard', {
            userId: card.userId,
            cards: card.cards
        });
    }
}
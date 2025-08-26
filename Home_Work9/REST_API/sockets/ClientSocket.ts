import { Server, Socket } from 'socket.io';
interface CustomSocket extends Socket {
    clientId?: string;
}

export class ChatSocket {
    private io: Server;
    private clients: Record<string, { username: string }> = {};

    constructor(io: Server) {
        this.io = io;
        this.initialize();
    }

    private initialize() {
        this.io.on('connection', (socket: CustomSocket) => {
            console.log("🔌 Новий користувач:", socket.id);


            socket.on('register_client', ({ username }) => {
                this.clients[socket.id] = { username };
                socket.clientId = socket.id;
                socket.join(`room_${socket.id}`);
                this.io.emit('update_clients', this.clients);
                console.log(`Клієнт ${username} приєднався до room_${socket.id}`);
            });

            socket.on('operator_register', () => {
                socket.emit('update_clients', this.clients);
            });

            socket.on('client_message', ({ text, username }) => {
                console.log(`📩 Від клієнта ${username}: ${text}`);
                const roomId = `room_${socket.id}`;
                this.io.to(roomId).emit('operator_receive', { text, username, clientId: socket.id });
            });

            socket.on('operator_join', ({ clientId }) => {
                const roomId = `room_${clientId}`;
                socket.join(roomId);
                console.log(`Оператор ${socket.id} приєднався до кімнати ${roomId}`);
            });

            socket.on('operator_message', ({ clientId, text, username }) => {
                const roomId = `room_${clientId}`;
                this.io.to(roomId).emit('client_receive', { text, username });
            });

            socket.on('disconnect', () => {
                console.log(`❌ Користувач відключився: ${socket.id}`);

                if (socket.clientId) {
                    delete this.clients[socket.clientId]; // видаляємо клієнта
                    this.io.emit('update_clients', this.clients); // оновлюємо список для операторів
                }
            });
        });
    }
}

import { createServer } from "http";
import { Server } from "socket.io";
import url from "url";

const httpServer = createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
});

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const gameChat = new Map();
const game = new Map();
const playerInGame = new Map();
const gameMessages = new Map();
const gameBoard = new Map();

const isJoiningValid = (gameId, socketId) =>{
    let testGame = game.get(gameId);
    if(testGame != undefined){
        if(testGame >= 2){
            return false;
        }
        if(playerInGame.get(socketId) == gameId) return false;
        return true;
    }
}

io.on("connection", (socket) => {
    
    socket.on("conn", ({ gameId }) => {
        if(game.get(gameId) == undefined){
            game.set(gameId, 0);
            gameChat.set(gameId, []);
        }
        if(isJoiningValid(gameId, socket.id)){
            playerInGame.set(socket.id, gameId);
            let players = game.get(gameId) + 1;
            game.set(gameId, players);
            socket.join(gameId); 
            
            console.log(`Player connected to game: ${gameId}, Players: ${game.get(gameId)}`);
            io.to(gameId).emit("in", { message: "Um jogador entrou na sala!", quantity: game.get(gameId) });
        }
    });

    socket.on("sendMsg", ({gameId, message, username}) =>{
        if(gameMessages.get(gameId) == undefined){
            gameMessages.set(gameId, [message])
            
        }else{
            let msgs=gameMessages.get(gameId);
            msgs.push(message);
            gameMessages.set(gameId, msgs);
        }
        io.to(gameId).emit('newMsg', ({message, username}))
    });
    
    // socket.on("startPlaying", ({gameId})=> {
    //     if(playerInGame)
    // } )

    socket.on("disconnect", () => {
        console.log(`Player disconnected from game`);
        const gameId = playerInGame.get(socket.id);
        if(gameId === undefined) return;
        let players = game.get(gameId) - 1;
        game.set(gameId, players);
        io.to(gameId).emit("out", { message: "Um jogador saiu da sala!", quantity: game.get(gameId) });
    });

});

httpServer.listen(3003, () => {
    console.log("Server is running on port 3003");
});
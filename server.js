const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());

function handleGetRequestToRoot(request, response){
    console.log("/ was called");
    response.send("Hello, World");
}

const highscores = [
        {name: 'guesserman', score:4},
        {name: 'superguesser', score:5}
]

server.get("/scores", (request, response) =>{
    response.send(highscores);

});

server.get("/addscore", (request, response)=>{
    console.log('1', request);
    response.send("done");
    console.log((request.query.name));
    console.log((request.query.score));

    const scoreData = {
        name: request.query.name,
        score: request.query.score
    }

    highscores.push(scoreData);
    response.send("done");
});

// server.get("/", handleGetRequestToRoot);

// const compliments = [
//     "you look so wonderful",
//     "nice to meet you",
//     "happy to be your friend"
// ];

// server.get("/compliment", function(request, response){
    
//         var randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
//         response.send(randomCompliment);
// });

server.listen(3001, function(){console.log("server has started 3")});
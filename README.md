# FIAR

FIAR (Four-In-A-Row) is an online multiplayer game, with a vaporwave futuristic design inspired.
> Four-In-A-Row, also known as Connect Four, Four Up,
> Four-In-A-Line, Plot Four or Find Four,
> is a two-player connection game in which the players
> (identified by two different colors) take turns dropping colored discs
> from the top into a seven-column, six-row vertically suspended grid.
>  The pieces fall straight down, occupying the next available space within the column. 
>  The objective of the game is to be the first to form a horizontal,
> vertical, or diagonal line of four of one's own discs.
> Four-In-A-Row is a solved game. The first player can always win by playing the right moves.

## Features
FIAR allows players to play a 1 vs 1 match with rooms handling thanks to Socket.io library.
FIAR table is created with a dinamic matrix, so you can choise its sizes and change FIAR to a Tris game, or even to a Five-in-a-Row, Six-in-a-Row etc (logical checks are implemented only for the classic Four-in-a-Row, so you have to write them if you want some of the above variants).

After inserting a nickname, you will be able to:
  - Create a room (and wait for an opponet player)
  - Join a room (if already exists)

FIAR can be played on Desktops, Tablets and Smartphones, thanks to its responsive design.
Since the canvas containing the game, rendered thanks to p5.js library, is created in order to fit most of the display sizes.

## Tech

FIAR is a single-page application and it uses a number of open source projects to work properly:

* [p5.js] - JS library based on Processing
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [Express] - fast Node.js network app framework
* [Socket.io] - JS library for realtime web applications
* [jQuery] - Cross-platform JS library to simplify client-side scripting

## Installation

FIAR requires [Node.js](https://nodejs.org/) v8.9+ to run.

Note by default server listens in localhost on port 3000. So before running it,
you can change port number both in the server and on the client (Sketch.js), 
changing host, too.

Install the dependencies (Express and SocketIO modules) and run the server.

```sh
$ cd FIAR
$ npm install
$ node server.js
```

### Playing and Testing
After running server.js, in order to play the game you have to go on a browser
and simply insert the host and the port in URL (127.0.0.1:3000 by default).

#### Online
FIAR can be played online if you set your IP address in the client, but it needs you to port forward your router.
Note if you port forward port 80, clients can simply insert in URL the IP address you have set, without specify the port (xxx.xxx.xxx.xxx instead of xxx.xxx.xxx.xxx:80).

## Screenshots
![login.png](https://user-images.githubusercontent.com/23482292/39648854-fec8861c-4fe3-11e8-9ba2-0eb98fb1fbe9.png)
![main.png](https://user-images.githubusercontent.com/23482292/39648896-210cbe32-4fe4-11e8-90b8-9bfd44c69081.png)
![win.png](https://user-images.githubusercontent.com/23482292/39648923-36e53acc-4fe4-11e8-8d94-fe77f10cf96b.png)
![left.png](https://user-images.githubusercontent.com/23482292/39648942-4b8a3054-4fe4-11e8-8787-bcf34bf0c6e7.png)

## Authors
Project has been developed by [Mario Raciti] and [Gioele Cageggi], Computer Science students at Department of Mathematics and Computer Science, University of Catania, Italy.

##### Contacts

 - Emails: mraciti96@gmail.com - gcageggi@gmail.com
 - LinkedIn: linkedin.com/in/marioraciti - linkedin.com/in/gioele-cageggi
 - Facebook: facebook.com/MarioRacitiDev - facebook.com/gioele.cageggi
 - Twitter: twitter.com/zMrDevJ - twitter.com/mrJoelC_dev

## Todos

 - Allow players to play a rematch.
 - Improve mobile interface.


**Now let's play FIAR!**



   [P5.js]: <https://p5js.org/>
   [node.js]: <https://nodejs.org>
   [Twitter Bootstrap]: <https://twitter.github.com/bootstrap/>
   [jQuery]: <https://jquery.com>
   [express]: <https://expressjs.com>
   [Socket.io]: <https://socket.io>
   [Mario Raciti]: <https://github.com/zMrDevJ>
   [Gioele Cageggi]: <https://github.com/mrjoelc>
   

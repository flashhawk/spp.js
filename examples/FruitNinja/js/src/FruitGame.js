var FruitGame = FruitGame || {
	REVISION : '1',
	AUTHOR : "flashhawk",
	GITHUB:"https://github.com/flashhawk"
};

var gameWidth=750;
var gameHeight=500;

var topCanvas;
var topContext;
var middleCanvas;
var middleContext;
var bottomCanvas;
var bottomContext;

var particleSystem;
var fruitSystem;
var bombSystem;
var bladeSystem;
var gravity;

var timer=0;
var interval=1.8;


var bladeColor;
var bladeWidth;
//game data
var mouse = {};
var score;
var gameLife;
var storage;
var isPlaying;
var GAME_READY=1,GAME_PLAYING=2,GAME_OVER=3;
var gameState;
var gameLevel;
var levelStep=0.0001;

//start game ui
var ui_gameTitle;
var ui_newGame;
var ui_startFruit;

var ui_scoreIcon;
var ui_gameLife;
var ui_gamelifeTexture;
var ui_gameover;

//--collideTest
var collide;

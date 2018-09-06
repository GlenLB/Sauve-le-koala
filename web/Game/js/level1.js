var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DeviceClass = (function () {
    function DeviceClass() {
    }
    DeviceClass.prototype.find = function () {
        if (window.matchMedia("(max-width: 500px)").matches) {
            this.mobile = true;
            this.tactile = true;
            this.tablette = false;
            this.desktop = false;
            this.canvasWidth = 250;
            this.canvasHeight = 350;
        }
        else if (window.matchMedia("(min-width: 501px)").matches) {
            this.canvasWidth = 500;
            this.canvasHeight = 700;
            this.mobile = false;
            if ("ontouchstart" in document.documentElement) {
                this.tablette = true;
                this.tactile = true;
                this.desktop = false;
            }
            else {
                this.desktop = true;
                this.tablette = false;
                this.tactile = false;
            }
        }
    };
    return DeviceClass;
}());
var CanvasClass = (function () {
    function CanvasClass(width, height) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.alldisplayed = false;
        this.height = height;
        this.width = width;
        this.init();
    }
    CanvasClass.prototype.init = function () {
        var _this = this;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        window.addEventListener("load", function () {
            _this.boundingX = _this.canvas.getBoundingClientRect().left + window.scrollX;
            _this.boundingY = _this.canvas.getBoundingClientRect().top + window.scrollY;
        }, false);
    };
    CanvasClass.prototype.clearAll = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    CanvasClass.prototype.displayAll = function () {
        this.canvas.style.opacity = "1";
        Player.drawCmd.style.opacity = "0";
        Ball.canvas.style.opacity = "1";
        if (BonusClass.ball2) {
            BonusClass.Ball2.canvas.style.opacity = "1";
        }
        if (BonusClass.ball3) {
            BonusClass.Ball3.canvas.style.opacity = "1";
        }
        Paddle.canvas.style.opacity = "1";
        AudioClass.hideControl();
    };
    CanvasClass.prototype.hideAll = function () {
        this.canvas.style.opacity = "0";
        Ball.canvas.style.opacity = "0";
        if (BonusClass.ball2) {
            BonusClass.Ball2.canvas.style.opacity = "0";
        }
        if (BonusClass.ball3) {
            BonusClass.Ball3.canvas.style.opacity = "0";
        }
        Paddle.canvas.style.opacity = "0";
        AudioClass.displayControl();
    };
    return CanvasClass;
}());
var AudioClass = (function () {
    function AudioClass(elt) {
        this.elt = elt;
    }
    AudioClass.prototype.play = function () {
        this.elt.currentTime = 0;
        if (this.elt.paused) {
            this.elt.play();
        }
    };
    AudioClass.prototype.pause = function () {
        this.elt.pause();
    };
    AudioClass.prototype.reset = function () {
        this.elt.currentTime = 0;
    };
    AudioClass.displayControl = function () {
        if (AudioClass.firstCall) {
            window.addEventListener("load", function () {
                AudioClass.control.setAttribute("class", "fas fa-volume-down");
                AudioClass.control.style.color = "red";
                AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";
                AudioClass.control.style.left = Canvas.canvas.getBoundingClientRect().left + Canvas.width / 2 - AudioClass.control.clientWidth / 2 + "px";
                AudioClass.control.style.opacity = "1";
                AudioClass.control.addEventListener("click", function () {
                    if (AudioClass.soundOK) {
                        AudioClass.control.setAttribute("class", "fas fa-volume-down");
                        AudioClass.control.style.color = "red";
                        AudioClass.soundOK = false;
                    }
                    else {
                        AudioClass.control.setAttribute("class", "fas fa-volume-up");
                        AudioClass.control.style.color = "yellowgreen";
                        AudioClass.soundOK = true;
                        if (AudioClass.firstLoad) {
                            AudioClass.loadAll();
                            AudioClass.firstLoad = false;
                        }
                    }
                }, false);
            }, false);
            AudioClass.firstCall = false;
        }
        else {
            AudioClass.control.style.opacity = "1";
        }
    };
    AudioClass.hideControl = function () {
        AudioClass.control.style.opacity = "0";
    };
    AudioClass.loadAll = function () {
        BrickSound.play();
        BrickSound.pause();
        PaddleSound.play();
        PaddleSound.pause();
        BonusSound.play();
        BonusSound.pause();
        GoodPadleBonusSound.play();
        GoodPadleBonusSound.pause();
        BadPadleBonusSound.play();
        BadPadleBonusSound.pause();
        WinLevelSound.elt.volume = 0.5;
        WinLevelSound.play();
        WinLevelSound.pause();
        GameOverSound.elt.volume = 0.5;
        GameOverSound.play();
        GameOverSound.pause();
    };
    return AudioClass;
}());
AudioClass.control = document.getElementById("soundControl");
AudioClass.soundOK = false;
AudioClass.firstCall = true;
AudioClass.firstLoad = true;
var BackgroundClass = (function () {
    function BackgroundClass() {
        this.canvasBackground = document.getElementById("canvasBackground");
        this.canvasBackground.style.width = Canvas.width + "px";
        this.canvasBackground.style.height = Canvas.height + "px";
        if (!Device.mobile) {
            this.canvasBackground.style.background = "no-repeat center url('/Game/img/level1/background4.png')";
        }
        else {
            this.canvasBackground.style.background = "no-repeat center url('/Game/img/level1/background4_mobile.png')";
        }
    }
    return BackgroundClass;
}());
var ScoreClass = (function () {
    function ScoreClass() {
        this.displayScore = document.getElementById("score");
        this.score = 0;
    }
    ScoreClass.prototype.incrementScore = function () {
        this.score++;
        if (this.score < 10) {
            this.displayScore.innerHTML = "SCORE : 0" + this.score;
        }
        else {
            this.displayScore.innerHTML = "SCORE : " + this.score;
        }
    };
    return ScoreClass;
}());
var TactileButtonsClass = (function () {
    function TactileButtonsClass() {
        this.btnLeft = document.getElementById("btnLeft");
        this.btnRight = document.getElementById("btnRight");
        this.btnPlay = document.getElementById("btnPlay");
        this.containerBtn = document.getElementById("containerBtn");
        this.canvasBCR = Canvas.canvas.getBoundingClientRect();
        if (Device.mobile) {
            this.width = 80;
            this.height = 60;
            this.margin = 10;
        }
        else {
            this.width = 160;
            this.height = 100;
            this.margin = 20;
            this.marginLeft = 15;
            this.marginRight = this.marginLeft;
        }
    }
    TactileButtonsClass.prototype.display = function () {
        this.containerBtn.style.display = "flex";
        this.containerBtn.style.top = this.canvasBCR.top + Canvas.height + 10 + "px";
        if (!Device.mobile) {
            this.btnLeft.style.marginRight = this.marginRight + "px";
            this.btnPlay.style.marginLeft = this.marginLeft + "px";
            this.btnPlay.style.marginRight = this.marginRight + "px";
            this.containerBtn.style.marginBottom = "100px";
        }
        this.btnLeft.style.width = this.width + "px";
        this.btnRight.style.width = this.width + "px";
        this.btnPlay.style.width = this.width + "px";
        this.btnLeft.style.height = this.height + "px";
        this.btnRight.style.height = this.height + "px";
        this.btnPlay.style.height = this.height + "px";
        this.btnLeft.style.margin = this.margin + "px";
        this.btnRight.style.margin = this.margin + "px";
        this.btnPlay.style.margin = this.margin + "px";
    };
    return TactileButtonsClass;
}());
var EvtClass = (function () {
    function EvtClass(type) {
        this.type = type;
        EvtClass.arrowLeft = false;
        EvtClass.arrowRight = false;
    }
    EvtClass.prototype.listen = function () {
        var _this = this;
        switch (this.type) {
            case "keyboard":
                window.addEventListener("keydown", function (event) {
                    _this.keyDownHandler(event);
                }, false);
                window.addEventListener("keyup", function (event) {
                    _this.keyUpHandler(event);
                }, false);
                break;
            case "tactile":
                BtnTactiles.btnLeft.addEventListener("touchstart", function (event) {
                    _this.touchstart(event, "left");
                }, false);
                BtnTactiles.btnLeft.addEventListener("touchend", function (event) {
                    _this.touchleave(event, "left");
                }, false);
                BtnTactiles.btnRight.addEventListener("touchstart", function (event) {
                    _this.touchstart(event, "right");
                }, false);
                BtnTactiles.btnRight.addEventListener("touchend", function (event) {
                    _this.touchleave(event, "right");
                }, false);
                BtnTactiles.btnPlay.addEventListener("touchstart", function (event) {
                    _this.touchstart(event, "play");
                }, false);
                BtnTactiles.btnPlay.addEventListener("touchend", function (event) {
                    _this.touchleave(event, "play");
                }, false);
                break;
            default:
                break;
        }
    };
    EvtClass.prototype.touchstart = function (event, direction) {
        event.stopPropagation();
        event.preventDefault();
        switch (direction) {
            case "left":
                EvtClass.arrowLeft = true;
                break;
            case "right":
                EvtClass.arrowRight = true;
                break;
            default:
                break;
        }
    };
    EvtClass.prototype.touchleave = function (event, direction) {
        event.stopPropagation();
        event.preventDefault();
        switch (direction) {
            case "left":
                EvtClass.arrowLeft = false;
                break;
            case "right":
                EvtClass.arrowRight = false;
                break;
            case "play":
                if (!BallClass.balleLancee && Player.play) {
                    BallClass.balleLancee = true;
                }
                else if (!Player.hasWon) {
                    Player.play = !Player.play;
                }
                else {
                    document.location.reload();
                }
                break;
            default:
                break;
        }
    };
    EvtClass.prototype.keyDownHandler = function (event) {
        switch (event.key) {
            case "ArrowLeft" || "Left":
                event.preventDefault();
                EvtClass.arrowLeft = true;
                break;
            case "ArrowRight" || "Right":
                event.preventDefault();
                EvtClass.arrowRight = true;
                break;
            case "ArrowUp" || "Up":
                event.preventDefault();
                if (!BallClass.balleLancee) {
                    BallClass.balleLancee = true;
                }
                break;
            default:
                break;
        }
    };
    EvtClass.prototype.keyUpHandler = function (event) {
        switch (event.key) {
            case "ArrowLeft" || "Left":
                event.preventDefault();
                EvtClass.arrowLeft = false;
                break;
            case "ArrowRight" || "Right":
                event.preventDefault();
                EvtClass.arrowRight = false;
                break;
            case "Enter":
                event.preventDefault();
                if (!BallClass.balleLancee && Player.play) {
                    BallClass.balleLancee = true;
                }
                else if (!Player.hasWon) {
                    Player.play = !Player.play;
                }
                else {
                    document.location.reload();
                }
                break;
            default:
                break;
        }
    };
    return EvtClass;
}());
var StuffClass = (function () {
    function StuffClass() {
        this.stuff = document.getElementById("stuff");
        if (!Device.mobile) {
            this.stuff.style.width = "500px";
            this.stuff.style.height = "50px";
            this.stuff.style.background = "no-repeat center url('/Game/img/level1/background_lives.png')";
            this.stuff.style.fontSize = "16px";
        }
        else {
            this.stuff.style.width = "250px";
            this.stuff.style.height = "25px";
            this.stuff.style.background = "no-repeat center url('/Game/img/level1/background_lives_mobile.png')";
            this.stuff.style.fontSize = "14px";
        }
    }
    return StuffClass;
}());
var Sprite = (function () {
    function Sprite(nomImage) {
        var _this = this;
        if (!Device.mobile) {
            this.src = "/Game/img/level1/" + nomImage + ".png";
        }
        else {
            this.src = "/Game/img/level1/" + nomImage + "_mobile.png";
        }
        this.elt = new Image();
        this.elt.addEventListener("load", function () {
            _this.load = true;
        }, false);
        this.elt.src = this.src;
    }
    Sprite.prototype.draw = function () {
        if (this.load) {
            Canvas.ctx.beginPath();
            Canvas.ctx.drawImage(this.elt, this.x, this.y);
            Canvas.ctx.closePath();
        }
    };
    Sprite.AllLoaded = function () {
        return Brick.load && BrickCracked.load && IronBrick.load && IronBrickCracked.load && IronBrickCrackedAgain.load && Paddle.load && Koala.load;
    };
    return Sprite;
}());
var BrickClass = (function (_super) {
    __extends(BrickClass, _super);
    function BrickClass(nomImage) {
        var _this = _super.call(this, nomImage) || this;
        if (!Device.mobile) {
            _this.width = 80;
            _this.height = 40;
            BrickClass.padding = 8;
            BrickClass.offsetY = 6;
            BrickClass.offsetX = 6;
        }
        else {
            _this.width = 40;
            _this.height = 20;
            BrickClass.padding = 4;
            BrickClass.offsetY = 3;
            BrickClass.offsetX = 3;
        }
        return _this;
    }
    BrickClass.initArray = function () {
        BrickClass.array = [];
        var i = 0;
        BrickClass.nbRow = 6;
        BrickClass.nbColumn = 5;
        for (var c = 0; c < BrickClass.nbColumn; c++) {
            BrickClass.array[c] = [];
            for (var r = 0; r < BrickClass.nbRow; r++) {
                BrickClass.array[c][r] = { x: 0, y: 0, lives: 1, number: i };
                i++;
                if (c == 0 && r == 6) {
                    BrickClass.array[c][r].bonus = "bigPaddle";
                }
                if (c == 4 && r == 6) {
                    BrickClass.array[c][r].bonus = "smallPaddle";
                }
                if (c == 2 && r == 6) {
                    BrickClass.array[c][r].bonus = "speedBall";
                }
                if (c == 2 && r == 5) {
                    BrickClass.array[c][r].bonus = "tripleBall";
                }
            }
        }
    };
    BrickClass.drawBricks = function () {
        for (var c = 0; c < BrickClass.nbColumn; c++) {
            for (var r = 0; r < BrickClass.nbRow; r++) {
                var b = BrickClass.array[c][r];
                BrickClass.catSpace = false;
                if (r >= 2 && r <= 3 && c >= 2 && c <= 2) {
                    BrickClass.catSpace = true;
                }
                if (b.lives > 0 && !BrickClass.catSpace) {
                    b.x = (c * (Brick.width + BrickClass.padding)) + BrickClass.offsetX;
                    b.y = (r * (Brick.height + BrickClass.padding)) + BrickClass.offsetY;
                    Canvas.ctx.drawImage(Brick.elt, b.x, b.y);
                }
            }
        }
    };
    BrickClass.reDrawBrick = function (num) {
        for (var c = 0; c < BrickClass.nbColumn; c++) {
            for (var r = 0; r < BrickClass.nbRow; r++) {
                var b = BrickClass.array[c][r];
                if (b.number === num) {
                    Canvas.ctx.clearRect(b.x - 1, b.y - 1, Brick.width + 2, Brick.height + 1);
                }
            }
        }
    };
    BrickClass.isInclude = function (brickNumber) {
        return (BrickClass.listDestroyBricks.indexOf(brickNumber) >= 0);
    };
    return BrickClass;
}(Sprite));
BrickClass.listDestroyBricks = [];
var PaddleClass = (function (_super) {
    __extends(PaddleClass, _super);
    function PaddleClass(nomImage) {
        var _this = _super.call(this, nomImage) || this;
        _this.canvas = document.getElementById("canvasPaddle");
        _this.ctx = _this.canvas.getContext("2d");
        _this.hasBeenDrawn = false;
        if (!Device.mobile) {
            _this.width = 70;
            _this.height = 15;
        }
        else {
            _this.width = 35;
            _this.height = 7.5;
        }
        _this.canvas.width = _this.width;
        _this.canvas.height = _this.height;
        _this.x = (Canvas.width - _this.width) / 2;
        _this.y = Canvas.height - _this.height;
        _this.paddleTouched = false;
        _this.paddleTimer = 0;
        return _this;
    }
    PaddleClass.prototype.move = function () {
        if (!Device.mobile) {
            if (EvtClass.arrowLeft && this.x > 0) {
                this.x -= 7;
                this.lastMove = "left";
            }
            if (EvtClass.arrowRight && this.x + this.width < Canvas.width) {
                this.x += 7;
                this.lastMove = "right";
            }
        }
        else {
            if (EvtClass.arrowLeft && this.x > 0) {
                this.x -= 3.5;
                this.lastMove = "left";
            }
            if (EvtClass.arrowRight && this.x + this.width < Canvas.width) {
                this.x += 3.5;
                this.lastMove = "right";
            }
        }
    };
    PaddleClass.prototype.draw = function () {
        if (this.load && !this.hasBeenDrawn) {
            this.ctx.drawImage(this.elt, 0, 0);
            this.hasBeenDrawn = true;
        }
        this.canvas.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + this.y + "px";
        this.canvas.style.left = Canvas.canvas.getBoundingClientRect().left + this.x + "px";
    };
    return PaddleClass;
}(Sprite));
var BallClass = (function (_super) {
    __extends(BallClass, _super);
    function BallClass(nomImage) {
        var _this = _super.call(this, nomImage) || this;
        _this.canvas = document.createElement("canvas");
        _this.ctx = _this.canvas.getContext("2d");
        _this.hasBeenDrawn = false;
        _this.ball = true;
        if (!Device.mobile) {
            _this.width = 20;
            _this.height = 20;
        }
        else {
            _this.width = 10;
            _this.height = 10;
        }
        document.body.appendChild(_this.canvas);
        _this.canvas.classList.add("canvasBall");
        _this.canvas.width = _this.width;
        _this.canvas.height = _this.height;
        _this.x = Paddle.x + Paddle.width / 2;
        _this.y = Canvas.height - Paddle.height - 15;
        _this.reverse = Math.random() <= 0.5;
        _this.speedBall();
        Collisions.gap = Math.abs(_this.xm);
        BallClass.nbBall++;
        return _this;
    }
    BallClass.prototype.speedBall = function () {
        if (!Device.mobile) {
            if (!this.reverse) {
                this.ym = 5;
                this.xm = 5;
            }
            else {
                this.ym = 5;
                this.xm = -5;
            }
        }
        else {
            if (!this.reverse) {
                this.ym = 2.5;
                this.xm = 2.5;
            }
            else {
                this.ym = 2.5;
                this.xm = -2.5;
            }
        }
    };
    BallClass.prototype.draw = function () {
        if (this.load && !this.hasBeenDrawn) {
            this.ctx.drawImage(this.elt, 0, 0);
            this.hasBeenDrawn = true;
        }
        this.canvas.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + this.y + "px";
        this.canvas.style.left = Canvas.canvas.getBoundingClientRect().left + this.x + "px";
    };
    BallClass.prototype.move = function () {
        this.x += this.xm;
        this.y += this.ym;
    };
    BallClass.restartBall = function (Ball) {
        Ball.x = Paddle.x + Paddle.width / 2 - Ball.width / 2;
        Ball.y = Canvas.height - Paddle.height - Ball.height - 5;
    };
    return BallClass;
}(Sprite));
BallClass.balleLancee = false;
BallClass.nbBall = 0;
var PlayerClass = (function () {
    function PlayerClass() {
        this.heart1 = document.getElementById("heart1");
        this.heart2 = document.getElementById("heart2");
        this.heart3 = document.getElementById("heart3");
        this.drawCmd = document.getElementById("drawCommands");
        this.drawW = document.getElementById("drawWin");
        this.buttonWin = document.getElementById("buttonWin");
        this.lives = 3;
        this.play = false;
        this.hasWon = false;
        this.drawLives();
        this.level = 1;
    }
    PlayerClass.prototype.win = function () {
        var includes7 = BrickClass.isInclude(7);
        var includes8 = BrickClass.isInclude(8);
        var includes9 = BrickClass.isInclude(9);
        var includes10 = BrickClass.isInclude(10);
        var includes13 = BrickClass.isInclude(13);
        var includes16 = BrickClass.isInclude(16);
        var includes19 = BrickClass.isInclude(19);
        var includes20 = BrickClass.isInclude(20);
        var includes21 = BrickClass.isInclude(21);
        var includes22 = BrickClass.isInclude(22);
        if ((includes7 && includes8) ||
            (includes8 && includes9) ||
            (includes9 && includes10) ||
            (includes7 && includes13) ||
            (includes13 && includes19) ||
            (includes10 && includes16) ||
            (includes16 && includes22) ||
            (includes19 && includes20) ||
            (includes20 && includes21)) {
            this.hasWon = true;
            if (AudioClass.soundOK) {
                WinLevelSound.play();
            }
        }
    };
    PlayerClass.prototype.drawLives = function () {
        if (this.lives == 3) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "red";
            this.heart3.style.color = "red";
        }
        else if (Player.lives == 2) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "red";
            this.heart3.style.color = "silver";
        }
        else if (Player.lives == 1) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "silver";
            this.heart3.style.color = "silver";
        }
        else if (Player.lives == 0) {
            this.heart1.style.color = "silver";
            this.heart2.style.color = "silver";
            this.heart3.style.color = "silver";
        }
    };
    PlayerClass.prototype.drawWin = function () {
        this.drawW.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 - this.drawW.clientHeight / 2 + "px";
        this.drawW.style.left = Canvas.canvas.getBoundingClientRect().left + Canvas.width / 2 - this.drawW.clientWidth / 2 + "px";
        this.drawW.style.zIndex = "10";
        this.drawW.style.opacity = "1";
        if (!Device.mobile && !Device.tactile) {
            this.drawW.style.fontSize = "24px";
            this.buttonWin.style.fontSize = "24px";
        }
        else if (Device.mobile) {
            this.drawW.style.fontSize = "12px";
            this.buttonWin.style.fontSize = "12px";
        }
        else if (Device.tactile && !Device.mobile) {
            this.drawW.style.fontSize = "25px";
            this.buttonWin.style.fontSize = "25px";
        }
        this.buttonWin.innerText = "Aller au niveau 2";
        this.buttonWin.addEventListener("click", function () {
            window.location.href = "http://" + window.location.host + "/sauve-le-koala?level=2&scroll=" + window.scrollY;
        });
    };
    PlayerClass.prototype.drawCommands = function () {
        this.drawCmd.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 - this.drawCmd.clientHeight / 2 + "px";
        this.drawCmd.style.left = Canvas.canvas.getBoundingClientRect().left + Canvas.width / 2 - this.drawCmd.clientWidth / 2 + "px";
        this.drawCmd.style.zIndex = "10";
        this.drawCmd.style.opacity = "1";
        if (!Device.mobile && !Device.tactile) {
            this.drawCmd.style.fontSize = "24px";
            this.drawCmd.innerHTML = "Appuie sur entrée pour jouer !<br>Joue avec les flèches de ton clavier !";
        }
        else if (Device.mobile) {
            this.drawCmd.style.fontSize = "12px";
            this.drawCmd.innerHTML = "Appuie sur Play pour jouer !<br>Joue avec les boutons Left et Right !";
        }
        else if (Device.tactile && !Device.mobile) {
            this.drawCmd.style.fontSize = "25px";
            this.drawCmd.innerHTML = "Appuie sur Play pour jouer !<br>Joue avec les boutons Left et Right !";
        }
    };
    return PlayerClass;
}());
var Collisions = (function () {
    function Collisions() {
    }
    Collisions.brickCollision = function (Ball) {
        for (var c = 0; c < BrickClass.nbColumn; c++) {
            for (var r = 0; r < BrickClass.nbRow; r++) {
                var b = BrickClass.array[c][r];
                if (b.lives > 0) {
                    if ((Ball.x + Ball.width >= b.x && Ball.x <= b.x + Brick.width) && (Ball.y + Ball.height >= b.y && Ball.y <= b.y + Brick.height)) {
                        Ball.oldXPosition = Ball.x - Ball.xm;
                        if (((Ball.x + Ball.width === b.x || (Ball.x + Ball.width > b.x && Ball.x + Ball.width <= b.x + Collisions.gap)) ||
                            (Ball.x === b.x + Brick.width || (Ball.x < b.x + Brick.width && Ball.x >= b.x + Brick.width - Collisions.gap)))
                            && (Ball.oldXPosition + Ball.width < b.x || Ball.oldXPosition > b.x + Brick.width)) {
                            Ball.xm = -Ball.xm;
                        }
                        else {
                            Ball.ym = -Ball.ym;
                        }
                        b.lives -= 1;
                        Score.incrementScore();
                        BrickClass.reDrawBrick(b.number);
                        if (AudioClass.soundOK) {
                            BrickSound.play();
                        }
                        if (b.lives === 0) {
                            BrickClass.listDestroyBricks.push(b.number);
                            if (b.bonus) {
                                if (AudioClass.soundOK) {
                                    BonusSound.play();
                                }
                                if (!BonusClass.bonusInstance) {
                                    BonusClass.Bonus = new BonusClass("Bonus", b.bonus, b.x, b.y);
                                    BonusClass.bonusInstance = true;
                                }
                                else if (BonusClass.bonusInstance && !BonusClass.bonus2Instance) {
                                    BonusClass.Bonus2 = new BonusClass("Bonus2", b.bonus, b.x, b.y);
                                    BonusClass.bonus2Instance = true;
                                }
                                else if (BonusClass.bonusInstance && BonusClass.bonus2Instance) {
                                    BonusClass.Bonus3 = new BonusClass("Bonus3", b.bonus, b.x, b.y);
                                    BonusClass.bonus3Instance = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Collisions.generalCollision = function (Ball, nb) {
        if ((Ball.y + Ball.height >= Canvas.height - Paddle.height && (Ball.x + Ball.width >= Paddle.x && Ball.x <= Paddle.x + Paddle.width)) && !Paddle.paddleTouched) {
            Ball.ym = -Ball.ym;
            Paddle.paddleTouched = true;
            if (AudioClass.soundOK) {
                PaddleSound.play();
            }
            if (Ball.x + Ball.width <= Paddle.x + (Paddle.width / 3)) {
                Ball.xm = -Math.abs(Ball.xm);
            }
            else if (Ball.x >= Paddle.x + Paddle.width - (Paddle.width / 3)) {
                Ball.xm = Math.abs(Ball.xm);
            }
        }
        if (Ball.y <= 0) {
            Ball.ym = -Ball.ym;
        }
        if (Ball.y + Ball.height >= Canvas.height && !Paddle.paddleTouched) {
            if (BallClass.nbBall >= 2) {
                if (nb == 1) {
                    Ball.canvas.style.opacity = "0";
                    Ball.canvas.style.display = "none";
                    Ball.ball = false;
                    BallClass.nbBall--;
                }
                else if (nb == 2) {
                    BonusClass.ball2 = false;
                    BonusClass.Ball2.canvas.style.opacity = "0";
                    BonusClass.Ball2.canvas.style.display = "none";
                    BallClass.nbBall--;
                }
                else if (nb == 3) {
                    BonusClass.ball3 = false;
                    BonusClass.Ball3.canvas.style.opacity = "0";
                    BonusClass.Ball3.canvas.style.display = "none";
                    BallClass.nbBall--;
                }
            }
            else {
                if (Player.lives > 0) {
                    Player.lives--;
                    Player.drawLives();
                    BallClass.balleLancee = false;
                    Ball.ym = -Math.abs(Ball.ym);
                }
                else {
                    if (AudioClass.soundOK) {
                        GameOverSound.play();
                    }
                    document.location.reload();
                }
            }
        }
        if (Ball.x <= 0 || Ball.x + Ball.width >= Canvas.width) {
            Ball.xm = -Ball.xm;
        }
        if (Paddle.paddleTimer >= 60) {
            Paddle.paddleTouched = false;
            Paddle.paddleTimer = 0;
        }
        if (Paddle.paddleTouched) {
            Paddle.paddleTimer++;
        }
    };
    return Collisions;
}());
var BonusClass = (function () {
    function BonusClass(name, type, x, y) {
        var _this = this;
        this.width = 30;
        this.height = 30;
        this.elt = new Image();
        this.hasTouchedPaddle = false;
        this.time = 0;
        this.finish = false;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.hasBeenDrawn = false;
        this.load = false;
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        !Device.mobile ? this.ym = 2 : this.ym = 1;
        document.body.appendChild(this.canvas);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add("canvasBonus");
        this.elt.addEventListener("load", function () {
            _this.load = true;
        }, false);
        !Device.mobile ? this.elt.src = "/Game/img/level1/star_yellow.png" : this.elt.src = "/Game/img/level1/star_yellow_mobile.png";
        this.move();
    }
    BonusClass.prototype.move = function () {
        if (!this.hasTouchedPaddle) {
            this.y += this.ym;
            this.draw();
            this.touch();
        }
        else if (this.hasTouchedPaddle && !this.finish) {
            if (this.time < 600) {
                this.time++;
            }
            else {
                this.cancel();
            }
        }
    };
    BonusClass.prototype.draw = function () {
        if (this.load) {
            if (!this.hasBeenDrawn) {
                this.canvas.style.opacity = 1;
                this.ctx.drawImage(this.elt, 0, 0);
                this.hasBeenDrawn = true;
            }
            this.canvas.style.left = Canvas.boundingX + this.x + "px";
            this.canvas.style.top = Canvas.boundingY + this.y + "px";
        }
    };
    BonusClass.prototype.touch = function () {
        if ((this.x + this.width >= Paddle.x && this.x <= Paddle.x + Paddle.width) && (this.y + this.height >= Paddle.y && this.y + this.height <= Paddle.y + Paddle.height) && !this.hasTouchedPaddle) {
            this.hasTouchedPaddle = true;
            switch (this.type) {
                case "bigPaddle":
                    this.bigPaddle();
                    if (AudioClass.soundOK) {
                        GoodPadleBonusSound.play();
                    }
                    break;
                case "smallPaddle":
                    this.smallPaddle();
                    if (AudioClass.soundOK) {
                        BadPadleBonusSound.play();
                    }
                    break;
                case "speedBall":
                    this.speedBall();
                    if (AudioClass.soundOK) {
                        BadPadleBonusSound.play();
                    }
                    break;
                case "tripleBall":
                    this.tripleBall();
                    if (AudioClass.soundOK) {
                        GoodPadleBonusSound.play();
                    }
                    break;
                default:
                    break;
            }
        }
        if (this.y > Paddle.y + Paddle.height + 10) {
            this.finish = true;
            this.canvas.style.opacity = 0;
            if (this.name == "Bonus") {
                BonusClass.bonusInstance = false;
            }
            else if (this.name == "Bonus2") {
                BonusClass.bonus2Instance = false;
            }
            else if (this.name == "Bonus3") {
                BonusClass.bonus3Instance = false;
            }
        }
    };
    BonusClass.prototype.cancel = function () {
        switch (this.type) {
            case "bigPaddle":
                !Device.mobile ? Paddle.width = 70 : Paddle.width = 35;
                Paddle.canvas.width = Paddle.width;
                !Device.mobile ? Paddle.src = "/Game/img/level1/paddle_yellow.png" : Paddle.src = "/Game/img/level1/paddle_yellow_mobile.png";
                Paddle.elt = new Image();
                Paddle.elt.addEventListener("load", function () {
                    Paddle.ctx.drawImage(Paddle.elt, 0, 0);
                });
                Paddle.elt.src = Paddle.src;
                BonusClass.bonusPaddle = false;
                break;
            case "smallPaddle":
                !Device.mobile ? Paddle.width = 70 : Paddle.width = 35;
                !Device.mobile ? Paddle.height = 15 : Paddle.height = 8;
                Paddle.canvas.width = Math.ceil(Paddle.width);
                Paddle.canvas.height = Math.ceil(Paddle.height);
                !Device.mobile ? Paddle.src = "/Game/img/level1/paddle_yellow.png" : Paddle.src = "/Game/img/level1/paddle_yellow_mobile.png";
                Paddle.elt = new Image();
                Paddle.elt.addEventListener("load", function () {
                    Paddle.ctx.drawImage(Paddle.elt, 0, 0);
                });
                Paddle.elt.src = Paddle.src;
                BonusClass.bonusPaddle = false;
                break;
            case "speedBall":
                if (Ball.ball) {
                    if (!Device.mobile) {
                        Ball.xm > 0 ? Ball.xm -= 2 : Ball.xm += 2;
                        Ball.ym > 0 ? Ball.ym -= 2 : Ball.ym += 2;
                    }
                    else {
                        Ball.xm > 0 ? Ball.xm -= 1 : Ball.xm += 1;
                        Ball.ym > 0 ? Ball.ym -= 1 : Ball.ym += 1;
                    }
                }
                if (BonusClass.Ball2) {
                    if (!Device.mobile) {
                        BonusClass.Ball2.xm > 0 ? BonusClass.Ball2.xm -= 2 : BonusClass.Ball2.xm += 2;
                        BonusClass.Ball2.ym > 0 ? BonusClass.Ball2.ym -= 2 : BonusClass.Ball2.ym += 2;
                    }
                    else {
                        BonusClass.Ball2.xm > 0 ? BonusClass.Ball2.xm -= 1 : BonusClass.Ball2.xm += 1;
                        BonusClass.Ball2.ym > 0 ? BonusClass.Ball2.ym -= 1 : BonusClass.Ball2.ym += 1;
                    }
                }
                if (BonusClass.Ball3) {
                    if (!Device.mobile) {
                        BonusClass.Ball3.xm > 0 ? BonusClass.Ball3.xm -= 2 : BonusClass.Ball3.xm += 2;
                        BonusClass.Ball3.ym > 0 ? BonusClass.Ball3.ym -= 2 : BonusClass.Ball3.ym += 2;
                    }
                    else {
                        BonusClass.Ball3.xm > 0 ? BonusClass.Ball3.xm -= 1 : BonusClass.Ball3.xm += 1;
                        BonusClass.Ball3.ym > 0 ? BonusClass.Ball3.ym -= 1 : BonusClass.Ball3.ym += 1;
                    }
                }
                break;
            default:
                break;
        }
        this.finish = true;
        if (this.name == "Bonus") {
            BonusClass.bonusInstance = false;
        }
        else if (this.name == "Bonus2") {
            BonusClass.bonus2Instance = false;
        }
    };
    BonusClass.moveAll = function () {
        if (BonusClass.bonusInstance) {
            BonusClass.Bonus.move();
        }
        if (BonusClass.bonus2Instance) {
            BonusClass.Bonus2.move();
        }
        if (BonusClass.bonus3Instance) {
            BonusClass.Bonus3.move();
        }
    };
    BonusClass.prototype.tripleBall = function () {
        this.canvas.style.opacity = 0;
        BonusClass.Ball2 = new BallClass("ball_silver");
        BonusClass.Ball3 = new BallClass("ball_silver");
        BonusClass.Ball2.x = 20;
        BonusClass.Ball2.y = Canvas.height - 40;
        BonusClass.Ball3.x = Canvas.width - 30;
        BonusClass.Ball3.y = Canvas.height - 40;
        BonusClass.ball2 = true;
        BonusClass.ball3 = true;
        BonusClass.Ball2.ym = -Math.abs(Ball.ym);
        BonusClass.Ball3.ym = -Math.abs(Ball.ym);
        BonusClass.Ball2.canvas.style.opacity = "1";
        BonusClass.Ball3.canvas.style.opacity = "1";
    };
    BonusClass.prototype.bigPaddle = function () {
        if (BonusClass.bonusPaddle) {
            if (this.name == "Bonus" && BonusClass.Bonus2.type == "smallPaddle") {
                BonusClass.Bonus2.cancel();
            }
            else if (this.name == "Bonus" && BonusClass.Bonus3.type == "smallPaddle") {
                BonusClass.Bonus3.cancel();
            }
            else if (this.name == "Bonus2" && BonusClass.Bonus.type == "smallPaddle") {
                BonusClass.Bonus.cancel();
            }
            else if (this.name == "Bonus2" && BonusClass.Bonus3.type == "smallPaddle") {
                BonusClass.Bonus3.cancel();
            }
            else if (this.name == "Bonus3" && BonusClass.Bonus.type == "smallPaddle") {
                BonusClass.Bonus.cancel();
            }
            else if (this.name == "Bonus3" && BonusClass.Bonus2.type == "smallPaddle") {
                BonusClass.Bonus2.cancel();
            }
        }
        this.canvas.style.opacity = 0;
        !Device.mobile ? Paddle.width = 93 : Paddle.width = 46;
        Paddle.canvas.width = Paddle.width;
        if (!Device.mobile) {
            Paddle.src = "/Game/img/level1/big_paddle.png";
        }
        else {
            Paddle.src = "/Game/img/level1/big_paddle_mobile.png";
        }
        Paddle.elt = new Image();
        Paddle.elt.addEventListener("load", function () {
            Paddle.ctx.drawImage(Paddle.elt, 0, 0);
        });
        Paddle.elt.src = Paddle.src;
        BonusClass.bonusPaddle = true;
    };
    BonusClass.prototype.smallPaddle = function () {
        if (BonusClass.bonusPaddle) {
            if (this.name == "Bonus" && BonusClass.Bonus2.type == "bigPaddle") {
                BonusClass.Bonus2.cancel();
            }
            else if (this.name == "Bonus" && BonusClass.Bonus3.type == "bigPaddle") {
                BonusClass.Bonus3.cancel();
            }
            else if (this.name == "Bonus2" && BonusClass.Bonus.type == "bigPaddle") {
                BonusClass.Bonus.cancel();
            }
            else if (this.name == "Bonus2" && BonusClass.Bonus3.type == "bigPaddle") {
                BonusClass.Bonus3.cancel();
            }
            else if (this.name == "Bonus3" && BonusClass.Bonus.type == "bigPaddle") {
                BonusClass.Bonus.cancel();
            }
            else if (this.name == "Bonus3" && BonusClass.Bonus2.type == "bigPaddle") {
                BonusClass.Bonus2.cancel();
            }
        }
        this.canvas.style.opacity = 0;
        !Device.mobile ? Paddle.width = 46 : Paddle.width = 23;
        !Device.mobile ? Paddle.height = 15 : Paddle.height = 8;
        Paddle.canvas.width = Paddle.width;
        Paddle.canvas.height = Paddle.height;
        if (!Device.mobile) {
            Paddle.src = "/Game/img/level1/small_paddle.png";
        }
        else {
            Paddle.src = "/Game/img/level1/small_paddle_mobile.png";
        }
        Paddle.elt = new Image();
        Paddle.elt.addEventListener("load", function () {
            Paddle.ctx.drawImage(Paddle.elt, 0, 0);
        });
        Paddle.elt.src = Paddle.src;
        BonusClass.bonusPaddle = true;
    };
    BonusClass.prototype.speedBall = function () {
        this.canvas.style.opacity = 0;
        if (Ball.ball) {
            this.speed(Ball);
        }
        if (BonusClass.Ball2) {
            this.speed(BonusClass.Ball2);
        }
        if (BonusClass.Ball3) {
            this.speed(BonusClass.Ball3);
        }
    };
    BonusClass.prototype.speed = function (Ball) {
        if (!Device.mobile) {
            Ball.xm > 0 ? Ball.xm += 2 : Ball.xm -= 2;
            Ball.ym > 0 ? Ball.ym += 2 : Ball.ym -= 2;
        }
        else {
            Ball.xm > 0 ? Ball.xm += 1 : Ball.xm -= 1;
            Ball.ym > 0 ? Ball.ym += 1 : Ball.ym -= 1;
        }
    };
    return BonusClass;
}());
BonusClass.bonusInstance = false;
BonusClass.bonus2Instance = false;
BonusClass.bonus3Instance = false;
BonusClass.bonusPaddle = false;
BonusClass.ball2 = false;
BonusClass.ball3 = false;
var Device = new DeviceClass();
Device.find();
var Canvas = new CanvasClass(Device.canvasWidth, Device.canvasHeight);
if (!Device.tactile) {
    var KeyEvt = new EvtClass("keyboard");
    KeyEvt.listen();
}
else {
    var BtnTactiles = new TactileButtonsClass();
    BtnTactiles.display();
    var TactileEvt = new EvtClass("tactile");
    TactileEvt.listen();
}
var Background = new BackgroundClass();
var Stuff = new StuffClass();
AudioClass.displayControl();
var BrickSound = new AudioClass(document.getElementsByTagName("audio")[0]);
var PaddleSound = new AudioClass(document.getElementsByTagName("audio")[2]);
var BonusSound = new AudioClass(document.getElementsByTagName("audio")[3]);
var GoodPadleBonusSound = new AudioClass(document.getElementsByTagName("audio")[4]);
var BadPadleBonusSound = new AudioClass(document.getElementsByTagName("audio")[5]);
var WinLevelSound = new AudioClass(document.getElementsByTagName("audio")[7]);
var GameOverSound = new AudioClass(document.getElementsByTagName("audio")[8]);
var Player = new PlayerClass();
var Brick = new BrickClass("brick_yellow");
var BrickCracked = new BrickClass("brick_yellow_cracked");
var IronBrick = new BrickClass("iron_brick");
var IronBrickCracked = new BrickClass("iron_brick2");
var IronBrickCrackedAgain = new BrickClass("iron_brick3");
BrickClass.initArray();
var Koala = new Sprite("koala");
Koala.x = (2 * (Brick.width + BrickClass.padding)) + BrickClass.offsetX;
Koala.y = (2 * (Brick.height + BrickClass.padding)) + BrickClass.offsetY;
var Paddle = new PaddleClass("paddle_yellow");
var Ball = new BallClass("ball_silver");
var Score = new ScoreClass();
function loop() {
    if (Player.play && !Player.hasWon) {
        if (!Canvas.alldisplayed) {
            Canvas.displayAll();
        }
        if (Ball.ball) {
            Ball.draw();
        }
        if (BonusClass.ball2) {
            BonusClass.Ball2.draw();
        }
        if (BonusClass.ball3) {
            BonusClass.Ball3.draw();
        }
        Paddle.draw();
        if (Ball.ball) {
            Collisions.brickCollision(Ball);
            Collisions.generalCollision(Ball, 1);
        }
        if (BonusClass.ball2) {
            Collisions.brickCollision(BonusClass.Ball2);
            Collisions.generalCollision(BonusClass.Ball2, 2);
        }
        if (BonusClass.ball3) {
            Collisions.brickCollision(BonusClass.Ball3);
            Collisions.generalCollision(BonusClass.Ball3, 3);
        }
        if (BallClass.balleLancee) {
            if (Ball.ball) {
                Ball.move();
            }
            if (BonusClass.ball2) {
                BonusClass.Ball2.move();
            }
            if (BonusClass.ball3) {
                BonusClass.Ball3.move();
            }
        }
        else {
            if (Ball.ball) {
                BallClass.restartBall(Ball);
            }
            else if (BonusClass.ball2) {
                BallClass.restartBall(BonusClass.Ball2);
            }
            else if (BonusClass.ball3) {
                BallClass.restartBall(BonusClass.Ball3);
            }
        }
        Paddle.move();
        BonusClass.moveAll();
        Player.win();
    }
    else {
        Canvas.hideAll();
        if (!Player.hasWon) {
            Player.drawCommands();
        }
        else {
            Player.drawWin();
        }
    }
    requestAnimationFrame(loop);
}
window.addEventListener("load", function () {
    if (Sprite.AllLoaded()) {
        Ball.x = Paddle.x + Paddle.width / 2 - Ball.width / 2;
        Ball.y = Canvas.height - Paddle.height - Ball.height - 5;
        Ball.draw();
        Paddle.draw();
        Koala.draw();
        BrickClass.drawBricks();
    }
    requestAnimationFrame(loop);
}, false);

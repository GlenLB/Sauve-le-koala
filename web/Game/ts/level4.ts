/**
 * Level 4 : Jeux de casse briques
 * Cassez les briques pour libérer le koala !
 */


/**
 * Définit le type d'appareil de l'utilisateur
 */
class DeviceClass {
    canvasWidth: number;
    canvasHeight: number;
    tactile: boolean;
    mobile: boolean;
    tablette: boolean;
    desktop: boolean;

    find() {
        if (window.matchMedia("(max-width: 500px)").matches) {
            this.mobile = true;
            this.tactile = true;
            this.tablette = false;
            this.desktop = false;
            this.canvasWidth = 250;
            this.canvasHeight = 350;
        } else if (window.matchMedia("(min-width: 501px)").matches) {
            this.canvasWidth = 500;
            this.canvasHeight = 700;
            this.mobile = false;
            if ("ontouchstart" in document.documentElement) {
                this.tablette = true;
                this.tactile = true;
                this.desktop = false;
            } else {
                this.desktop = true;
                this.tablette = false;
                this.tactile = false;
            }
        }
    }
}


/**
 * Un [[Canvas]] a un canvas avec une taille définie
 */
class CanvasClass {
    canvas: any = document.getElementById("canvas");
    ctx: any = this.canvas.getContext("2d");
    width: number;
    height: number;
    alldisplayed: boolean = false;
    boundingX: number;
    boundingY: number;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        window.addEventListener("load", () => {
            this.boundingX = this.canvas.getBoundingClientRect().left + window.scrollX;
            this.boundingY = this.canvas.getBoundingClientRect().top + window.scrollY;
        }, false);
    }

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    displayAll() {
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
    }

    hideAll() {
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
    }
}


/**
 * L'audio du jeu
 */
class AudioClass {
    elt: HTMLAudioElement;
    static control: HTMLElement = document.getElementById("soundControl");
    static soundOK: boolean = false;
    static firstCall: boolean = true;
    static firstLoad: boolean = true;

    constructor(elt: HTMLAudioElement) {
        this.elt = elt;
    }

    play() {
        this.elt.currentTime = 0;
        if (this.elt.paused) {
            this.elt.play();
        }
    }

    pause() {
        this.elt.pause();
    }

    reset() {
        this.elt.currentTime = 0;
    }

    static displayControl() {
        if (AudioClass.firstCall) {
            window.addEventListener("load", () => {
                AudioClass.control.setAttribute("class", "fas fa-volume-down");
                AudioClass.control.style.color = "red";
                AudioClass.control.style.top = Canvas.boundingY + Canvas.height / 2 + 90 + "px";
                AudioClass.control.style.left = Canvas.boundingX + Canvas.width / 2 - AudioClass.control.clientWidth / 2 + "px";
                AudioClass.control.style.opacity = "1";

                AudioClass.control.addEventListener("click", () => {
                    if (AudioClass.soundOK) {
                        AudioClass.control.setAttribute("class", "fas fa-volume-down");
                        AudioClass.control.style.color = "red";
                        AudioClass.soundOK = false;
                        //AudioClass.pauseBackgroundMusic();
                    } else {
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
        } else {
            AudioClass.control.style.opacity = "1";
        }
    }

    static hideControl() {
        AudioClass.control.style.opacity = "0";
    }

    static loadAll() {
        // Sounds
        BrickSound.play(); BrickSound.pause();
        PaddleSound.play(); PaddleSound.pause();
        BonusSound.play(); BonusSound.pause();
        GoodPadleBonusSound.play(); GoodPadleBonusSound.pause();
        BadPadleBonusSound.play(); BadPadleBonusSound.pause();

        WinLevelSound.elt.volume = 0.5;
        WinLevelSound.play(); WinLevelSound.pause();
        GameOverSound.elt.volume = 0.5;
        GameOverSound.play(); GameOverSound.pause();
    }
}


/**
 * L'image de background du jeu
 */
class BackgroundClass {
    canvasBackground: HTMLElement = document.getElementById("canvasBackground");
    constructor() {
        this.canvasBackground.style.width = Canvas.width + "px";
        this.canvasBackground.style.height = Canvas.height + "px";
        if (!Device.mobile) {
            this.canvasBackground.style.background = "no-repeat center url('/Game/img/level1/background4.png')";
        } else {
            this.canvasBackground.style.background = "no-repeat center url('/Game/img/level1/background4_mobile.png')";
        }
    }
}

/**
 * Le score affiché à l'utilisateur
 */
class ScoreClass {
    displayScore: HTMLElement = document.getElementById("score");
    score: number = 0;

    /**
     * Increment the user's score
     */
    incrementScore() {
        this.score++;
        if (this.score < 10) {
            this.displayScore.innerHTML = "SCORE : 0" + this.score;
        } else {
            this.displayScore.innerHTML = "SCORE : " + this.score;
        }
    }
}


/**
 * Boutons tactiles pour jouer sur les appareils tactiles
 */
class TactileButtonsClass {
    width: number;
    height: number;
    margin: number;
    marginLeft: number;
    marginRight: number;
    btnLeft: HTMLElement = document.getElementById("btnLeft");
    btnRight: HTMLElement = document.getElementById("btnRight");
    btnPlay: HTMLElement = document.getElementById("btnPlay");
    containerBtn: HTMLElement = document.getElementById("containerBtn");
    canvasBCR: any = Canvas.canvas.getBoundingClientRect();

    constructor() {
        if (Device.mobile) {
            this.width = 80;
            this.height = 60;
            this.margin = 10;
        } else {
            this.width = 160;
            this.height = 100;
            this.margin = 20;
            this.marginLeft = 15;
            this.marginRight = this.marginLeft;
        }
    }

    /**
     * Affiche les boutons pour jouer sur les appareils tactiles
     */
    display() {
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
    }
}


/**
 * Un [[Evt]] est un évènement clavier ou tactile
 */
class EvtClass {
    type: string;
    left: boolean;
    right: boolean;
    up: boolean;
    static arrowLeft: boolean;
    static arrowRight: boolean;

    constructor(type: string) {
        this.type = type;
        EvtClass.arrowLeft = false;
        EvtClass.arrowRight = false;
    }

    listen() {
        switch (this.type) {
            case "keyboard":
                window.addEventListener("keydown", (event: KeyboardEvent) => {
                    this.keyDownHandler(event);
                }, false);
                window.addEventListener("keyup", (event: KeyboardEvent) => {
                    this.keyUpHandler(event);
                }, false);
                break;

            case "tactile":
                BtnTactiles.btnLeft.addEventListener("touchstart", (event: TouchEvent) => {
                    this.touchstart(event, "left");
                }, false);
                BtnTactiles.btnLeft.addEventListener("touchend", (event: TouchEvent) => {
                    this.touchleave(event, "left");
                }, false);
                BtnTactiles.btnRight.addEventListener("touchstart", (event: TouchEvent) => {
                    this.touchstart(event, "right");
                }, false);
                BtnTactiles.btnRight.addEventListener("touchend", (event: TouchEvent) => {
                    this.touchleave(event, "right");
                }, false);
                BtnTactiles.btnPlay.addEventListener("touchstart", (event: TouchEvent) => {
                    this.touchstart(event, "play");
                }, false);
                BtnTactiles.btnPlay.addEventListener("touchend", (event: TouchEvent) => {
                    this.touchleave(event, "play");
                }, false);

                break;

            default:
                break;
        }
    }

    /**
     * Fonction appelée lorsqu'un évènement tactile se produit
     * @param event l'évènement tactile
     * @param direction indiquée par le bouton cliqué
     */
    touchstart(event: TouchEvent, direction: string) {
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
    }

    /**
     * Fonction appelée lorsqu'un évènement tactile se termine
     * @param event l'évènement tactile
     * @param direction indiquée par le bouton cliqué
     */
    touchleave(event: TouchEvent, direction: string) {
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
                } else if (!Player.hasWon) {
                    Player.play = !Player.play;
                } else {
                    document.location.reload(); // Play again
                }
                break;
            default:
                break;
        }
    }

    /**
     * When a key is pressed
     * @param event contains the name of the key
     */
    keyDownHandler(event: KeyboardEvent) {
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
    }

    /**
     * When a key is not pressed anymore
     * @param event contains the name of the key
     */
    keyUpHandler(event: KeyboardEvent) {
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
                } else if (!Player.hasWon) {
                    Player.play = !Player.play;
                } else {
                    document.location.reload(); // Play again
                }
                break;
            default:
                break;
        }
    }
}


/**
 * Barre sous le canvas affichant les vies et le score
 */
class StuffClass {
    stuff: HTMLElement = document.getElementById("stuff");

    constructor() {
        if (!Device.mobile) {
            this.stuff.style.width = "500px";
            this.stuff.style.height = "50px";
            this.stuff.style.background = "no-repeat center url('/Game/img/level1/background_lives.png')";
            this.stuff.style.fontSize = "16px";
        } else {
            this.stuff.style.width = "250px";
            this.stuff.style.height = "25px";
            this.stuff.style.background = "no-repeat center url('/Game/img/level1/background_lives_mobile.png')";
            this.stuff.style.fontSize = "14px";
        }
    }
}


/**
 * Un [[Sprite]] a un chemin menant à l'image,
 * une taille définie,
 * une méthode pour le charger,
 * une position de coordonnées x et y dans le jeu
 * il peut être dessiné à l'écran
 */
class Sprite {
    elt: HTMLImageElement;
    src: string;
    x: number;
    y: number;
    load: boolean;

    constructor(nomImage: string) {
        if (!Device.mobile) {
            this.src = "/Game/img/level1/" + nomImage + ".png";
        } else {
            this.src = "/Game/img/level1/" + nomImage + "_mobile.png";
        }
        this.elt = new Image();
        this.elt.addEventListener("load", () => {
            this.load = true;
        }, false);
        this.elt.src = this.src;
    }

    draw() {
        if (this.load) {
            Canvas.ctx.beginPath();
            Canvas.ctx.drawImage(this.elt, this.x, this.y);
            Canvas.ctx.closePath();
        }
    }

    static AllLoaded(): boolean {
        return Brick.load && BrickCracked.load && GreenBrick.load && GreenBrickCracked.load && Paddle.load && Koala.load
    }
}

/**
 * Briques du jeu
 * Changent à chaque level
 */
class BrickClass extends Sprite {
    width: number;
    height: number;
    static nbRow: number;
    static nbColumn: number;
    static padding: number;
    static offsetY: number;
    static offsetX: number;
    static array: any[][];
    static listDestroyBricks: number[] = [];
    static catSpace: boolean;

    constructor(nomImage: string) {
        super(nomImage)
        if (!Device.mobile) {
            this.width = 80;
            this.height = 40;
            BrickClass.padding = 8;
            BrickClass.offsetY = 6;
            BrickClass.offsetX = 6;
        } else {
            this.width = 40;
            this.height = 20;
            BrickClass.padding = 4;
            BrickClass.offsetY = 3;
            BrickClass.offsetX = 3;
        }
    }

    static initArray() {
        BrickClass.array = [];
        let i: number = 0;

        BrickClass.nbRow = 10;
        BrickClass.nbColumn = 5;

        for (let c = 0; c < BrickClass.nbColumn; c++) {
            BrickClass.array[c] = [];
            for (let r = 0; r < BrickClass.nbRow; r++) {
                if ((c == 2 && r <= 7) || (r == 7) || (c == 4 && r > 7)) { //=> OtherBrick
                    BrickClass.array[c][r] = {x: 0, y: 0, lives: 2, number: i};
                    i++;
                } else if((c > 2 && r < 7) || (r > 7 && c < 4)) {
                    BrickClass.array[c][r] = {x: 0, y: 0, lives: 0, number: i};
                    i++;
                } else { // => YellowBrick
                    BrickClass.array[c][r] = {x: 0, y: 0, lives: 1, number: i};
                    i++;
                }

                // Bonus
                if (c == 2 && r == 7) {
                    BrickClass.array[c][r].bonus = "bigPaddle";
                }
                if (c == 0 && r == 6) {
                    BrickClass.array[c][r].bonus = "smallPaddle";
                }
                if (c == 1 && r == 3) {
                    BrickClass.array[c][r].bonus = "speedBall";
                }
                if (c == 1 && r == 4) {
                    BrickClass.array[c][r].bonus = "tripleBall";
                }
            }
        }
    }

    static drawBricks() {
        for (let c = 0; c < BrickClass.nbColumn; c++) {
            for (let r = 0; r < BrickClass.nbRow; r++) {
                let b = BrickClass.array[c][r];
                BrickClass.catSpace = false;
                if ((r == 0 && c == 0) || (r == 1 && c == 0)) { // Space for the cat
                    BrickClass.catSpace = true;
                }
                b.x = (c * (Brick.width + BrickClass.padding)) + BrickClass.offsetX;
                b.y = (r * (Brick.height + BrickClass.padding)) + BrickClass.offsetY;
                if (b.lives > 0 && !BrickClass.catSpace) {
                    if ((c == 2 && r <= 7) || (r == 7) || (c == 4 && r > 7)) { //=> OtherBrick
                        if (b.lives === 2) {
                            Canvas.ctx.drawImage(GreenBrick.elt, b.x, b.y);
                        } else if (b.lives === 1) {
                            Canvas.ctx.drawImage(GreenBrickCracked.elt, b.x, b.y);
                        }
                    } else { // brick
                        Canvas.ctx.drawImage(Brick.elt, b.x, b.y);
                    }
                }
            }
        }
    }

    static reDrawBrick(num: number) {
        let i: number = 0;
        for (let c = 0; c < BrickClass.nbColumn; c++) {
            for (let r = 0; r < BrickClass.nbRow; r++) {
                let b = BrickClass.array[c][r];
                if (b.number === num) {
                    Canvas.ctx.clearRect(b.x - 1, b.y - 1, Brick.width + 2, Brick.height + 1); // Les - 1, + 1 et + 2 rajoutés pour bug gap mobile
                    if (b.lives > 0 && !BrickClass.catSpace) {
                        if ((c == 2 && r <= 7) || (r == 7) || (c == 4 && r > 7)) { //=> OtherBrick
                            if (b.lives === 1) {
                                Canvas.ctx.drawImage(GreenBrickCracked.elt, b.x, b.y);
                            }
                        }
                    }
                    i++;
                }
            }
        }
    }

    /**
     * Check if a brick is in the list of brocken bricks
     * @param brickNumber the number of the brick to check
     * @return true ssi brickNumber is included in the list
     */
    static isInclude(brickNumber: number): boolean {
        return (BrickClass.listDestroyBricks.indexOf(brickNumber) >= 0);
    }
}

/**
 * Paddle
 */
class PaddleClass extends Sprite {
    width: number;
    height: number;
    paddleTouched: boolean;
    paddleTimer: number;
    lastMove: string;
    canvas: any = document.getElementById("canvasPaddle");
    ctx: any = this.canvas.getContext("2d");
    hasBeenDrawn: boolean = false;

    constructor(nomImage: string) {
        super(nomImage);
        if (!Device.mobile) {
            this.width = 70;
            this.height = 15;
        } else {
            this.width = 35;
            this.height = 7.5;
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.x = (Canvas.width - this.width) / 2;
        this.y = Canvas.height - this.height;
        this.paddleTouched = false;
        this.paddleTimer = 0;
    }

    /**
     * Move the paddle
     */
    move() {
        if (!Device.mobile) {
            if (EvtClass.arrowLeft && this.x > 0) {
                this.x -= 7;
                this.lastMove = "left"
            }
            if (EvtClass.arrowRight && this.x + this.width < Canvas.width) {
                this.x += 7;
                this.lastMove = "right"
            }
        } else {
            if (EvtClass.arrowLeft && this.x > 0) {
                this.x -= 3.5;
                this.lastMove = "left"
            }
            if (EvtClass.arrowRight && this.x + this.width < Canvas.width) {
                this.x += 3.5;
                this.lastMove = "right"
            }
        }
    }

    draw() {
        if (this.load && !this.hasBeenDrawn) {
            this.ctx.drawImage(this.elt, 0, 0);
            this.hasBeenDrawn = true;
        }
        this.canvas.style.left = Canvas.boundingX + this.x + "px";
        this.canvas.style.top = Canvas.boundingY + this.y + "px";
    }
}


/**
 * Balle
 */
class BallClass extends Sprite {
    width: number;
    height: number;
    reverse: boolean;
    static balleLancee: boolean = false;
    xm: number;
    ym: number;
    oldXPosition: number;
    canvas: any = document.createElement("canvas");
    ctx: any = this.canvas.getContext("2d");
    hasBeenDrawn: boolean = false;
    static nbBall: number = 0;
    ball: boolean = true;

    constructor(nomImage: string) {
        super(nomImage);
        if (!Device.mobile) {
            this.width = 20;
            this.height = 20;
        } else {
            this.width = 10;
            this.height = 10;
        }
        document.body.appendChild(this.canvas);
        this.canvas.classList.add("canvasBall");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.x = Paddle.x + Paddle.width / 2;
        this.y = Canvas.height - Paddle.height - 15;
        this.reverse = Math.random() <= 0.5;
        this.speedBall();
        Collisions.gap = Math.abs(this.xm);
        BallClass.nbBall++;
    }

    speedBall() {
        if (!Device.mobile) {
            if (!this.reverse) {
                this.ym = 5;
                this.xm = 5;
            } else {
                this.ym = 5;
                this.xm = -5;
            }
        } else {
            if (!this.reverse) {
                this.ym = 2.5;
                this.xm = 2.5;
            } else {
                this.ym = 2.5;
                this.xm = -2.5;
            }
        }
    }

    draw() {
        if (this.load && !this.hasBeenDrawn) {
            this.ctx.drawImage(this.elt, 0, 0);
            this.hasBeenDrawn = true;
        }
        this.canvas.style.left = Canvas.boundingX + this.x + "px";
        this.canvas.style.top = Canvas.boundingY + this.y + "px";
    }

    move() {
        this.x += this.xm;
        this.y += this.ym;
    }

    static restartBall(Ball: BallClass) {
        Ball.x = Paddle.x + Paddle.width / 2 - Ball.width / 2;
        Ball.y = Canvas.height - Paddle.height - Ball.height - 5;
    }
}


/**
 * Représente le joueur
 */
class PlayerClass {
    lives: number;
    play: boolean;
    hasWon: boolean;
    heart1: HTMLElement = document.getElementById("heart1");
    heart2: HTMLElement = document.getElementById("heart2");
    heart3: HTMLElement = document.getElementById("heart3");
    drawCmd: HTMLElement = document.getElementById("drawCommands");
    drawW: HTMLElement = document.getElementById("drawWin");
    level: number;
    buttonWin: HTMLElement = document.getElementById("buttonWin");

    constructor() {
        this.lives = 3;
        this.play = false;
        this.hasWon = false;
        this.drawLives();
        this.level = 4;
    }

    /**
     * Check if the gamer has won
     */
    win() {
        let includes2: boolean = BrickClass.isInclude(2);
        let includes10: boolean = BrickClass.isInclude(10);
        let includes11: boolean = BrickClass.isInclude(11);
        let includes12: boolean = BrickClass.isInclude(12);

        if (
            (includes2 && includes12) ||
            (includes10 && includes11) ||
            (includes11 && includes12)
        ) {
            this.hasWon = true;
            if (AudioClass.soundOK) {
                WinLevelSound.play();
            }
        }
    }

    drawLives() {
        if (this.lives == 3) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "red";
            this.heart3.style.color = "red";
        } else if (Player.lives == 2) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "red";
            this.heart3.style.color = "silver";
        } else if (Player.lives == 1) {
            this.heart1.style.color = "red";
            this.heart2.style.color = "silver";
            this.heart3.style.color = "silver";
        } else if (Player.lives == 0) {
            this.heart1.style.color = "silver";
            this.heart2.style.color = "silver";
            this.heart3.style.color = "silver";
        }
    }

    /**
     * Display a message if the gamer has won
     */
    drawWin() {
        this.drawW.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 - this.drawW.clientHeight / 2 + "px";
        this.drawW.style.left = Canvas.canvas.getBoundingClientRect().left + Canvas.width / 2 - this.drawW.clientWidth / 2 + "px";
        this.drawW.style.zIndex = "10";
        this.drawW.style.opacity = "1";
        if (!Device.mobile && !Device.tactile) {
            this.drawW.style.fontSize = "24px";
            this.buttonWin.style.fontSize = "24px";
        } else if (Device.mobile) {
            this.drawW.style.fontSize = "12px";
            this.buttonWin.style.fontSize = "12px";
        } else if (Device.tactile && !Device.mobile) {
            this.drawW.style.fontSize = "25px";
            this.buttonWin.style.fontSize = "25px";
        }
        this.buttonWin.innerText = "Aller au niveau 5";
        this.buttonWin.addEventListener("click", () => {
            window.location.href = "http://" + window.location.host + "/sauve-le-koala?level=5&scroll=" + window.scrollY;
        });
    }

    /**
     * Draw commands on pause
     */
    drawCommands() {
        this.drawCmd.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 - this.drawCmd.clientHeight / 2 + "px";
        this.drawCmd.style.left = Canvas.canvas.getBoundingClientRect().left + Canvas.width / 2 - this.drawCmd.clientWidth / 2 + "px";
        this.drawCmd.style.zIndex = "10";
        this.drawCmd.style.opacity = "1";
        if (!Device.mobile && !Device.tactile) {
            this.drawCmd.style.fontSize = "24px";
            this.drawCmd.innerHTML = "Appuie sur entrée pour jouer !<br>Joue avec les flèches de ton clavier !";
        } else if (Device.mobile) {
            this.drawCmd.style.fontSize = "12px";
            this.drawCmd.innerHTML = "Appuie sur Play pour jouer !<br>Joue avec les boutons Left et Right !";
        } else if (Device.tactile && !Device.mobile) {
            this.drawCmd.style.fontSize = "25px";
            this.drawCmd.innerHTML = "Appuie sur Play pour jouer !<br>Joue avec les boutons Left et Right !";
        }
    }
}


/**
 * Pour les collisions du jeu
 */
class Collisions {
    static gap: number; // Gap possible

    static brickCollision(Ball: BallClass) {
        for (let c = 0; c < BrickClass.nbColumn; c++) {
            for (let r = 0; r < BrickClass.nbRow; r++) {
                let b = BrickClass.array[c][r];
                if (b.lives > 0) {
                    if ((Ball.x + Ball.width >= b.x && Ball.x <= b.x + Brick.width) && (Ball.y + Ball.height >= b.y && Ball.y <= b.y + Brick.height)) {
                        // Brique touchée
                        // On vérifie que c'est un côté qui a été touché
                        Ball.oldXPosition = Ball.x - Ball.xm; // Il faut que la position x + width d'avant soit inférieure à brickX ou x supérieure à brickX + BrickWidth
                        if (
                            ((Ball.x + Ball.width === b.x || (Ball.x + Ball.width > b.x && Ball.x + Ball.width <= b.x + Collisions.gap)) ||
                                (Ball.x === b.x + Brick.width || (Ball.x < b.x + Brick.width && Ball.x >= b.x + Brick.width - Collisions.gap)))
                            && (Ball.oldXPosition + Ball.width < b.x || Ball.oldXPosition > b.x + Brick.width)
                        ) {
                            // Côté touché
                            Ball.xm = -Ball.xm;
                        } else {
                            // Haut ou bas touché
                            Ball.ym = -Ball.ym;
                        }

                        b.lives -= 1;
                        Score.incrementScore();
                        BrickClass.reDrawBrick(b.number);

                        if (AudioClass.soundOK) {
                            BrickSound.play();
                        }

                        if (b.lives === 0) {
                            // On ajoute la brique à la liste des briques détruites
                            BrickClass.listDestroyBricks.push(b.number);
                            // On regarde si la brique contient un bonus
                            if (b.bonus) {
                                if (AudioClass.soundOK) {
                                    BonusSound.play();
                                }
                                if (!BonusClass.bonusInstance) {
                                    BonusClass.Bonus = new BonusClass("Bonus", b.bonus, b.x, b.y);
                                    BonusClass.bonusInstance = true;
                                } else if (BonusClass.bonusInstance && !BonusClass.bonus2Instance) {
                                    BonusClass.Bonus2 = new BonusClass("Bonus2", b.bonus, b.x, b.y);
                                    BonusClass.bonus2Instance = true;
                                } else if (BonusClass.bonusInstance && BonusClass.bonus2Instance) {
                                    BonusClass.Bonus3 = new BonusClass("Bonus3", b.bonus, b.x, b.y);
                                    BonusClass.bonus3Instance = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Collision of walls ant paddle with the ball
     */
    static generalCollision(Ball: BallClass, nb: number) {
        // La balle touche le paddle
        if ((Ball.y + Ball.height >= Canvas.height - Paddle.height && (Ball.x + Ball.width >= Paddle.x && Ball.x <= Paddle.x + Paddle.width)) && !Paddle.paddleTouched) {
            Ball.ym = -Ball.ym;
            Paddle.paddleTouched = true;
            if (AudioClass.soundOK) {
                PaddleSound.play();
            }
            // Vérifier si la balle touche un côté du paddle
            if (Ball.x + Ball.width <= Paddle.x + (Paddle.width / 3)) {
                Ball.xm = -Math.abs(Ball.xm);
            } else if (Ball.x >= Paddle.x + Paddle.width - (Paddle.width / 3)) {
                Ball.xm = Math.abs(Ball.xm);
            }
        }
        // La balle touche le haut
        if (Ball.y <= 0) {
            Ball.ym = -Ball.ym;
        }
        //La balle touche le bas
        if (Ball.y + Ball.height >= Canvas.height && !Paddle.paddleTouched) {
            if (BallClass.nbBall >= 2) {
                if (nb == 1) {
                    Ball.canvas.style.opacity = "0";
                    Ball.canvas.style.display = "none";
                    Ball.ball = false;
                    BallClass.nbBall--;
                } else if (nb == 2) {
                    BonusClass.ball2 = false;
                    BonusClass.Ball2.canvas.style.opacity = "0";
                    BonusClass.Ball2.canvas.style.display = "none";
                    BallClass.nbBall--;
                } else if (nb == 3) {
                    BonusClass.ball3 = false;
                    BonusClass.Ball3.canvas.style.opacity = "0";
                    BonusClass.Ball3.canvas.style.display = "none";
                    BallClass.nbBall--;
                }
            } else {
                if (Player.lives > 0) {
                    Player.lives--;
                    Player.drawLives();
                    BallClass.balleLancee = false;
                    Ball.ym = -Math.abs(Ball.ym);
                } else {
                    // Partie perdue
                    if (AudioClass.soundOK) {
                        GameOverSound.play();
                    }
                    // Afficher Game Over : rejouer ?
                    document.location.reload();
                }
            }
        }
        // La balle touche la gauche ou la droite
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
    }
}


/**
 * Les bonus du jeu
 */
class BonusClass {
    type: string;
    name: string;
    x: number;
    y: number;
    ym: number;
    width: number = 30;
    height: number = 30;
    elt: HTMLImageElement = new Image();
    static Bonus: BonusClass;
    static Bonus2: BonusClass;
    static Bonus3: BonusClass;
    static bonusInstance: boolean = false;
    static bonus2Instance: boolean = false;
    static bonus3Instance: boolean = false;
    hasTouchedPaddle: boolean = false;
    time: number = 0;
    finish: boolean = false;
    static bonusPaddle: boolean = false;
    canvas: any = document.createElement("canvas");
    ctx: any = this.canvas.getContext("2d");
    hasBeenDrawn: boolean = false;
    load: boolean = false;
    static Ball2: BallClass;
    static Ball3: BallClass;
    static ball2: boolean = false;
    static ball3: boolean = false;

    constructor(name: string, type: string, x: number, y: number) {
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        !Device.mobile ? this.ym = 2 : this.ym = 1;
        document.body.appendChild(this.canvas);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add("canvasBonus");
        this.elt.addEventListener("load", () => {
            this.load = true;
        }, false);
        !Device.mobile ? this.elt.src = "/Game/img/level1/star_yellow.png" : this.elt.src = "/Game/img/level1/star_yellow_mobile.png";
        this.move();
    }

    move() {
        if (!this.hasTouchedPaddle) {
            this.y += this.ym;
            this.draw();
            this.touch();
        } else if (this.hasTouchedPaddle && !this.finish) {
            if (this.time < 600) {
                this.time++;
            } else {
                this.cancel();
            }
        }
    }

    draw() {
        if (this.load) {
            if (!this.hasBeenDrawn) {
                this.canvas.style.opacity = 1;
                this.ctx.drawImage(this.elt, 0, 0);
                this.hasBeenDrawn = true;
            }
            this.canvas.style.left = Canvas.boundingX + this.x + "px";
            this.canvas.style.top = Canvas.boundingY + this.y + "px";
        }
    }

    touch() {
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
        if (this.y > Paddle.y + Paddle.height + 10) { // Le bonus a dépassé le Paddle
            this.finish = true;
            this.canvas.style.opacity = 0; // On efface le bonus
            if (this.name == "Bonus") {
                BonusClass.bonusInstance = false;
            } else if (this.name == "Bonus2") {
                BonusClass.bonus2Instance = false;
            } else if (this.name == "Bonus3") {
                BonusClass.bonus3Instance = false;
            }
        }
    }

    cancel() {
        switch (this.type) {
            case "bigPaddle":
                !Device.mobile ? Paddle.width = 70 : Paddle.width = 35;
                Paddle.canvas.width = Paddle.width;
                !Device.mobile ? Paddle.src = "/Game/img/level1/paddle_yellow.png" : Paddle.src = "/Game/img/level1/paddle_yellow_mobile.png";
                Paddle.elt = new Image();
                Paddle.elt.addEventListener("load", () => {
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
                Paddle.elt.addEventListener("load", () => {
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
                    } else {
                        Ball.xm > 0 ? Ball.xm -= 1 : Ball.xm += 1;
                        Ball.ym > 0 ? Ball.ym -= 1 : Ball.ym += 1;
                    }
                }
                if (BonusClass.Ball2) {
                    if (!Device.mobile) {
                        BonusClass.Ball2.xm > 0 ? BonusClass.Ball2.xm -= 2 : BonusClass.Ball2.xm += 2;
                        BonusClass.Ball2.ym > 0 ? BonusClass.Ball2.ym -= 2 : BonusClass.Ball2.ym += 2;
                    } else {
                        BonusClass.Ball2.xm > 0 ? BonusClass.Ball2.xm -= 1 : BonusClass.Ball2.xm += 1;
                        BonusClass.Ball2.ym > 0 ? BonusClass.Ball2.ym -= 1 : BonusClass.Ball2.ym += 1;
                    }
                }
                if (BonusClass.Ball3) {
                    if (!Device.mobile) {
                        BonusClass.Ball3.xm > 0 ? BonusClass.Ball3.xm -= 2 : BonusClass.Ball3.xm += 2;
                        BonusClass.Ball3.ym > 0 ? BonusClass.Ball3.ym -= 2 : BonusClass.Ball3.ym += 2;
                    } else {
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
        } else if (this.name == "Bonus2") {
            BonusClass.bonus2Instance = false;
        }
    }

    static moveAll() {
        if (BonusClass.bonusInstance) {
            BonusClass.Bonus.move();
        }
        if (BonusClass.bonus2Instance) {
            BonusClass.Bonus2.move();
        }
        if (BonusClass.bonus3Instance) {
            BonusClass.Bonus3.move();
        }
    }

    /**
     * Trois balles sur le terrain, il faut en garder une au minimum
     */
    tripleBall() {
        this.canvas.style.opacity = 0; // Efface le bonus
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

    }

    /**
     * Le paddle s'aggrandit
     */
    bigPaddle() {
        if (BonusClass.bonusPaddle) {
            if (this.name == "Bonus" && BonusClass.Bonus2.type == "smallPaddle") {
                BonusClass.Bonus2.cancel();
            } else if (this.name == "Bonus" && BonusClass.Bonus3.type == "smallPaddle") {
                BonusClass.Bonus3.cancel();
            } else if (this.name == "Bonus2" && BonusClass.Bonus.type == "smallPaddle") {
                BonusClass.Bonus.cancel();
            } else if (this.name == "Bonus2" && BonusClass.Bonus3.type == "smallPaddle") {
                BonusClass.Bonus3.cancel();
            } else if (this.name == "Bonus3" && BonusClass.Bonus.type == "smallPaddle") {
                BonusClass.Bonus.cancel();
            } else if (this.name == "Bonus3" && BonusClass.Bonus2.type == "smallPaddle") {
                BonusClass.Bonus2.cancel();
            }
        }
        this.canvas.style.opacity = 0; // Efface le bonus
        !Device.mobile ? Paddle.width = 93 : Paddle.width = 46;
        Paddle.canvas.width = Paddle.width;
        if (!Device.mobile) {
            Paddle.src = "/Game/img/level1/big_paddle.png";
        } else {
            Paddle.src = "/Game/img/level1/big_paddle_mobile.png";
        }
        Paddle.elt = new Image();
        Paddle.elt.addEventListener("load", () => {
            Paddle.ctx.drawImage(Paddle.elt, 0, 0);
        });
        Paddle.elt.src = Paddle.src;
        BonusClass.bonusPaddle = true;
    }

    /**
     * Le paddle rétrécit
     */
    smallPaddle() {
        if (BonusClass.bonusPaddle) {
            if (this.name == "Bonus" && BonusClass.Bonus2.type == "bigPaddle") {
                BonusClass.Bonus2.cancel();
            } else if (this.name == "Bonus" && BonusClass.Bonus3.type == "bigPaddle") {
                BonusClass.Bonus3.cancel();
            } else if (this.name == "Bonus2" && BonusClass.Bonus.type == "bigPaddle") {
                BonusClass.Bonus.cancel();
            } else if (this.name == "Bonus2" && BonusClass.Bonus3.type == "bigPaddle") {
                BonusClass.Bonus3.cancel();
            } else if (this.name == "Bonus3" && BonusClass.Bonus.type == "bigPaddle") {
                BonusClass.Bonus.cancel();
            } else if (this.name == "Bonus3" && BonusClass.Bonus2.type == "bigPaddle") {
                BonusClass.Bonus2.cancel();
            }
        }
        this.canvas.style.opacity = 0; // Efface le bonus
        !Device.mobile ? Paddle.width = 46 : Paddle.width = 23;
        !Device.mobile ? Paddle.height = 15 : Paddle.height = 8;
        Paddle.canvas.width = Paddle.width;
        Paddle.canvas.height = Paddle.height;
        if (!Device.mobile) {
            Paddle.src = "/Game/img/level1/small_paddle.png";
        } else {
            Paddle.src = "/Game/img/level1/small_paddle_mobile.png";
        }
        Paddle.elt = new Image();
        Paddle.elt.addEventListener("load", () => {
            Paddle.ctx.drawImage(Paddle.elt, 0, 0);
        });
        Paddle.elt.src = Paddle.src;
        BonusClass.bonusPaddle = true;
    }

    /**
     * La vitesse de la balle augmente
     */
    speedBall() {
        this.canvas.style.opacity = 0; // Efface le bonus
        if (Ball.ball) {
            this.speed(Ball);
        }
        if (BonusClass.Ball2) {
            this.speed(BonusClass.Ball2);
        }
        if (BonusClass.Ball3) {
            this.speed(BonusClass.Ball3);
        }
    }

    speed(Ball: BallClass) {
        if (!Device.mobile) {
            Ball.xm > 0 ? Ball.xm += 2 : Ball.xm -= 2;
            Ball.ym > 0 ? Ball.ym += 2 : Ball.ym -= 2;
        } else {
            Ball.xm > 0 ? Ball.xm += 1 : Ball.xm -= 1;
            Ball.ym > 0 ? Ball.ym += 1 : Ball.ym -= 1;
        }
    }
}









//*******************
//    CONTEXTE
//*******************

// On trouve le type d'appareil de l'utilisateur
let Device: DeviceClass = new DeviceClass();
Device.find();

// On créé le canvas
let Canvas: CanvasClass = new CanvasClass(Device.canvasWidth, Device.canvasHeight);

// On met en place les écouteurs d'évènements
if (!Device.tactile) {
    var KeyEvt: EvtClass = new EvtClass("keyboard");
    KeyEvt.listen();
} else {
    // On affiche les boutons tactiles
    var BtnTactiles: TactileButtonsClass = new TactileButtonsClass();
    BtnTactiles.display();
    var TactileEvt: EvtClass = new EvtClass("tactile");
    TactileEvt.listen();
}

// On affiche le background
let Background: BackgroundClass = new BackgroundClass();

// On affiche Stuff
let Stuff: StuffClass = new StuffClass();


// Audio
// Sounds
AudioClass.displayControl();
let BrickSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[0]);
let PaddleSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[2]);
let BonusSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[3]);
let GoodPadleBonusSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[4]);
let BadPadleBonusSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[5]);

// Music
let WinLevelSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[7]);
let GameOverSound: AudioClass = new AudioClass(document.getElementsByTagName("audio")[8]);




//********************************
//        PERSONNAGES
//********************************


// Joueur
let Player: PlayerClass = new PlayerClass();

// Bricks
let Brick: BrickClass = new BrickClass("brick_yellow");
let BrickCracked: BrickClass = new BrickClass("brick_yellow_cracked");
let GreenBrick: BrickClass = new BrickClass("brick_green");
let GreenBrickCracked: BrickClass = new BrickClass("brick_green_cracked");
BrickClass.initArray();

// Koala
let Koala: Sprite = new Sprite("koala");
Koala.x = BrickClass.offsetX;
Koala.y = BrickClass.offsetY;

// Paddle
let Paddle: PaddleClass = new PaddleClass("paddle_yellow");

// Ball
let Ball: BallClass = new BallClass("ball_silver");

// Score
let Score = new ScoreClass();







/**
 * Fonction principale 60fps
 */
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

        // Move the ball
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
        } else {
            if (Ball.ball) {
                BallClass.restartBall(Ball);
            } else if (BonusClass.ball2) {
                BallClass.restartBall(BonusClass.Ball2);
            } else if (BonusClass.ball3) {
                BallClass.restartBall(BonusClass.Ball3);
            }
        }
        // Move the paddle
        Paddle.move();

        // Bonus
        BonusClass.moveAll();

        // Check if the gamer has won
        Player.win();

    } else {
        Canvas.hideAll();
        if (!Player.hasWon) {
            Player.drawCommands();
        } else {
            Player.drawWin();
        }
    }


    requestAnimationFrame(loop);

}



window.addEventListener("load", () => {

    if (Sprite.AllLoaded()) {
        Ball.x = Paddle.x + Paddle.width / 2 - Ball.width / 2;
        Ball.y = Canvas.height - Paddle.height - Ball.height - 5;
        // Draw a ball
        Ball.draw();
        // Draw a simple paddle
        Paddle.draw();
        // Draw the cat
        Koala.draw();
        // Draw bricks
        BrickClass.drawBricks();
    }

    requestAnimationFrame(loop);

}, false);

export {};
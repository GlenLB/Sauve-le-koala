<body ontouchstart=""> <!-- ontouchstart pour que les btn :active fonctionne sur ios -->

    <nav>
        <div id="inscription">INSCRIPTION</div>

        <div style="text-align: center;">
            <h1 style="color: blueViolet;">SAUVE LE KOALA !<br><i style="font-size: 16px; font-family: sans-serif; font-style: normal;">JEU DE CASSE BRIQUE GRATUIT EN LIGNE</i></h1>
        </div>

        <div id="connexion">CONNEXION</div>
    </nav>

    <!-- Inscription, Connexion réussies -->
    <%
        if (session.getAttribute("prenom") != null) {
            out.print("<div id='bandeau' class='bandeau_success'><i id='btnUserSpace' class='fas fa-user-circle'></i> Connecté en tant que " + session.getAttribute("prenom") + "</div>");
        } else {
            out.print("<div id='bandeau'></div>");
        }

    %>

    <!-- Inscription -->
    <form id="form-inscription">
        <h4>INSCRIPTION</h4>
        <input id="inscription-prenom" type="text" placeholder="prenom" />
        <input id="inscription-email" type="email" placeholder="email" />
        <input id="inscription-password" type="password" placeholder="mot de passe" />
        <input id="inscription-password-check" type="password" placeholder="confirmation mot de passe" />
        <i>M'abonner à la newsletter pour être averti de la sortie des nouveaux niveaux</i>
        <input id="checkbox-newsletter" type="checkbox" />
        <div id="btn-inscription-submit">M'INSCRIRE</div>
    </form>

    <!-- Connexion -->
    <form id="form-connect">
        <h4>CONNEXION</h4>
        <input id="connect-email" type="email" placeholder="email" />
        <input id="connect-password" type="password" placeholder="mot de passe" />
        <div id="btn-connect-submit">CONNEXION</div>
    </form>

    <!-- Espace utilisateur -->
    <div id="espace-utilisateur">
        <div style="margin-bottom: 10px;" id="deconnexion">DECONNEXION</div>
        <div id="suppression-compte">SUPPRIMER LE COMPTE</div>
    </div>

    <h2 id="level-titre"><% out.print("LEVEL " + level);%></h2>

    <!-- Intégration page Facebook -->
    <div style="text-align: center; margin-bottom: 50px; min-height: 150px; max-height: 150px; height: 150px;">
        <div class="fb-page" data-href="https://www.facebook.com/sauveLeKoala/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-hide-cta="true" data-height="150"><blockquote cite="https://www.facebook.com/sauveLeKoala/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/sauveLeKoala/">Sauve le koala</a></blockquote></div>
    </div>


    <!-- Partages réseaux sociaux -->
    <div class="partages-container">
        <h2 id="h2-partage">Invite tes amis à venir jouer !</h2>

        <div class="btn-partages-container">
            <div style="margin-right: 10px;" class="fb-share-button" data-href="http://webcomet.fr/sauve-le-koala" data-layout="button_count" data-size="large" data-mobile-iframe="false"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwebcomet.fr%2Fsauve-le-koala&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Partager</a></div>

            <g:plusone size="tall" style="margin-left: 10px; margin-right: 10px;"></g:plusone>

            <i style="margin-left: 10px;"><a class="twitter-share-button"
                                             href="https://twitter.com/intent/tweet?text=Jouez%20à%20ce%20jeu%20extra : "
                                             data-size="large">
                    Tweet</a></i>
        </div>
    </div>



    <div id="canvasContainer">
        <div id="canvasBackground">
            <canvas id="canvas">
                Veuillez mettre à jour votre navigateur pour pouvoir jouer à ce jeu.
            </canvas>
        </div>

        <canvas id="canvasPaddle"></canvas>

        <div id="stuff">
            <span id="lives">VIES : <i id="heart1" class="fa fa-heart full"></i><i id="heart2" class="fa fa-heart full"></i><i id="heart3" class="fa fa-heart not-full"></i></span>
            <span id="score">SCORE : 00</span>
        </div>
    </div>

    <div id="containerBtn">
        <button id="btnLeft"><i style="font-size: 25px;" class="fas fa-caret-left"></i></button>
        <button id="btnPlay"><i style="font-size: 25px;" class="fas fa-play"></i></button>
        <button id="btnRight"><i style="font-size: 25px;" class="fas fa-caret-right"></i></button>
    </div>





    <i id="drawCommands"></i>
    <div id="drawWin">
        <p>Tu as sauvé le koala ! <i class="fas fa-smile" style="color: yellow;"></i></p>
        <button id="buttonWin"></button>
    </div>
    <i id="soundControl"></i>

    <!-- AUDIO -->
    <audio id="brickSound" src="/Game/sounds/brick_sound.mp3" preload="auto"></audio>
    <audio id="ironBrickSound" src=""></audio>
    <audio id="paddleSound" src="/Game/sounds/paddle_sound.mp3" preload="auto"></audio>
    <audio id="bonusSound" src="/Game/sounds/bonus_sound.mp3" preload="auto"></audio>
    <audio id="goodBonusPaddleSound" src="/Game/sounds/good_bonus_sound.mp3" preload="auto"></audio>
    <audio id="badBonusPaddleSound" src="/Game/sounds/bad_bonus_sound.mp3" preload="auto"></audio>
    <audio id="backgroundMusic" src="/Game/sounds/background_music.mp3" preload="auto"></audio>
    <audio id="winLevel" src="/Game/sounds/win_level_sound.mp3" preload="auto"></audio>
    <audio id="gameOver" src="/Game/sounds/game_over_sound.mp3" preload="auto"></audio>



    <!-- COMMENTAIRES -->
    <div style="text-align: center; margin-top: 150px;">
        <div class="fb-comments" data-href="http://webcomet.fr/sauve-le-koala" data-numposts="10" data-order-by="reverse_time"></div>
    </div>
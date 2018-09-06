<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html xmlns:og="http://ogp.me/ns#">
    <head>
        <title>Sauve le koala | Mentions légales</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Mentions légales du jeu Sauve le koala">
        <link href="https://fonts.googleapis.com/css?family=Faster+One" rel="stylesheet">
        <!-- FONT AWESOME -->
        <link rel="stylesheet" href="/Game/fontawesome/css/fontawesome-all.min.css">
        <!-- Styles perso -->
        <link rel="stylesheet" href="/Game/css/style.css">
        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/Game/favicon.png" />
        <!-- OPEN GRAPH -->
        <meta property="og:title" content="Sauve le Koala dans ce jeu 2D gratuit et amusant !" />
        <meta property="og:description" content="Viens te détendre quelques minutes en sauvant le koala dans ce jeu 2D gratuit et amusant ! Plus de 7 niveaux gratuits !" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://webcomet.fr/sauve-le-koala" />
        <meta property="og:image" content="/Game/img/level1/koala_reseaux_sociaux.png" />
    </head>

    <body style="padding: 10px;">
        <h1 style="text-align: center;"><a style="color: blueViolet; text-decoration: none;" href="/sauve-le-koala">SAUVE LE KOALA !</a></h1>

        <h2 style="margin-top: 100px;">Mentions légales</h2>

        <p>En vous connectant sur ce site, vous acceptez sans réserves les présentes modalités. Aussi, conformément à l’article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l’économie numérique, les responsables du présent site internet http://webcomet.fr/ sont : </p>

        <h3>Editeur du site et développement</h3>

        <p>
            Glen Le Baill<br>
            Développeur web freelance<br>
            lebaill.glen@gmail.com<br>
            5 rue de Léhon 22100 DINAN<br>
        </p>


        <h3>Hébergement</h3>

        <p>
            OVH<br>
            SAS au capital de 10 069 020 €<br>
            RCS Lille Métropole 424 761 419 00045<br>
            Code APE 2620Z<br>
            N° TVA : FR 22 424 761 419<br>
            Siège social : 2 rue Kellermann - 59100 Roubaix - France
        </p>


        <h3>Google Analytics</h3>

        <p>
            Ce site utilise Google Analytics, un service d'analyse de site internet fourni par Google Inc. (« Google »). Google Analytics utilise des cookies, qui sont des fichiers texte placés sur votre ordinateur, pour aider le site internet à analyser l'utilisation du site par ses utilisateurs. Les données générées par les cookies concernant votre utilisation du site (y compris votre adresse IP) seront transmises et stockées par Google sur des serveurs situés aux Etats-Unis. Google utilisera cette information dans le but d'évaluer votre utilisation du site, de compiler des rapports sur l'activité du site à destination de son éditeur et de fournir d'autres services relatifs à l'activité du site et à l'utilisation d'Internet. Google est susceptible de communiquer ces données à des tiers en cas d'obligation légale ou lorsque ces tiers traitent ces données pour le compte de Google, y compris notamment l'éditeur de ce site. Google ne recoupera pas votre adresse IP avec toute autre donnée détenue par Google. Vous pouvez désactiver l'utilisation de cookies en sélectionnant les paramètres appropriés de votre navigateur. Cependant, une telle désactivation pourrait empêcher l'utilisation de certaines fonctionnalités de ce site. En utilisant ce site internet, vous consentez expressément au traitement de vos données nominatives par Google dans les conditions et pour les finalités décrites ci-dessus.
        </p>


        <footer>

            <div id="container-footer">
                <span>Tous droits réservés webcomet.fr</span>
                <a style="color: white; text-decoration: none;" href="/mentions-legales">Mentions légales</a>
            </div>



            <%
                // On affiche la bannière de cookies uniquement si le visiteur n'a pas le cookie d'acceptation de cookies (fichier "cookies.ts")
                Boolean cookies_accept = false;
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals("cookie_webcomet_accept")) {
                            cookies_accept = true;
                        }
                    }
                }
                if (!cookies_accept) {
                    out.print("<div id='cookie-banner'>Ce site web utilise des cookies afin de réaliser des mesures d'audience (Google Analytics) <span id='btnCookies'>OK</span></div>");
                }
            %>
        </footer>
    </body>
</html>
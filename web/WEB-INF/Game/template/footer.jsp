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


<!-- FACEBOOK SDK -->
<!--<div id="fb-root"></div>
<script>
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.0';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>-->
<div id="fb-root"></div>
<script>
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.0&appId=333732750494062';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>

<!-- GOOGLE+ -->
<script src="https://apis.google.com/js/platform.js" async defer></script>

<!-- TWITTER -->
<script>
    window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
        if (d.getElementById(id))
            return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
</script>

<!-- SCRIPTS PERSO -->
<script type="text/javascript" src="/Game/js/inscription_connect.js"></script>
<script type="text/javascript" src="/Game/js/cookies.js"></script>
<!-- À charger en dernier -->
<script type="text/javascript" src="/Game/js/level<%= level%>.js"></script>
</body>
</html>
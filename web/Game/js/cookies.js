var btnCookies = document.getElementById("btnCookies");
var cookieBanner = document.getElementById("cookie-banner");
if (btnCookies != null) {
    btnCookies.onclick = function () {
        document.cookie = "cookie_webcomet_accept=true; max-age=" + 60 * 60 * 24 * 15;
        cookieBanner.style.display = "none";
    };
}

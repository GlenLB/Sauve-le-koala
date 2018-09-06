window.addEventListener("load", function () {
    var btnInscription = document.getElementById("inscription");
    var btnConnexion = document.getElementById("connexion");
    var formInscription = document.getElementById("form-inscription");
    var formConnect = document.getElementById("form-connect");
    var formInscriptionDisplayed = false;
    var formConnectDisplayed = false;
    var userSpaceDisplayed = false;
    var btnUserSpace = document.getElementById("btnUserSpace");
    var espaceUtilisateur = document.getElementById("espace-utilisateur");
    var btnDeconnexion = document.getElementById("deconnexion");
    var btnDeleteCompte = document.getElementById("suppression-compte");
    btnInscription.onclick = function () {
        if (!formInscriptionDisplayed) {
            formInscriptionDisplayed = true;
            formInscription.style.display = "flex";
            formInscription.style.opacity = "1";
            formInscription.style.height = "auto";
        }
        else {
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";
        }
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";
    };
    btnConnexion.onclick = function () {
        if (!formConnectDisplayed) {
            formConnectDisplayed = true;
            formConnect.style.display = "flex";
            formConnect.style.opacity = "1";
            formConnect.style.height = "auto";
        }
        else {
            formConnectDisplayed = false;
            formConnect.style.display = "none";
            formConnect.style.opacity = "0";
            formConnect.style.height = "0px";
        }
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";
    };
    if (btnUserSpace != null) {
        btnUserSpace.onclick = btnUser;
    }
    function btnUser() {
        if (!userSpaceDisplayed) {
            userSpaceDisplayed = true;
            espaceUtilisateur.style.display = "flex";
            espaceUtilisateur.style.opacity = "1";
            espaceUtilisateur.style.height = "auto";
        }
        else {
            userSpaceDisplayed = false;
            espaceUtilisateur.style.display = "none";
            espaceUtilisateur.style.opacity = "0";
            espaceUtilisateur.style.height = "0px";
        }
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";
    }
    btnDeconnexion.addEventListener("click", deconnexion);
    function deconnexion() {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 0)) {
                affichageBandeauDeconnexion(xhr.responseText);
            }
        };
        xhr.open("POST", "/destroy-session", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("");
        console.log("requête AJAX destroy session envoyée");
    }
    ;
    btnDeleteCompte.addEventListener("click", function () {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 0)) {
                affichageBandeauSuppressionCompte(xhr.responseText);
            }
        };
        xhr.open("POST", "/destroy-compte", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("");
        console.log("requête AJAX destroy compte envoyée");
    });
    var typeDemande = "";
    var prenomOK;
    var emailOK;
    var passOK;
    var btnInscriptionSubmit = document.getElementById("btn-inscription-submit");
    var iPrenom;
    var iEmail;
    var iPassword;
    var iPasswordCheck;
    var iNewsletter;
    var iDejaErreur = false;
    var btnConnectSubmit = document.getElementById("btn-connect-submit");
    var cEmail;
    var cPassword;
    var cDejaErreur = false;
    btnInscriptionSubmit.addEventListener("click", function () {
        iPrenom = document.getElementById("inscription-prenom");
        iEmail = document.getElementById("inscription-email");
        iPassword = document.getElementById("inscription-password");
        iPasswordCheck = document.getElementById("inscription-password-check");
        iNewsletter = document.getElementById("checkbox-newsletter").checked;
        typeDemande = "inscription";
        prenomOK = checkPrenom(iPrenom);
        emailOK = checkEmail(iEmail);
        passOK = checkPass(iPassword, iPasswordCheck);
        if (prenomOK && emailOK && passOK) {
            envoiDonneesAJAX();
        }
        else {
            if (!iDejaErreur) {
                formInscription.innerHTML += "<i style='color: red; padding-top: 15px;'>Merci de remplir correctement tous les champs</i>";
                iDejaErreur = true;
            }
        }
    });
    btnConnectSubmit.addEventListener("click", function () {
        cEmail = document.getElementById("connect-email");
        cPassword = document.getElementById("connect-password");
        typeDemande = "connexion";
        emailOK = checkEmail(cEmail);
        passOK = checkPass(cPassword, cPassword);
        if (emailOK && passOK) {
            envoiDonneesAJAX();
        }
        else {
            if (!cDejaErreur) {
                formConnect.innerHTML += "<i style='color: red; padding-top: 15px;'>Merci de remplir correctement tous les champs</i>";
                cDejaErreur = true;
            }
        }
    });
    function checkPrenom(prenom) {
        return prenom.value.length >= 2 && prenom.value.length <= 50 && !prenom.value.includes("<") && !prenom.value.includes(">");
    }
    function checkEmail(mail) {
        return mail.value.length > 5 && mail.value.length <= 100 && mail.value.includes("@") && !mail.value.includes("<script>");
    }
    function checkPass(pass, passCheck) {
        return (pass.value.length > 5 && pass.value.length <= 50) && (passCheck.value === pass.value) && !pass.value.includes("<script>");
    }
    function envoiDonneesAJAX() {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 0)) {
                traitementDonneesRetour(xhr.responseText);
            }
        };
        xhr.open("POST", "/connect", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (typeDemande === "inscription") {
            xhr.send("prenom=" + iPrenom.value + "&email=" + iEmail.value + "&pass=" + iPassword.value + "&newsletter=" + iNewsletter + "&dernierLevel=" + 1);
            console.log("requête AJAX inscription envoyée");
        }
        else if (typeDemande === "connexion") {
            xhr.send("email=" + cEmail.value + "&pass=" + cPassword.value);
            console.log("requête AJAX connexion envoyée");
        }
    }
    function traitementDonneesRetour(retour) {
        retour = retour.trim();
        if (retour === "erreur") {
            console.log("erreur retour");
        }
        else {
            if (typeDemande === "inscription") {
                console.log("requête AJAX inscription retour");
                if (retour === "true") {
                    console.log("retour true");
                    afficherInscription(true);
                }
                else if (retour === "false") {
                    console.log("retour false");
                    afficherInscription(false);
                }
                else {
                    console.log("autre retour : " + retour);
                }
            }
            else if (typeDemande === "connexion") {
                console.log("requête AJAX connexion retour");
                if (retour == "mauvaise adresse mail" || retour == "mauvais mot de passe") {
                    afficherConnexion(false, "", "");
                }
                else if (retour != "erreur") {
                    var res = retour.split("&");
                    var prenomUser = res[0];
                    var emailUser = res[1];
                    var dernierlevelUser = res[2];
                    console.log("retour connexion : " + retour);
                    console.log(prenomUser);
                    afficherConnexion(true, prenomUser, dernierlevelUser);
                }
                else {
                    afficherConnexion(false, "", "");
                }
            }
        }
    }
    function affichageBandeauDeconnexion(reponse) {
        var bandeau = document.getElementById("bandeau");
        if (reponse.trim() == "deconnexion ok") {
            bandeau.innerText = "Vous êtes maintenant déconnecté";
            bandeau.setAttribute("class", "bandeau_error");
        }
        else {
            bandeau.innerText = "Une erreur est apparue. Veuillez réésayer plus tard.";
            bandeau.setAttribute("class", "bandeau_error");
        }
        btnUser();
    }
    function affichageBandeauSuppressionCompte(reponse) {
        var bandeau = document.getElementById("bandeau");
        if (reponse.trim() == "suppression et deconnexion ok") {
            bandeau.innerText = "Votre compte et toutes ses données ont bien été supprimées";
            bandeau.setAttribute("class", "bandeau_error");
        }
        else {
            bandeau.innerText = "Une erreur est apparue. Veuillez réésayer plus tard.";
            bandeau.setAttribute("class", "bandeau_error");
        }
        btnUser();
    }
    function afficherConnexion(success, prenom, dernierlevelUser) {
        var bandeau = document.getElementById("bandeau");
        var url = "http://" + window.location.host;
        if (success) {
            if (parseInt(dernierlevelUser) > 1) {
                bandeau.innerHTML = "<i id='btnUserSpace' class='fas fa-user-circle'></i> Connect\u00E9 en tant que " + prenom + ". <a style='color: blueviolet;' href='" + url + "/sauve-le-koala?level=" + dernierlevelUser + "'>Aller au niveau " + dernierlevelUser + "</a>";
            }
            else {
                bandeau.innerHTML = "<i id='btnUserSpace' class='fas fa-user-circle'></i> Connect\u00E9 en tant que " + prenom;
            }
            bandeau.setAttribute("class", "bandeau_success");
            btnUserSpace = document.getElementById("btnUserSpace");
            btnUserSpace.onclick = btnUser;
            formConnectDisplayed = false;
            formConnect.style.display = "none";
            formConnect.style.opacity = "0";
            formConnect.style.height = "0px";
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";
            AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";
        }
        else {
            bandeau.innerText = "Connexion échouée";
            bandeau.setAttribute("class", "bandeau_error");
        }
    }
    function afficherInscription(success) {
        var bandeau = document.getElementById("bandeau");
        if (success) {
            bandeau.innerText = "Inscription réussie ! Vous pouvez maintenant vous connecter :-)";
            bandeau.setAttribute("class", "bandeau_success");
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";
            formConnectDisplayed = true;
            formConnect.style.display = "flex";
            formConnect.style.opacity = "1";
            formConnect.style.height = "auto";
        }
        else {
            bandeau.innerText = "Inscription échouée";
            bandeau.setAttribute("class", "bandeau_error");
        }
    }
});

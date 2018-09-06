

window.addEventListener("load", () => {

    let btnInscription: HTMLElement = document.getElementById("inscription");
    let btnConnexion: HTMLElement = document.getElementById("connexion");
    let formInscription: HTMLElement = document.getElementById("form-inscription");
    let formConnect: HTMLElement = document.getElementById("form-connect");

    let formInscriptionDisplayed: boolean = false;
    let formConnectDisplayed: boolean = false;
    let userSpaceDisplayed: boolean = false;

    let btnUserSpace = document.getElementById("btnUserSpace");
    let espaceUtilisateur = document.getElementById("espace-utilisateur");
    let btnDeconnexion = document.getElementById("deconnexion");
    let btnDeleteCompte = document.getElementById("suppression-compte");


    btnInscription.onclick = function () {

        if (!formInscriptionDisplayed) {
            formInscriptionDisplayed = true;
            formInscription.style.display = "flex";
            formInscription.style.opacity = "1";
            formInscription.style.height = "auto";
        } else {
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";
        }

        // Pour replacer elt audio
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";

    }

    btnConnexion.onclick = function () {

        if (!formConnectDisplayed) {
            formConnectDisplayed = true;
            formConnect.style.display = "flex";
            formConnect.style.opacity = "1";
            formConnect.style.height = "auto";
        } else {
            formConnectDisplayed = false;
            formConnect.style.display = "none";
            formConnect.style.opacity = "0";
            formConnect.style.height = "0px";
        }

        // Pour replacer elt audio
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";

    }

    if (btnUserSpace != null) {
        btnUserSpace.onclick = btnUser;
    }

    function btnUser() {
        if (!userSpaceDisplayed) {
            userSpaceDisplayed = true;
            espaceUtilisateur.style.display = "flex";
            espaceUtilisateur.style.opacity = "1";
            espaceUtilisateur.style.height = "auto";
        } else {
            userSpaceDisplayed = false;
            espaceUtilisateur.style.display = "none";
            espaceUtilisateur.style.opacity = "0";
            espaceUtilisateur.style.height = "0px";
        }

        // Pour replacer elt audio
        AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";

    }


    btnDeconnexion.addEventListener("click", deconnexion);

    function deconnexion() {
        // Appel AJAX destroy session
        let xhr: XMLHttpRequest = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 0)) {
                affichageBandeauDeconnexion(xhr.responseText);
            }
        };
        xhr.open("POST", "/destroy-session", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("");
        console.log("requête AJAX destroy session envoyée");
    };

    btnDeleteCompte.addEventListener("click", () => {
        // On supprime les données du joueur en BDD et on le déconnecte
        // Appel AJAX destroy compte
        let xhr: XMLHttpRequest = new XMLHttpRequest;
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





    let typeDemande: string = "";
    let prenomOK: boolean;
    let emailOK: boolean;
    let passOK: boolean;
    // Inscription
    let btnInscriptionSubmit: HTMLElement = document.getElementById("btn-inscription-submit");
    let iPrenom: HTMLInputElement;
    let iEmail: HTMLInputElement;
    let iPassword: HTMLInputElement;
    let iPasswordCheck: HTMLInputElement;
    let iNewsletter: boolean;
    let iDejaErreur: boolean = false;
    // Connexion
    let btnConnectSubmit: HTMLElement = document.getElementById("btn-connect-submit");
    let cEmail: HTMLInputElement;
    let cPassword: HTMLInputElement;
    let cDejaErreur: boolean = false;


    btnInscriptionSubmit.addEventListener("click", () => {
        iPrenom = <HTMLInputElement> document.getElementById("inscription-prenom");
        iEmail = <HTMLInputElement> document.getElementById("inscription-email");
        iPassword = <HTMLInputElement> document.getElementById("inscription-password");
        iPasswordCheck = <HTMLInputElement> document.getElementById("inscription-password-check");
        iNewsletter = (<HTMLInputElement> document.getElementById("checkbox-newsletter")).checked;

        typeDemande = "inscription";
        // Vérification des données du formulaire
        prenomOK = checkPrenom(iPrenom);
        emailOK = checkEmail(iEmail);
        passOK = checkPass(iPassword, iPasswordCheck);
        if (prenomOK && emailOK && passOK) {
            // Envoi des données par AJAX à la page JSP
            envoiDonneesAJAX();
        } else {
            // Afficher un message d'erreur
            if (!iDejaErreur) {
                formInscription.innerHTML += "<i style='color: red; padding-top: 15px;'>Merci de remplir correctement tous les champs</i>";
                iDejaErreur = true;
            }
        }
    });

    btnConnectSubmit.addEventListener("click", () => {
        cEmail = <HTMLInputElement> document.getElementById("connect-email");
        cPassword = <HTMLInputElement> document.getElementById("connect-password");

        typeDemande = "connexion";
        // Vérification des données du formulaire
        emailOK = checkEmail(cEmail);
        passOK = checkPass(cPassword, cPassword);
        if (emailOK && passOK) {
            // Envoi des données par AJAX à la page JSP
            envoiDonneesAJAX();
        } else {
            // Afficher un message d'erreur
            if (!cDejaErreur) {
                formConnect.innerHTML += "<i style='color: red; padding-top: 15px;'>Merci de remplir correctement tous les champs</i>";
                cDejaErreur = true;
            }
        }
    });


    function checkPrenom(prenom: HTMLInputElement): boolean {
        return prenom.value.length >= 2 && prenom.value.length <= 50 && !prenom.value.includes("<") && !prenom.value.includes(">");
    }

    function checkEmail(mail: HTMLInputElement): boolean {
        return mail.value.length > 5 && mail.value.length <= 100 && mail.value.includes("@") && !mail.value.includes("<script>");
    }

    function checkPass(pass: HTMLInputElement, passCheck: HTMLInputElement): boolean {
        return (pass.value.length > 5 && pass.value.length <= 50) && (passCheck.value === pass.value) && !pass.value.includes("<script>");
    }

    function envoiDonneesAJAX() {
        let xhr: XMLHttpRequest = new XMLHttpRequest;
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
        } else if (typeDemande === "connexion") {
            xhr.send("email=" + cEmail.value + "&pass=" + cPassword.value);
            console.log("requête AJAX connexion envoyée");
        }
    }

    function traitementDonneesRetour(retour: string) {
        retour = retour.trim();
        if (retour === "erreur") {
            console.log("erreur retour");
        } else {
            if (typeDemande === "inscription") {
                console.log("requête AJAX inscription retour");
                if (retour === "true") {
                    console.log("retour true");
                    // Inscription réussie
                    afficherInscription(true);
                } else if (retour === "false") {
                    // Inscription échouée
                    console.log("retour false");
                    afficherInscription(false);
                } else {
                    console.log("autre retour : " + retour);
                }
            } else if (typeDemande === "connexion") {
                console.log("requête AJAX connexion retour");
                if (retour == "mauvaise adresse mail" || retour == "mauvais mot de passe") {
                    afficherConnexion(false, "", "");
                } else if (retour != "erreur") {
                    // Connexion réussie, on récupère les données du joueur
                    let res: string[] = retour.split("&");
                    let prenomUser: string = res[0];
                    let emailUser: string = res[1];
                    let dernierlevelUser: string = res[2];
                    console.log("retour connexion : " + retour);
                    console.log(prenomUser);

                    afficherConnexion(true, prenomUser, dernierlevelUser);
                } else {
                    afficherConnexion(false, "", "");
                }
            }
        }
    }

    function affichageBandeauDeconnexion(reponse: string) {
        let bandeau = document.getElementById("bandeau");
        if (reponse.trim() == "deconnexion ok") {
            bandeau.innerText = "Vous êtes maintenant déconnecté";
            bandeau.setAttribute("class", "bandeau_error");
        } else {
            bandeau.innerText = "Une erreur est apparue. Veuillez réésayer plus tard.";
            bandeau.setAttribute("class", "bandeau_error");
        }
        // On enlève le menu user
        btnUser();
    }
    
    function affichageBandeauSuppressionCompte(reponse: string) {
        let bandeau = document.getElementById("bandeau");
        if (reponse.trim() == "suppression et deconnexion ok") {
            bandeau.innerText = "Votre compte et toutes ses données ont bien été supprimées";
            bandeau.setAttribute("class", "bandeau_error");
        } else {
            bandeau.innerText = "Une erreur est apparue. Veuillez réésayer plus tard.";
            bandeau.setAttribute("class", "bandeau_error");
        }
        // On enlève le menu user
        btnUser();
    }


    function afficherConnexion(success: boolean, prenom: string, dernierlevelUser: string): void {
        let bandeau = document.getElementById("bandeau");
        let url = "http://" + window.location.host;

        if (success) {
            if (parseInt(dernierlevelUser) > 1) {
                bandeau.innerHTML = `<i id='btnUserSpace' class='fas fa-user-circle'></i> Connecté en tant que ${prenom}. <a style='color: blueviolet;' href='${url}/sauve-le-koala?level=${dernierlevelUser}'>Aller au niveau ${dernierlevelUser}</a>`;
            } else {
                bandeau.innerHTML = `<i id='btnUserSpace' class='fas fa-user-circle'></i> Connecté en tant que ${prenom}`;
            }
            bandeau.setAttribute("class", "bandeau_success");
            btnUserSpace = document.getElementById("btnUserSpace");
            btnUserSpace.onclick = btnUser;

            // On rabat le formulaire de connexion
            formConnectDisplayed = false;
            formConnect.style.display = "none";
            formConnect.style.opacity = "0";
            formConnect.style.height = "0px";
            // On rabat le formulaire d'inscription
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";

            // Pour replacer elt audio
            AudioClass.control.style.top = Canvas.canvas.getBoundingClientRect().top + window.scrollY + Canvas.height / 2 + 90 + "px";

        } else {
            bandeau.innerText = "Connexion échouée";
            bandeau.setAttribute("class", "bandeau_error");
        }
    }

    function afficherInscription(success: boolean): void {
        let bandeau = document.getElementById("bandeau");

        if (success) {
            bandeau.innerText = "Inscription réussie ! Vous pouvez maintenant vous connecter :-)";
            bandeau.setAttribute("class", "bandeau_success");

            // On rabat le formulaire d'inscription
            formInscriptionDisplayed = false;
            formInscription.style.display = "none";
            formInscription.style.opacity = "0";
            formInscription.style.height = "0px";
            // On affiche le formulaire de connexion
            formConnectDisplayed = true;
            formConnect.style.display = "flex";
            formConnect.style.opacity = "1";
            formConnect.style.height = "auto";
        } else {
            bandeau.innerText = "Inscription échouée";
            bandeau.setAttribute("class", "bandeau_error");
        }

    }

});
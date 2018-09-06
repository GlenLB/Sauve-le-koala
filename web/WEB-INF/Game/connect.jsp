<%@page import="fr.webcomet.Hash"%>
<%@page import="fr.webcomet.Database" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    response.setContentType("text/plain");
    
    String prenom = request.getParameter("prenom");
    String email = request.getParameter("email");
    String password = request.getParameter("pass");
    String newsletter = request.getParameter("newsletter");
    String dernierLevel = request.getParameter("dernierLevel");
    Integer intNewsletter = 0;

    /*response.getWriter().println(prenom);
    response.getWriter().println(email);
    response.getWriter().println(password);
    response.getWriter().println(newsletter);*/

    if (email != null && password != null) {
        email = email.trim();
        password = password.trim();
        // Hash du mot de passe
        password = Hash.sha256(password);
        if (prenom != null && newsletter != null) {
            prenom = prenom.trim();
            newsletter = newsletter.trim();
            if (newsletter.equalsIgnoreCase("true")) {
                intNewsletter = 1;
            } else {
                intNewsletter = 0;
            }
            // Inscription joueur BDD
            Boolean res = Database.inscriptionJoueur(prenom, email, password, intNewsletter);
            // Retourne "true" si ok, "false" sinon
            response.getWriter().print(res);
        } else {
            /* Connexion joueur => 
            Si les infos fournies correspondent à un joueur enregistré, on récupère ses infos depuis la BDD et on les stocke en session, puis on les affiche ici pour renvoi AJAX.*/
            String res = Database.connexionJoueur(request, email, password);
            // Connexion réussie ou mauvais mot de passe ou erreur connexion, on retourne les données sous forme de texte
            response.getWriter().print(res);
        }
    } else {
        // Erreur
        response.getWriter().print("erreur générale");
    }
%>

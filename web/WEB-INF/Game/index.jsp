<%@page import="fr.webcomet.Database"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>



<%
    // Récupération de la session
    session = request.getSession();

    // Choix du level en fonction du paramètre GET level
    Integer lvl = -1;
    Boolean caste = false;
    String level = "";
    Integer dernierLevel = null;
    Boolean castLvl = false;
    String email = null;
    Boolean res = false;
    Integer scrollY = -1;

    // On récupère en session le plus haut level accédé par le joueur
    try {
        dernierLevel = (Integer) session.getAttribute("dernierLevel");
        email = (String) session.getAttribute("email");
        if(dernierLevel != null && email != null) {
            castLvl = true;
        }
    } catch (Exception e) {
        e.getMessage();
    }

    try {
        lvl = Integer.parseInt(request.getParameter("level"));
        if(lvl > -1) {
            caste = true;
        }
    } catch (Exception e) {
        e.getMessage();
    }

    // À chaque level, on vérifie que le joueur a déjà été à ce level ou pas
    // Sinon, on stocke en BDD le dernier level joué
    // Ainsi le dernier lvl joué est constamment à jour
    if (caste && castLvl) {
        if (lvl > 0) {
            switch (lvl) {
                case 2:
                    level = "2";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                case 3:
                    level = "3";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                case 4:
                    level = "4";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                case 5:
                    level = "5";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                case 6:
                    level = "6";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                case 7:
                    level = "7";
                    if (lvl > dernierLevel) {
                        res = Database.stockerNouveauLevel(lvl, email);
                        if (res) {
                            session.setAttribute("dernierLevel", lvl);
                        }
                    }
                    break;
                default:
                    level = "1";
                    break;
            }
        }
    } else if (caste && !castLvl) {
        if (lvl > 0) {
            switch (lvl) {
                case 2:
                    level = "2";
                    break;
                case 3:
                    level = "3";
                    break;
                case 4:
                    level = "4";
                    break;
                case 5:
                    level = "5";
                    break;
                case 6:
                    level = "6";
                    break;
                case 7:
                    level = "7";
                    break;
                default:
                    level = "1";
                    break;
            }
        }
    } else if (lvl == -1 || lvl == null) {
        level = "1";
    }

%>


<%@include file="template/header.jsp" %>

<%@include file="template/body.jsp" %>

<% 
    try {
        scrollY = Integer.parseInt(request.getParameter("scroll"));
        out.print("<script>window.addEventListener('load', () => { window.scrollTo(0, " + scrollY + ") });</script>");
    } catch(Exception e) {
        e.getMessage();
    }
%>

<%@include file="template/footer.jsp" %>
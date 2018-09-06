package fr.webcomet.servlet;

import fr.webcomet.Database;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = {"/destroy-compte"})
public class DestroyCompte extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Boolean res = Database.deleteUser(session);
        if (res) {
            session.invalidate();
            response.setContentType("text/plain");
            response.getWriter().print("suppression et deconnexion ok");
        } else {
            response.setContentType("text/plain");
            response.getWriter().print("suppression impossible");
        }
    }

}

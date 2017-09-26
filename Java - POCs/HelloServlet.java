package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(
        name = "MyServlet",
        urlPatterns = {"/hello"}
)
public class HelloServlet extends HttpServlet {

    private static final String HMAC_SHA1_ALGORITHM = "HmacSHA1";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        ServletOutputStream out = resp.getOutputStream();
        out.write(req.getParameter("var").getBytes());
        out.write("hello heroku".getBytes());
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ServletOutputStream out = resp.getOutputStream();
        String data = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        String hmac = "";
        try {
            hmac = PostbackHelper.calculateRFC2104HMAC(data, "API_KEY");
        } catch (Exception ex) {
            Logger.getLogger(HelloServlet.class.getName()).log(Level.SEVERE, null, ex);

        }
        boolean validate = PostbackHelper.validate(req.getHeader("X-Hub-Signature"), hmac);
        if (validate) {
            System.out.println("Match");
        } else {
            System.out.println("Chave Inválida");
        }

        Map<String, List<String>> map = PostbackHelper.getParameterMap(data);
        System.out.println("Mapa" + map.toString());

    }

}

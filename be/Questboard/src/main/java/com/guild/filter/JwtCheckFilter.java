package com.guild.filter;

import com.guild.config.AccountUserDetail;
import com.guild.util.JwtToken;
import com.guild.util.RSAEncoder;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtCheckFilter extends OncePerRequestFilter {

    @Autowired
    private AccountUserDetail accountUserDetail;

    @Autowired
    private RSAEncoder rsaEncoder;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        System.out.println("filter");
        if (path != null && path.length() >= 8 && path.substring(0, 8).equals("/account")) {
//        if (path != null && path.length() >= 7 && path.substring(0, 7).equals("/permit")) {
            System.out.println("path: "+path+"/"+path.substring(0, 8).equals("/account"));
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            String bearer = "Bearer ";
            if (authHeader !=null && authHeader.startsWith(bearer)) {
                System.out.println("filter bearer");
                try {
                    String encodeToken = authHeader.substring(bearer.length());
                    String token = rsaEncoder.decode(encodeToken);

                    Claims claims = Jwts.parser().setSigningKey(JwtToken.SECRET_KEY)
                            .parseClaimsJws(token).getBody();
                    String account = claims.get("account").toString();
                    System.out.println(claims);

                    // setAuthentication
                    if (account != null && SecurityContextHolder.getContext().getAuthentication()==null) {
                        UserDetails userDetails = accountUserDetail.loadUserByUsername((account));
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }

//                    System.out.println("filter account: "+ claims.get("account"));
//                    System.out.println("filter auth: "+ claims.get("userAuthorities"));
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    System.out.println(e);
                    if (e.toString().contains("expired")) {
                        response.sendError(HttpStatus.I_AM_A_TEAPOT.value(), "token expired");
                    } else {
                        response.sendError(HttpStatus.FORBIDDEN.value(), "Token Error: " + e.getMessage());
                    }
                }
            } else {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "None Authenrization");
//                request.getRequestDispatcher("/error").forward(request, response);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}

package com.guild.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Component
public class JwtToken {
    private static final long EXPIRATION_TIME = 1000*60*10; // 60sec
    public  static final String SECRET_KEY = "GOTTEM";

    @Autowired
    private RSAEncoder rsaEncoder;

    public String generateToken (Map<String, Object> claims) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String token = Jwts.builder().setClaims(claims)
                .setExpiration(new Date(Instant.now().toEpochMilli() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
        return rsaEncoder.encode(token);
    }

    public void validateToken (String token) throws AuthException {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJwt(token);
        } catch (Exception e) {
            throw new AuthException("無效的JWT: "+e);
        }
    }
}

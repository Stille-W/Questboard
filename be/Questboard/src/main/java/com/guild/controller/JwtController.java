package com.guild.controller;

import com.google.gson.Gson;
import com.guild.mapper.AdventurerMapper;
import com.guild.util.JwtToken;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class JwtController {

    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private AdventurerMapper adventurerMapper;

    @PostMapping("/jwt")
    @ResponseBody
    public ResponseEntity index(HttpServletResponse response) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String account = SecurityContextHolder.getContext().getAuthentication().getName();
        String userAuthorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
//        Object detail = SecurityContextHolder.getContext().getAuthentication().getDetails();
        System.out.println("JwtToken: "+account);
//        System.out.println("JwtToken: "+detail);

        Map<String, Object> claims = new HashMap<>();
        claims.put("account", account);
        claims.put("userAuthorities", userAuthorities);
        String token = jwtToken.generateToken(claims);
        String aid = adventurerMapper.findAdventurerByAccount(account).getAid().toString();
        String username = adventurerMapper.findAdventurerByAccount(account).getAname();

        Map<String, String> tokens = new HashMap<>();
        tokens.put("id", aid);
        tokens.put("username", username);
        tokens.put("token", token);
        String tokenJson = new Gson().toJson(tokens);
        System.out.println(tokens);

        return ResponseEntity.status(HttpStatus.OK).body(tokenJson);
    }
}

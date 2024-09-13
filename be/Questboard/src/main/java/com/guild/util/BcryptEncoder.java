package com.guild.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//@Component
public class BcryptEncoder {

    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("1234"));
    }
//    public PasswordEncoder passwordEncoder () {
//        return new BCryptPasswordEncoder();
//    }
}

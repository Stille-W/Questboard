package com.guild.util;

import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.util.Base64;

@Component
public class RSAEncoder {

    private static final KeyPair keyPair = initKey();

    private static KeyPair initKey(){
        KeyPairGenerator generator = null;
        try {
            generator = KeyPairGenerator.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        generator.initialize(2048);

        return generator.generateKeyPair();
    }

    public String encode (String rawText) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        PublicKey publicKey = keyPair.getPublic();
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] cipherText = cipher.doFinal(rawText.getBytes());
        String base64 = Base64.getEncoder().encodeToString(cipherText);
        System.out.println("encode: "+base64);

        return base64;
    }

    public String decode(String base64Text) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        PrivateKey privateKey = keyPair.getPrivate();
        byte[] cipherText = Base64.getDecoder().decode(base64Text);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedText = cipher.doFinal(cipherText);
        System.out.println("decode: "+ new String(decryptedText));

        return  new String(decryptedText);
    }
}

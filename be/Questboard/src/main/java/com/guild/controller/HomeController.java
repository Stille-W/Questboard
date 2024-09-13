package com.guild.controller;

import com.google.gson.Gson;
import com.guild.mapper.AdventurerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @Autowired
    private AdventurerMapper adventurerMapper;

    @RequestMapping(value = "/")
    public String Home() {
        return "home";
    }

    @RequestMapping(value = "/hello")
    public String Hello() {
        return "hello world";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "操作失敗，沒有訪問的權限，請重新登入後再嘗試";
    }

    @PostMapping(value = "/login")
    public String login(Map<String, String> params) {
        return "login";
    }

    @PostMapping(value = "/logout")
    public String logout() {
        return "logout";
    }

    @PostMapping(value = "/register")
    public String register(@RequestBody Map<String, String> params) {
        System.out.println("register: "+ convert2Json(params));
        String account = params.get("account");
        String password = params.get("password");
        String name = params.get("name");
        String gender = params.get("gender");
        int speciesId = Integer.parseInt(params.get("species"));
        String job = params.get("job");
        String status = params.get("status");
        adventurerMapper.insertAdAdventurer(name, account, password, gender, job, status, speciesId);
        return "register success";
    }

    private String convert2Json (Object obj) {
        return new Gson().toJson(obj);
    }
}

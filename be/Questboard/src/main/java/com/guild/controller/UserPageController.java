package com.guild.controller;

import com.google.gson.Gson;
import com.guild.entity.Adventurer;
import com.guild.mapper.AdventurerMapper;
import com.guild.mapper.QuestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value ="/account")
public class UserPageController {

//    @Autowired
//    BcryptEncoder bcryptEncoder;

    @Autowired
    AdventurerMapper adventurerMapper;

    @Autowired
    QuestMapper questMapper;

    @RequestMapping(value = "/permit")
    public String permit() {
        return "permit";
    }

    @RequestMapping(value = "/adventurer/{adventureId}")
    public String adventurerById(@PathVariable("adventureId") int id) {
        return convert2Json(adventurerMapper.findAdventurerById(id));
    }

    @PostMapping(value = "/edit/{adventureId}")
    public String updateAdventurer(@PathVariable("adventureId") int id, @RequestBody Map<String, String> params) {
        Adventurer adventurer = adventurerMapper.findAdventurerById(id);
        System.out.println("edit: "+ convert2Json(params));
        String password = params.get("password");
        String name = params.get("name");
        String job = params.get("job");
        String status = params.get("status");

        password = new BCryptPasswordEncoder().encode(password);

        adventurer.setPassword(password);
        adventurer.setAname(name);
        adventurer.setJob(job);
        adventurer.setAstatus(status);

        adventurerMapper.updateAdAdventurer(adventurer);
        return "edit success";
    }

    @PostMapping(value ="/accept")
    public String accept(@RequestBody Map<String, Integer> params) {
        int requesteeId = params.get("requesteeId");
        int qid = params.get("qid");
        questMapper.acceptQuest(requesteeId, qid);

        return "accept success";
    }

    private String convert2Json (Object obj) {
        return new Gson().toJson(obj);
    }
}

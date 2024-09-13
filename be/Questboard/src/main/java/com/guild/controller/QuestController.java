package com.guild.controller;

import com.google.gson.Gson;
import com.guild.mapper.QuestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class QuestController {

    @Autowired
    private QuestMapper questMapper;

    @RequestMapping(value = "/quest/all")
    public String questList() {
        return convert2Json(questMapper.findAllQuests());
    }

    @RequestMapping(value = "/quest/{questId}")
    public String questById(@PathVariable("questId") int id) {
        return convert2Json(questMapper.findQuestById(id));
    }

    @RequestMapping(value = "/quest/adventurer/{adventurerId}")
    public String questListByAdventurerId(@PathVariable("adventurerId") int id) {
        return convert2Json(questMapper.findQuestListByAdventurerId(id));
    }

    @PostMapping(value = "/new")
    public String newQuest (@RequestBody  Map<String, String> params) {
        System.out.println("newQuest: "+ convert2Json(params));
        String title = params.get("title");
        String description = params.get("description");
        String requirements = params.get("requirements");
        String timeframe = params.get("timeframe");
        String exp = params.get("exp")==null ? "0" : params.get("exp");
        String rewards = params.get("rewards");
        String requester = params.get("requester");

        questMapper.insertQuest(title, description, requirements, timeframe, exp, rewards, requester);

        return "insert success";
    }

    private String convert2Json (Object obj) {
        return new Gson().toJson(obj);
    }

}

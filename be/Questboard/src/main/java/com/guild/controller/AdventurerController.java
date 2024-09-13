package com.guild.controller;

import com.google.gson.Gson;
import com.guild.mapper.AdventurerMapper;
import com.guild.mapper.QuestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/adventurer")
public class AdventurerController {

    @Autowired
    private AdventurerMapper adventurerMapper;
    @Autowired
    private QuestMapper questMapper;

    @RequestMapping(value = "/all")
    public String adventurerList() {
        return convert2Json(adventurerMapper.findAllAdventurers());
    }

    @RequestMapping(value = "/{adventurerId}")
    public String adventurerById(@PathVariable("adventurerId") int id) {
        return convert2Json(adventurerMapper.findAdventurerById(id));
    }

    @RequestMapping(value = "/{adventurerId}/quests")
    public String adventurerQuestById(@PathVariable("adventurerId") int id) {
        return convert2Json(questMapper.findQuestListByAdventurerId(id));
    }

    @RequestMapping(value = "/")
    public String findAdventurerByAccount(@RequestParam String account) {
        return convert2Json(adventurerMapper.findAdventurerByAccount(account));
    }

    private String convert2Json (Object obj) {
        return new Gson().toJson(obj);
    }
}

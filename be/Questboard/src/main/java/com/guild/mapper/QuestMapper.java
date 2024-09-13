package com.guild.mapper;

import com.guild.entity.Quest;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface QuestMapper {

    @Select("SELECT * FROM quest")
    @Results(id = "questwithAdventurer",
             value = {
                @Result(property = "qid", column = "qid", id = true),
                @Result(property = "title", column = "title"),
                @Result(property = "description", column = "description"),
                @Result(property = "requirements", column = "requirements"),
                @Result(property = "timeframe", column = "timeframe"),
                @Result(property = "exp", column = "exp"),
                @Result(property = "rewards", column = "rewards"),
                @Result(property = "status", column = "status"),
                @Result(property = "requester", column = "requester"),
                @Result(property = "requestee", column = "requesteeId", one = @One(select = "com.guild.mapper.AdventurerMapper.findAdventurerById")),
                @Result(property = "registeredTime", column = "registeredTime"),
                @Result(property = "modifiedTime", column = "modifiedTime")
             })
    List<Quest> findAllQuests();

    @Select("SELECT * FROM quest WHERE qid = #{id}")
    @ResultMap("questwithAdventurer")
    Quest findQuestById(int id);

    @Select("SELECT * FROM quest WHERE requesteeId = #{id}")
    @ResultMap("questwithAdventurer")
    List<Quest> findQuestListByAdventurerId(int id);

    @Insert("insert into quest(title, description, requirements, timeframe, exp, rewards, status, requester, registeredTime, modifiedTime)" +
            "value(#{title}, #{description}, #{requirements}, #{timeframe}, #{exp}, #{rewards}, '開放中', #{requester}, NOW(), NOW());")
    void insertQuest (String title, String description, String requirements, String timeframe, String exp, String rewards, String requester);

    @Update("UPDATE quest SET status='已承接', requesteeId=#{requesteeId}, modifiedTime=NOW() WHERE qid=#{qid};")
    void acceptQuest(int requesteeId, int qid);
}

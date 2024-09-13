package com.guild.mapper;

import com.guild.entity.Adventurer;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AdventurerMapper {

    @Select("SELECT * FROM adventurer")
    @Results(id = "adventurerwithSpecies",
            value = {
                    @Result(property = "aid", column = "aid", id = true),
                    @Result(property = "aname", column = "aname"),
                    @Result(property = "account", column = "account"),
                    @Result(property = "password", column = "password"),
                    @Result(property = "gender", column = "gender"),
                    @Result(property = "exp", column = "exp"),
                    @Result(property = "rank", column = "arank"),
                    @Result(property = "astatus", column = "astatus"),
                    @Result(property = "job", column = "job"),
                    @Result(property = "species", column = "speciesId", one = @One(select = "com.guild.mapper.SpeciesMapper.findSpeciesById")),
                    @Result(property = "role", column = "role"),
                    @Result(property = "registeredTime", column = "registeredTime"),
                    @Result(property = "modifiedTime", column = "modifiedTime")
            })
    List<Adventurer> findAllAdventurers();

    @Select("SELECT * FROM adventurer WHERE aid = #{id}")
    @ResultMap("adventurerwithSpecies")
    Adventurer findAdventurerById(int id);

    @Select("SELECT * FROM adventurer WHERE account = #{account}")
    @ResultMap("adventurerwithSpecies")
    Adventurer findAdventurerByAccount(String account);

    @Insert("insert into adventurer(aname, account, password, gender, job, astatus, exp, registeredTime, modifiedTime, speciesId, role) " +
            "value(#{name}, #{account}, #{password}, #{gender}, #{job}, #{astatus}, 0, NOW(), NOW(), #{speciesId}, 'USER')")
    void insertAdAdventurer (String name, String account, String password, String gender, String job, String astatus, int speciesId);

    @Update("UPDATE adventurer SET aname=#{aname}, password=#{password}, job=#{job}, astatus=#{astatus}, modifiedTime=NOW() WHERE aid=#{aid}")
    void updateAdAdventurer (Adventurer adventurer);
}

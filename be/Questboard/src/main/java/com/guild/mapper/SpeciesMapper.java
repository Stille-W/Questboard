package com.guild.mapper;

import com.guild.entity.Species;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface SpeciesMapper {

    @Select("SELECT * FROM species")
    List<Species> findAllSpecies();

    @Select("SELECT * FROM species WHERE sid = #{id}")
    Species findSpeciesById(int id);
}

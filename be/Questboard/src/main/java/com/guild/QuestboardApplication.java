package com.guild;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.guild.mapper")
public class QuestboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestboardApplication.class, args);
	}

}

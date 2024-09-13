package com.guild.config;

import com.guild.entity.Adventurer;
import com.guild.mapper.AdventurerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class AccountUserDetail implements UserDetailsService {

    @Autowired
    private AdventurerMapper adventurerMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Adventurer> optAdventurer = Optional.ofNullable(adventurerMapper.findAdventurerByAccount(username));
        System.out.println("UserDetails:"+username);
        optAdventurer.orElseThrow(
                () -> new UsernameNotFoundException("Username not found")
        );
        Adventurer adventurer = optAdventurer.get();
        List<GrantedAuthority> auths = Arrays.stream(adventurer.getRole().split(","))
                .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        UserDetails userDetails = new User(adventurer.getAccount(), adventurer.getPassword(), true,
                true, true, true, auths);
        return userDetails;
    }
}

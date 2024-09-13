package com.guild.config;

import com.guild.filter.JwtCheckFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    AuthenticationManager authenticationManager;
    @Autowired
    private AccountUserDetail accountUserDetail;

    @Autowired
    private JwtCheckFilter jwtCheckFilter;

//    @Autowired
//    CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

    @Bean
    PasswordEncoder password() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(accountUserDetail).passwordEncoder(password());
//        authenticationManager = authenticationManagerBuilder.build();

//        HeaderWriterLogoutHandler clearSiteData = new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(ClearSiteDataHeaderWriter.Directive.COOKIES));

        http.csrf(c -> c.disable())
            .authorizeHttpRequests(auth ->
                auth.requestMatchers("/", "/error", "/new", "/register", "/quest/**","/adventurer/**").permitAll().anyRequest().authenticated())
//            .authenticationManager(authenticationManager)
            .formLogin(fl -> fl.loginPage("/login").successForwardUrl("/jwt")
                    .failureForwardUrl("/error")
                    .permitAll()
//                    .failureHandler(customAuthenticationFailureHandler)
            )
//            .formLogin(withDefaults())
            .logout(out -> out.invalidateHttpSession(true).clearAuthentication(true).deleteCookies("JSESSIONID")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/").permitAll())
            .addFilterBefore(jwtCheckFilter, AnonymousAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

//    public AuthenticationProvider authProvider() {
//        DaoAuthenticationProvider impl = new DaoAuthenticationProvider();
//        impl.setUserDetailsService(accountUserDetail);
//        impl.setPasswordEncoder(password());
//        // setHideUserNotFoundExceptions is set to false in order to get the exceptions CustomAuthenticationFailureHandler
//        impl.setHideUserNotFoundExceptions(false);
//        return impl;
//    }

//    @Bean
//    public AuthenticationManager configure (HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(accountUserDetail)
//                .passwordEncoder(bCryptPasswordEncoder).and().build();
//    }
}

package com.moviebooking.showspot.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                Arrays.asList(
                       "http://localhost:5174/"
                )
        );

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                Arrays.asList(
                        "Authorization",
                        "Content-Type"
                )
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> {

                    auth.requestMatchers(
                            HttpMethod.OPTIONS,
                            "/**"
                    ).permitAll();

                    auth.requestMatchers(
                            "/user/register",
                            "/user/login",
                            "/auth/login"
                    ).permitAll();

                    auth.requestMatchers(
                            "/movie/getAll",
                            "/movie/get/**"
                    ).hasAnyRole("USER", "ADMIN");

                    auth.requestMatchers(
                            "/movie-show/getAll",
                            "/movie-show/get/**"
                    ).hasAnyRole("USER", "ADMIN");

                    auth.requestMatchers(
                            "/seat/show/**",
                            "/seat/screen/**"
                    ).hasAnyRole("USER", "ADMIN");

                    auth.requestMatchers(
                            "/seat/generate"
                    ).hasRole("ADMIN");

                    auth.requestMatchers(
                            "/movie-show/add"
                    ).hasRole("ADMIN");

                    auth.requestMatchers(
                            "/movie/**"
                    ).hasRole("ADMIN");

                    auth.requestMatchers(
                            "/theatre/**"
                    ).hasRole("ADMIN");

                    auth.requestMatchers(
                            "/screen/**"
                    ).hasRole("ADMIN");

                    auth.requestMatchers(
                            "/booking/**"
                    ).hasRole("USER");

                    auth.requestMatchers(
                            "/payment/**"
                    ).hasRole("USER");

                    auth.anyRequest().authenticated();
                })

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
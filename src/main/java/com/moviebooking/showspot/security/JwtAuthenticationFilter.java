package com.moviebooking.showspot.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("======================================");
        System.out.println(
                "REQUEST METHOD : " + request.getMethod()
        );
        System.out.println(
                "REQUEST URL    : " + request.getRequestURI()
        );


        // ==========================================
        // SKIP CORS PREFLIGHT REQUEST
        // ==========================================

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

            System.out.println(
                    "OPTIONS REQUEST - SKIPPING JWT"
            );

            filterChain.doFilter(request, response);

            return;
        }


        // ==========================================
        // GET AUTHORIZATION HEADER
        // ==========================================

        String authHeader =
                request.getHeader("Authorization");

        System.out.println(
                "AUTH HEADER EXISTS : "
                        + (authHeader != null)
        );


        String token = null;
        String email = null;


        // ==========================================
        // CHECK BEARER TOKEN
        // ==========================================

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            System.out.println(
                    "BEARER TOKEN FOUND"
            );


            try {

                // ----------------------------------
                // EXTRACT EMAIL
                // ----------------------------------

                email =
                        jwtUtil.extractEmail(token);

                System.out.println(
                        "EMAIL FROM TOKEN : "
                                + email
                );


            } catch (Exception e) {

                System.out.println(
                        "TOKEN EXTRACTION FAILED : "
                                + e.getMessage()
                );

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }
        }


        // ==========================================
        // AUTHENTICATE USER
        // ==========================================

        if (email != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

            try {

                // ----------------------------------
                // LOAD USER FROM DATABASE
                // ----------------------------------

                UserDetails userDetails =
                        customUserDetailsService
                                .loadUserByUsername(email);


                System.out.println(
                        "USER FOUND : "
                                + userDetails.getUsername()
                );


                System.out.println(
                        "USER AUTHORITIES : "
                                + userDetails.getAuthorities()
                );


                // ----------------------------------
                // VALIDATE TOKEN
                // ----------------------------------

                boolean validToken =
                        jwtUtil.validateToken(
                                token,
                                userDetails.getUsername()
                        );


                System.out.println(
                        "TOKEN VALID : "
                                + validToken
                );


                // ----------------------------------
                // SET AUTHENTICATION
                // ----------------------------------

                if (validToken) {

                    UsernamePasswordAuthenticationToken
                            authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );


                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authenticationToken
                            );


                    System.out.println(
                            "AUTHENTICATION SET SUCCESSFULLY"
                    );

                } else {

                    System.out.println(
                            "TOKEN IS INVALID"
                    );
                }


            } catch (Exception e) {

                System.out.println(
                        "AUTHENTICATION ERROR : "
                                + e.getMessage()
                );
            }
        }


        // ==========================================
        // FINAL AUTHENTICATION
        // ==========================================

        System.out.println(
                "FINAL AUTHENTICATION : "
                        + SecurityContextHolder
                        .getContext()
                        .getAuthentication()
        );

        System.out.println(
                "======================================"
        );


        // ==========================================
        // CONTINUE REQUEST
        // ==========================================

        filterChain.doFilter(
                request,
                response
        );
    }
}
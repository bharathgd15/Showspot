package com.moviebooking.showspot.service;

import com.moviebooking.showspot.dto.LoginResponseDTO;
import com.moviebooking.showspot.dto.UserLoginDTO;
import com.moviebooking.showspot.dto.UserRegisterDTO;
import com.moviebooking.showspot.entity.User;
import com.moviebooking.showspot.repository.UserRepository;
import com.moviebooking.showspot.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(UserRegisterDTO dto) {

        User existingUser =
                userRepository.findByEmail(dto.getEmail());

        if (existingUser != null) {

            return "Email already exists";
        }

        User user = new User();

        user.setFullName(
                dto.getFullName()
        );

        user.setEmail(
                dto.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()
                )
        );

        user.setRole("USER");

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponseDTO loginUser(
            UserLoginDTO dto) {

        User user =
                userRepository.findByEmail(
                        dto.getEmail()
                );

        if (user == null) {

            return new LoginResponseDTO(
                    "Invalid Email",
                    null,
                    null,
                    null,
                    null
            );
        }

        if (!passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword())) {

            return new LoginResponseDTO(
                    "Invalid Password",
                    null,
                    null,
                    null,
                    null
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        System.out.println(
                "======================================"
        );

        System.out.println(
                "LOGIN SUCCESSFUL"
        );

        System.out.println(
                "FULL NAME : "
                        + user.getFullName()
        );

        System.out.println(
                "EMAIL : "
                        + user.getEmail()
        );

        System.out.println(
                "ROLE : "
                        + user.getRole()
        );

        System.out.println(
                "TOKEN NULL? : "
                        + (token == null)
        );

        System.out.println(
                "======================================"
        );

        LoginResponseDTO response =
                new LoginResponseDTO(
                        "Login Successful",
                        token,
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole()
                );

        System.out.println(
                "RESPONSE TOKEN : "
                        + response.getToken()
        );

        System.out.println(
                "RESPONSE FULL NAME : "
                        + response.getFullName()
        );

        System.out.println(
                "RESPONSE ROLE : "
                        + response.getRole()
        );

        return response;
    }
}
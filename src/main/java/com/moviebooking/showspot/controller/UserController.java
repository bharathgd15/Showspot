package com.moviebooking.showspot.controller;

import com.moviebooking.showspot.dto.LoginResponseDTO;
import com.moviebooking.showspot.dto.UserLoginDTO;
import com.moviebooking.showspot.dto.UserRegisterDTO;
import com.moviebooking.showspot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Register User
    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegisterDTO dto) {
        return userService.registerUser(dto);
    }

    // Login User
    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody UserLoginDTO dto) {
        return userService.loginUser(dto);
    }
}
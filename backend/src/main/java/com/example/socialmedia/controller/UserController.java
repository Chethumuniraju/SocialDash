package com.example.socialmedia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.dto.UserDTO;
import com.example.socialmedia.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile() {
        // For demo purposes, we'll use a hardcoded username
        // In a real app, this would come from the authenticated user
        UserDTO user = userService.getUserProfile("testuser");
        return ResponseEntity.ok(user);
    }
}
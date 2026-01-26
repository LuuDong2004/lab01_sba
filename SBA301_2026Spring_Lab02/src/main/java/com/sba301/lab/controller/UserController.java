package com.sba301.lab.controller;

import com.sba301.lab.dto.UserDTO;
import com.sba301.lab.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User", description = "User management APIs")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(summary = "Create a new user")
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        UserDTO created = userService.create(userDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDTO>> getAll() {
        List<UserDTO> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{username}")
    @Operation(summary = "Get user by username")
    public ResponseEntity<UserDTO> getByUsername(@PathVariable String username) {
        UserDTO user = userService.getByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{username}")
    @Operation(summary = "Update user")
    public ResponseEntity<UserDTO> update(@PathVariable String username, @RequestBody UserDTO userDTO) {
        UserDTO updated = userService.update(username, userDTO);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{username}")
    @Operation(summary = "Delete user")
    public ResponseEntity<Void> delete(@PathVariable String username) {
        boolean deleted = userService.delete(username);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/login")
    @Operation(summary = "Find user by username and password")
    public ResponseEntity<UserDTO> login(@RequestParam String username, @RequestParam String password) {
        UserDTO user = userService.findByUsernameAndPassword(username, password);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
}
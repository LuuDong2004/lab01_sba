package com.sba301.lab.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lab_users")
public class User {
    @Id
    @Column(name = "username", length =  100, nullable = false, unique = true)
    private String username;
    @Column(name = "password", length = 100, nullable = false)
    private String password;
    @Column(name = "role", length = 30, nullable = false)
    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}

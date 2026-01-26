package com.sba301.lab.config;

import com.sba301.lab.entity.User;
import com.sba301.lab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            createUser("admin", "password123", "ADMIN");
            createUser("manager", "password123", "MANAGER");
            createUser("user1", "password123", "USER");
            createUser("user2", "password123", "USER");
            createUser("user3", "password123", "USER");
            createUser("user4", "password123", "USER");
            createUser("user5", "password123", "USER");
            createUser("user6", "password123", "USER");
            createUser("user7", "password123", "USER");
            createUser("user8", "password123", "USER");
        }
    }

    private void createUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        userRepository.save(user);
    }
}
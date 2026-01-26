package com.sba301.lab.service.impl;

import com.sba301.lab.dto.UserDTO;
import com.sba301.lab.entity.User;
import com.sba301.lab.repository.UserRepository;
import com.sba301.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO create(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        User saved = userRepository.save(user);
        return convertToDTO(saved);
    }

    @Override
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getByUsername(String username) {
        User user = userRepository.findById(username).orElse(null);
        return user != null ? convertToDTO(user) : null;
    }

    @Override
    public UserDTO update(String username, UserDTO userDTO) {
        if (userRepository.existsById(username)) {
            userDTO.setUsername(username);
            User user = convertToEntity(userDTO);
            User updated = userRepository.save(user);
            return convertToDTO(updated);
        }
        return null;
    }

    @Override
    public boolean delete(String username) {
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
            return true;
        }
        return false;
    }

    @Override
    public UserDTO findByUsernameAndPassword(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password).orElse(null);
        return user != null ? convertToDTO(user) : null;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        return dto;
    }

    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
        return user;
    }
}
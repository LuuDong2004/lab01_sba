package com.sba301.lab.service;

import com.sba301.lab.dto.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO create(UserDTO userDTO);
    List<UserDTO> getAll();
    UserDTO getByUsername(String username);
    UserDTO update(String username, UserDTO userDTO);
    boolean delete(String username);
    UserDTO findByUsernameAndPassword(String username, String password);
}
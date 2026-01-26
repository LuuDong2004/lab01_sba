package com.sba301.lab.service;

import com.sba301.lab.dto.FoodDTO;

import java.util.List;

public interface FoodService {
    FoodDTO create(FoodDTO foodDTO);
    List<FoodDTO> getAll();
    FoodDTO getById(Long id);
    FoodDTO update(Long id, FoodDTO foodDTO);
    boolean delete(Long id);
    List<FoodDTO> searchByName(String name);
    List<FoodDTO> searchByCategory(Long categoryId);
    List<FoodDTO> searchByNameAndCategory(String name, Long categoryId);
}
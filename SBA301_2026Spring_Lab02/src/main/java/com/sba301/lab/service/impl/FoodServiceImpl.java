package com.sba301.lab.service.impl;

import com.sba301.lab.dto.FoodDTO;
import com.sba301.lab.entity.Category;
import com.sba301.lab.entity.Food;
import com.sba301.lab.repository.CategoryRepository;
import com.sba301.lab.repository.FoodRepository;
import com.sba301.lab.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public FoodDTO create(FoodDTO foodDTO) {
        Food food = convertToEntity(foodDTO);
        Food saved = foodRepository.save(food);
        return convertToDTO(saved);
    }

    @Override
    public List<FoodDTO> getAll() {
        return foodRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FoodDTO getById(Long id) {
        Food food = foodRepository.findById(id).orElse(null);
        return food != null ? convertToDTO(food) : null;
    }

    @Override
    public FoodDTO update(Long id, FoodDTO foodDTO) {
        if (foodRepository.existsById(id)) {
            foodDTO.setId(id);
            Food food = convertToEntity(foodDTO);
            Food updated = foodRepository.save(food);
            return convertToDTO(updated);
        }
        return null;
    }

    @Override
    public boolean delete(Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<FoodDTO> searchByName(String name) {
        return foodRepository.findByFoodNameContainingIgnoreCase(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodDTO> searchByCategory(Long categoryId) {
        return foodRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodDTO> searchByNameAndCategory(String name, Long categoryId) {
        return foodRepository.findByNameAndCategory(name, categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private FoodDTO convertToDTO(Food food) {
        FoodDTO dto = new FoodDTO();
        dto.setId(food.getId());
        dto.setCode(food.getCode());
        dto.setFoodName(food.getFoodName());
        dto.setPrice(food.getPrice());
        dto.setStock(food.getStock());
        dto.setExpiredDate(food.getExpiredDate());
        dto.setManufacturer(food.getManufacturer());
        if (food.getCategory() != null) {
            dto.setCategoryId(food.getCategory().getId());
            dto.setCategoryName(food.getCategory().getCategoryName());
        }
        return dto;
    }

    private Food convertToEntity(FoodDTO dto) {
        Food food = new Food();
        food.setId(dto.getId());
        food.setCode(dto.getCode());
        food.setFoodName(dto.getFoodName());
        food.setPrice(dto.getPrice());
        food.setStock(dto.getStock());
        food.setExpiredDate(dto.getExpiredDate());
        food.setManufacturer(dto.getManufacturer());
        if (dto.getCategoryId() > 0) {
            Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
            food.setCategory(category);
        }
        return food;
    }
}
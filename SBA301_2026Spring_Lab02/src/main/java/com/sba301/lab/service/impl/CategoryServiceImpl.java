package com.sba301.lab.service.impl;

import com.sba301.lab.dto.CategoryDTO;
import com.sba301.lab.entity.Category;
import com.sba301.lab.repository.CategoryRepository;
import com.sba301.lab.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        Category saved = categoryRepository.save(category);
        return convertToDTO(saved);
    }

    @Override
    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return category != null ? convertToDTO(category) : null;
    }

    @Override
    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
        if (categoryRepository.existsById(id)) {
            categoryDTO.setId(id);
            Category category = convertToEntity(categoryDTO);
            Category updated = categoryRepository.save(category);
            return convertToDTO(updated);
        }
        return null;
    }

    @Override
    public boolean delete(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setCategoryName(category.getCategoryName());
        return dto;
    }

    private Category convertToEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setCategoryName(dto.getCategoryName());
        return category;
    }
}
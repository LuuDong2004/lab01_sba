package com.sba301.lab.service;

import com.sba301.lab.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO create(CategoryDTO categoryDTO);
    List<CategoryDTO> getAll();
    CategoryDTO getById(Long id);
    CategoryDTO update(Long id, CategoryDTO categoryDTO);
    boolean delete(Long id);
}
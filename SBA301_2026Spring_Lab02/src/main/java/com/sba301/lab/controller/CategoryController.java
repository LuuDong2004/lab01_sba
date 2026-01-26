package com.sba301.lab.controller;

import com.sba301.lab.dto.CategoryDTO;
import com.sba301.lab.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Tag(name = "Category", description = "Category management APIs")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    @Operation(summary = "Create a new category")
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO created = categoryService.create(categoryDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    @Operation(summary = "Get all categories")
    public ResponseEntity<List<CategoryDTO>> getAll() {
        List<CategoryDTO> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id) {
        CategoryDTO category = categoryService.getById(id);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update category")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updated = categoryService.update(id, categoryDTO);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete category")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = categoryService.delete(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
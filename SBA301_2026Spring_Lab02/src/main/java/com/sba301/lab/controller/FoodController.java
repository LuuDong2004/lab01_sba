package com.sba301.lab.controller;

import com.sba301.lab.dto.FoodDTO;
import com.sba301.lab.service.FoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@Tag(name = "Food", description = "Food management APIs")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping
    @Operation(summary = "Create a new food item")
    public ResponseEntity<FoodDTO> create(@RequestBody FoodDTO foodDTO) {
        FoodDTO created = foodService.create(foodDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    @Operation(summary = "Get all food items")
    public ResponseEntity<List<FoodDTO>> getAll() {
        List<FoodDTO> foods = foodService.getAll();
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get food item by ID")
    public ResponseEntity<FoodDTO> getById(@PathVariable Long id) {
        FoodDTO food = foodService.getById(id);
        return food != null ? ResponseEntity.ok(food) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update food item")
    public ResponseEntity<FoodDTO> update(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        FoodDTO updated = foodService.update(id, foodDTO);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete food item")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = foodService.delete(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search food items by name")
    public ResponseEntity<List<FoodDTO>> searchByName(@RequestParam String name) {
        List<FoodDTO> foods = foodService.searchByName(name);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get food items by category")
    public ResponseEntity<List<FoodDTO>> searchByCategory(@PathVariable Long categoryId) {
        List<FoodDTO> foods = foodService.searchByCategory(categoryId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/search/category")
    @Operation(summary = "Search food items by name and category")
    public ResponseEntity<List<FoodDTO>> searchByNameAndCategory(
            @RequestParam String name, @RequestParam Long categoryId) {
        List<FoodDTO> foods = foodService.searchByNameAndCategory(name, categoryId);
        return ResponseEntity.ok(foods);
    }
}
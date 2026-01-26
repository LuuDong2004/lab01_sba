package com.sba301.lab.repository;

import com.sba301.lab.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByFoodNameContainingIgnoreCase(String name);
    List<Food> findByCategoryId(Long categoryId);
    
    @Query("SELECT f FROM Food f WHERE LOWER(f.foodName) LIKE LOWER(CONCAT('%', :name, '%')) AND f.category.id = :categoryId")
    List<Food> findByNameAndCategory(@Param("name") String name, @Param("categoryId") Long categoryId);
}
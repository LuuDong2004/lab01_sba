package com.sba301.lab.config;

import com.sba301.lab.entity.Category;
import com.sba301.lab.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CategoryDataInitializer implements CommandLineRunner {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            Category fruits = new Category();
            fruits.setCategoryName("Fruits");
            categoryRepository.save(fruits);

            Category vegetables = new Category();
            vegetables.setCategoryName("Vegetables");
            categoryRepository.save(vegetables);

            Category dairy = new Category();
            dairy.setCategoryName("Dairy");
            categoryRepository.save(dairy);

            Category meat = new Category();
            meat.setCategoryName("Meat");
            categoryRepository.save(meat);

            Category grains = new Category();
            grains.setCategoryName("Grains");
            categoryRepository.save(grains);
        }
    }
}
package com.sba301.lab.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "category_id")
    private long id;
    @jakarta.persistence.Column(name = "category_name", nullable = false, length = 100, columnDefinition = "nvarchar(100)")
    private String categoryName;
    @OneToMany(mappedBy = "category",
            cascade = CascadeType.ALL)
    private Set<Food> foods;

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public Set<Food> getFoods() { return foods; }
    public void setFoods(Set<Food> foods) { this.foods = foods; }
}

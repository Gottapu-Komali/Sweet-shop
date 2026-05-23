package com.seetaiah.sweets.controller;

import com.seetaiah.sweets.model.Product;
import com.seetaiah.sweets.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/type/{type}")
    public List<Product> getProductsByType(@PathVariable String type) {
        return productRepository.findByType(type.toUpperCase());
    }
}

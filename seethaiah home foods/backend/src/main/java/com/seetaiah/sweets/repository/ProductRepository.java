package com.seetaiah.sweets.repository;

import com.seetaiah.sweets.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByType(String type);
}

package com.tienda.backend;

import com.tienda.backend.model.Product;
import com.tienda.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.util.Arrays;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initProducts(ProductRepository productRepository) {
		return args -> {
			if (productRepository.count() == 0) {
				Product p1 = new Product("1", "iPhone 15 Pro", "Smartphone premium con chip A17 Pro, cámara de 48MP y diseño en titanio. Experiencia fotográfica profesional.", 1199.99, "Smartphones", "/artifacts/iphone_15_pro_1769012287496.png", 4.8, 15, Arrays.asList("256GB", "Titanio Azul", "5G", "Chip A17 Pro"));
				Product p2 = new Product("2", "Samsung Galaxy S24 Ultra", "Smartphone con S Pen integrado, pantalla AMOLED 2X y cámara de 200MP. La productividad perfecta.", 1099.99, "Smartphones", "/artifacts/samsung_s24_ultra_1769012318568.png", 4.7, 12, Arrays.asList("512GB", "Titanio Gris", "5G", "S Pen incluido"));
				Product p3 = new Product("3", "Google Pixel 8 Pro", "Android puro con IA avanzada de Google. Fotografía computacional de última generación.", 899.99, "Smartphones", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop", 4.6, 20, Arrays.asList("128GB", "Obsidian", "5G", "Google Tensor G3"));
				Product p4 = new Product("4", "MacBook Pro M3", "Laptop profesional con chip M3, pantalla Liquid Retina XDR y hasta 22 horas de batería.", 2499.99, "Laptops", "/artifacts/macbook_pro_m3_1769012351697.png", 4.9, 8, Arrays.asList("16GB RAM", "512GB SSD", "M3 Pro", "14.2\""));
				Product p5 = new Product("5", "Dell XPS 15", "Potencia Windows con pantalla InfinityEdge 4K y diseño ultradelgado en aluminio premium.", 1799.99, "Laptops", "/artifacts/dell_xps_15_1769012382381.png", 4.5, 10, Arrays.asList("32GB RAM", "1TB SSD", "Intel i9", "15.6\" 4K"));
				
				productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5));
			}
		};
	}
}

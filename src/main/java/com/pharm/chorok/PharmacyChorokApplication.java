package com.pharm.chorok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PharmacyChorokApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharmacyChorokApplication.class, args);
	}

}

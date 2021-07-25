package com.pharm.chorok.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JeasyuiController {

	@RequestMapping("/example/validate-form")
	public String form() {
		
		return "example/validate-form";
	}
	
	@RequestMapping("/example/md-table")
	public String mdtable() {
		
		return "example/md-table";
	}

	@RequestMapping("/example/title-window")
	public String titleWindow() {
		
		return "example/title-window";
	}

}

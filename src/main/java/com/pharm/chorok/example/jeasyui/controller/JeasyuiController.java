package com.pharm.chorok.example.jeasyui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JeasyuiController {

	@RequestMapping("/example/jeasyui/validate-form")
	public String form() {
		
		return "example/jeasyui/validate-form";
	}
	
	@RequestMapping("/example/jeasyui/md-table")
	public String mdtable() {
		
		return "example/jeasyui/md-table";
	}
}

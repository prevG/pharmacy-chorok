package com.pharm.chorok.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SendSmsController {

	@RequestMapping("/example/sms-test")
	public String sms() {
		
		return "example/sms-test";
	}
	
}

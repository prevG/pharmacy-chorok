package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.web.main.service.CommUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/account")
@Controller
public class AccountController {

	@Autowired
	private CommUserDetailsService userService;

	// 로그인 페이지
	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

	// 회원가입 페이지
	@GetMapping("/signup")
	public String signup() {
		return "account/signup";
	}

	// 회원가입 처리
	@PostMapping("/signupProc")
	public String signupProc() {
		userService.joinUser();
		return "redirect:/account/login";
	}

	// 로그아웃 결과 페이지
	@GetMapping("/logout")
	public String logout() {
		return "account/logout";
	}
}

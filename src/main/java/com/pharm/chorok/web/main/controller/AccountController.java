package com.pharm.chorok.web.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pharm.chorok.web.main.service.UserService;

@RequestMapping(value = "/account")
@Controller
public class AccountController {
	
	@Autowired
	private UserService userService;

	// 로그인 페이지
	@GetMapping("/login")
	public String login(Model model) {
		return "account/loginPage";
	}

    // 회원가입 페이지
    @GetMapping("/signup")
    public String signup() {
        return "account/signupPage";
    }

    // 회원가입 처리
    @PostMapping("/signupProc")
    public String signupProc() {
    	userService.joinUser();
        return "redirect:/account/loginPage";
    }
    
    // 로그아웃 결과 페이지
    @GetMapping("/logout")
    public String logout() {
        return "account/logoutPage";
    }

    // 접근 거부 페이지
    @GetMapping("/user/denied")
    public String denied() {
        return "account/loginPage";
    }
}

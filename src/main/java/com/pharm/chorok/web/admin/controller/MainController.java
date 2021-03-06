package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.LomboTest;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.service.UserService;

@RequestMapping(value = "/admin")
@Controller("admin")
public class MainController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/index")
	public ModelAndView index( Model model ) throws Exception {
		
		ArrayList<TbCommUser> usrList = userService.getUserList();
	
		Map data = new HashMap<>();
		
		data.put("usrList", usrList );
		data.put("usr","곽경준");
		ModelAndView mv = new ModelAndView();
		mv.addAllObjects(data);
		mv.setViewName("/admin/index");
		
		
		return mv;
	}
	
	
	@GetMapping("/adminPage")
	public ModelAndView adminPage( Model model ) throws Exception {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/admin-page");
		
		
		return mv;
	}
}

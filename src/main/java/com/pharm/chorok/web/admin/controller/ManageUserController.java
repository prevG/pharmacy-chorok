package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.service.UserService;

@RequestMapping(value = "/admin")
@Controller
public class ManageUserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/manageUser")
	public String goManageUser( Model model ) throws Exception {
		
		Logger logger = LoggerFactory.getLogger(ManageUserController.class);
		
		logger.error("kkj");
		
		ArrayList<TbCommUser> usrList = userService.getUserList();
		model.addAttribute("usrList", usrList );
		return "/admin/userList";
	}
}

package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.service.UserService;

@Controller
public class ManageUserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/manageUser")
	public String goManageUser( Model model ) throws Exception {
		
		ArrayList<TbCommUser> usrList = userService.getUserList();
		model.addAttribute("usrList", usrList );
		return "/admin/userList";
	}
}

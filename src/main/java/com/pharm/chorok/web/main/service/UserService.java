package com.pharm.chorok.web.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.repository.TbCommUserRepository;

@Service
public class UserService {

	@Autowired
	private TbCommUserRepository comUsrRepo;

	// 이곳의 모든 메서드를 CommUserDetailsService로 모든 내용 이동
}

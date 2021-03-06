package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommCode;

@Mapper
@Repository
public interface ADMenuRepository {

	public ArrayList<TbCommCode> selectUsers(String grpCd);
	
	public ArrayList<TbCommCode> selectAdmins(String grpCd);
	
}


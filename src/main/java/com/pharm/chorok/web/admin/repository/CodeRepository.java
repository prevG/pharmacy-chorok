package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbCommUser;

@Mapper
@Repository
public interface CodeRepository {

	public ArrayList<TbCommCode> selectCommCode(String grpCd);
	
}


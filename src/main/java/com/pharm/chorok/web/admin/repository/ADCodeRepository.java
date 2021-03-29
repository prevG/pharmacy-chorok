package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommCode;

@Mapper
@Repository
public interface ADCodeRepository {

	public ArrayList<TbCommCode> selectCodesByGroupCd(TbCommCode tbCommCode);
	
	
	
	public ArrayList<TbCommCode> selectGrpCd();
	
	
	
}


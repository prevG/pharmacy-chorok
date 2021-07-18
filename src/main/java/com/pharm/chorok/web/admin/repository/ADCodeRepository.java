package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommCode;

@Mapper
@Repository
public interface ADCodeRepository {

	/**
	 * @deprecated selectCodesByGroupCd_2 함수래 대체함.
	 * 
	 * @param tbCommCode
	 * @return
	 */
	public ArrayList<TbCommCode> selectCodesByGroupCd(TbCommCode tbCommCode);
	
	public List<TbCommCode> selectCodesByGroupCd_2(TbCommCode tbCommCode);
	
	public ArrayList<TbCommCode> selectCodes(TbCommCode tbCommCode);
	
	public ArrayList<TbCommCode> selectAbbrCodes(TbCommCode tbCommCode);
	
	
	
	public int saveCode(TbCommCode tbCommCode);
	
	public int removeCode(TbCommCode tbCommCode);
	
}


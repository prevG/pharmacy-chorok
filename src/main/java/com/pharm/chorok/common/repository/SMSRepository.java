package com.pharm.chorok.common.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbPpSmsHist;

@Mapper
@Repository
public interface SMSRepository {
	
	public int insertSmsHist(TbPpSmsHist tbPpSmsHist);
	
}

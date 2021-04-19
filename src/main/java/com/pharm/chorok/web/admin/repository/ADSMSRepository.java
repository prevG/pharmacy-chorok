package com.pharm.chorok.web.admin.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.pharm.chorok.domain.table.TbSmsMsg;

@Mapper
@Repository
public interface ADSMSRepository {

	public TbSmsMsg selectSmsMsg(TbSmsMsg tbSmsMsg);
	
}


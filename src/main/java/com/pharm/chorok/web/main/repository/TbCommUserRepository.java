package com.pharm.chorok.web.main.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommUser;

@Mapper
@Repository
public interface TbCommUserRepository {

	public TbCommUser selectComUsrByUsrEml( String usrEml );
}


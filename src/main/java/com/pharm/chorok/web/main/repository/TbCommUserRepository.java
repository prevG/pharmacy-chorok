package com.pharm.chorok.web.main.repository;

import java.util.List;
import java.util.Map;

import com.pharm.chorok.domain.table.TbCommUser;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TbCommUserRepository {

	public TbCommUser selectComUsrByUsrEml( String usrEml );

	public List<TbCommUser> getUserList( Map<String, Object> params );

	public List<TbCommUser> selectCommUsersByUsrAuth( TbCommUser inTbCommUser );
}


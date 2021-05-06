package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;

@Mapper
@Repository
public interface ADUserRepository {

	public ArrayList<TbCustomer> selectUsers(TbCustomer tbCustomer);
}


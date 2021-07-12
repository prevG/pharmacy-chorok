package com.pharm.chorok.web.admin.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCustomer;

@Mapper
@Repository
public interface ADUserRepository {

	public List<TbCustomer> selectUsers(TbCustomer tbCustomer);

	public int addUser(TbCustomer tbCustomer);

	public int modifyUser(TbCustomer tbCustomer);

	public int removeUser(TbCustomer tbCustomer);

	public int countUserCellNo(TbCustomer tbCustomer);

	public int countUserCellNoByExcludeCustId(TbCustomer tbCustomer);

	public TbCustomer findCustomerByCustId(long custId);

}


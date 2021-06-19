package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommUser;

@Mapper
@Repository
public interface ADAdminRepository {

	public ArrayList<TbCommUser> selectAdmin(TbCommUser tbCommUser);
	
	public int addAdmin(TbCommUser tbCommUser);

	public int modifyAdmin(TbCommUser tbCommUser);
	
	public int modifyAdminPwd(TbCommUser tbCommUser);

	public int removeAdmin(TbCommUser tbCommUser);
	
	public int countAdminEmail(TbCommUser tbCommUser);

	public int countAdminPhone(TbCommUser tbCommUser);

	public int countAdminEmailByExcludeUsrNo(TbCommUser tbCommUser);

	public int countAdminPhoneByExcludeUsrNo(TbCommUser tbCommUser);

}


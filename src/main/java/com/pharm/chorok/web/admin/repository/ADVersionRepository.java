package com.pharm.chorok.web.admin.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCommVer;

@Mapper
@Repository
public interface ADVersionRepository {

	public ArrayList<TbCommVer> selectVersions(TbCommVer tbCommVer);
	
}


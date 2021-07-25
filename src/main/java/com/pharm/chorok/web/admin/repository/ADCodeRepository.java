package com.pharm.chorok.web.admin.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.main.TbCommCodeVo;

@Mapper
@Repository
public interface ADCodeRepository {

	public List<TbCommCodeVo> selectCodes(TbCommCodeVo tbCommCodeVo);
	
	public List<TbCommCodeVo> selectCodesByGrpCd(TbCommCodeVo tbCommCodeVo);
	
	public List<TbCommCodeVo> selectAbbrGrpCodes();

}


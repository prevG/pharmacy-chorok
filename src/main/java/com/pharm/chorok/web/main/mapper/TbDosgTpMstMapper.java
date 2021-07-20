package com.pharm.chorok.web.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pharm.chorok.domain.main.DosgTpSmsVo;

/**
 * 복용유형 마스터 쿼리 맵퍼 인터체이스
 * 
 * @author Jaratus
 *
 */
@Mapper
public interface TbDosgTpMstMapper {

	public List<DosgTpSmsVo> selectTbDosgTpMstList(DosgTpSmsVo dosgTpVo);

	public long getNextSmsId();

	public void insertDosgTpSms(DosgTpSmsVo criteria);

	public void modifyDosgTpSms(DosgTpSmsVo criteria);
	
}

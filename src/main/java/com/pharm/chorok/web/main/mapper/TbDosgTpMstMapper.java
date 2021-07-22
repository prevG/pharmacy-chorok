package com.pharm.chorok.web.main.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pharm.chorok.domain.main.DosgTpSmsVo;
import com.pharm.chorok.domain.main.ResultDosgTpSmsHistVo;

/**
 * 복용유형 마스터 쿼리 맵퍼 인터체이스
 * 
 * @author Jaratus
 *
 */
@Mapper
public interface TbDosgTpMstMapper {

	public List<DosgTpSmsVo> selectTbDosgTpMstList(DosgTpSmsVo dosgTpVo);

	/**
	 * 복용유형 발송문자 이력 조회
	 * 
	 * @param params
	 * @return
	 */
	public List<ResultDosgTpSmsHistVo> selectDosgTpSmsHistList(HashMap<String, Object> params);
	
}

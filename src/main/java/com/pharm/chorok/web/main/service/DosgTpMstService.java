package com.pharm.chorok.web.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.main.DosgTpSmsVo;
import com.pharm.chorok.web.main.mapper.TbDosgTpMstMapper;

/**
 * 복용유형 마스터 처리 로직 클래스
 * 
 * @author Jaratus
 *
 */
@Service
@Transactional
public class DosgTpMstService {
	
	@Autowired
	public TbDosgTpMstMapper tbDosgTpMstMapper;

	/**
	 * 복용유형 마스터 목록 조회 함수
	 * 
	 * @return
	 */
	public List<DosgTpSmsVo> selectTbDosgMstList(DosgTpSmsVo dosgTpVo) {
		return tbDosgTpMstMapper.selectTbDosgTpMstList(dosgTpVo);
	}

	public void addDosgTpSms(DosgTpSmsVo criteria) {
		
		long getNextSmsId = tbDosgTpMstMapper.getNextSmsId();
		
		criteria.setSmsId(getNextSmsId);
		tbDosgTpMstMapper.insertDosgTpSms(criteria);
	}

	public void modifyDosgTpSms(DosgTpSmsVo criteria) {
		tbDosgTpMstMapper.modifyDosgTpSms(criteria);
	}
	
}

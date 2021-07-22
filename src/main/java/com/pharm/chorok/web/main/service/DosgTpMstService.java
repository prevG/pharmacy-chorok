package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.main.DosgTpSmsVo;
import com.pharm.chorok.domain.main.ResultDosgTpSmsHistVo;
import com.pharm.chorok.domain.repository.TbDosgTpSmsRepository;
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
	private TbDosgTpMstMapper tbDosgTpMstMapper;
	
	@Autowired
	private TbDosgTpSmsRepository tbDosgTpSmsRepository;

	/**
	 * 복용유형 마스터 목록 조회 함수
	 * 
	 * @return
	 */
	public List<DosgTpSmsVo> selectTbDosgMstList(DosgTpSmsVo dosgTpVo) {
		return tbDosgTpMstMapper.selectTbDosgTpMstList(dosgTpVo);
	}

	public void addDosgTpSms(DosgTpSmsVo criteria) {
		
		tbDosgTpSmsRepository.save(criteria.toEntity());
	}

	public void modifyDosgTpSms(DosgTpSmsVo criteria) {
		tbDosgTpSmsRepository.save(criteria.toEntity());
	}

	public void removeDosgTpSms(DosgTpSmsVo criteria) {
		tbDosgTpSmsRepository.delete(criteria.toEntity());
	}

	public long existDosgTpSms(String dosgTpCd, int dosgSeq, String sendHhmi) {
		return tbDosgTpSmsRepository.countByDosgTpCdAndDosgSeqAndSendHhmi(dosgTpCd, dosgSeq, sendHhmi);
	}

	public List<ResultDosgTpSmsHistVo> selectDosgTpSmsHistList(HashMap<String, Object> params) {
		return tbDosgTpMstMapper.selectDosgTpSmsHistList(params);
	}
	
}

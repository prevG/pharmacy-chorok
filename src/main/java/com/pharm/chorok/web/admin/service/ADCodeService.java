package com.pharm.chorok.web.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.main.TbCommCodeVo;
import com.pharm.chorok.domain.repository.TbCommCodeRepository;
import com.pharm.chorok.web.admin.repository.ADCodeRepository;

@Service
public class ADCodeService {

	@Autowired
	private ADCodeRepository ADCodeMapper;
	
	@Autowired
	private TbCommCodeRepository tbCommCodeRepository;

    public List<TbCommCodeVo> selectCodes(TbCommCodeVo tbCommCodeVo) {
    	return ADCodeMapper.selectCodes(tbCommCodeVo);
    }
    
	public List<TbCommCodeVo> selectCodesByGrpCd(TbCommCodeVo tbCommCodeVo) {
		return ADCodeMapper.selectCodesByGrpCd(tbCommCodeVo);
	}

    public List<TbCommCodeVo> selectAbbrGrpCodes() {
    	return ADCodeMapper.selectAbbrGrpCodes();
    }

}
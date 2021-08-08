package com.pharm.chorok.web.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.entity.TbPpCnstMile;
import com.pharm.chorok.domain.main.TbPpCnstMileVo;
import com.pharm.chorok.domain.repository.TbPpCnstMileRepository;

@Service
public class ConsultingMileageService {

	@Autowired
	private TbPpCnstMileRepository tbPpCnstMileRepository;
	
	@Transactional
	public TbPpCnstMileVo findByCnstId(long cnstId) {
		Optional<TbPpCnstMile> optional = tbPpCnstMileRepository.findById(cnstId);
		if (optional.isPresent())
			return new TbPpCnstMileVo(optional.get());
		
		return null;
	}

	public void saveCnstMile(TbPpCnstMileVo cnstMileVo) {
		tbPpCnstMileRepository.save(cnstMileVo.toEntity());
	}
	
}

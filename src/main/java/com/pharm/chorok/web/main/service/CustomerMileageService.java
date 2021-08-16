package com.pharm.chorok.web.main.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.entity.TbCustomerMile;
import com.pharm.chorok.domain.main.TbCustomerMileVo;
import com.pharm.chorok.domain.repository.TbCustomerMileRepository;

@Service
public class CustomerMileageService {
	
	@Autowired
	private TbCustomerMileRepository tbCustomerMileRepository;

	@Transactional
	public TbCustomerMileVo findByCustomerMileById(long custId) {
		Optional<TbCustomerMile> optional = tbCustomerMileRepository.findById(custId);
		if (optional.isPresent())
			return new TbCustomerMileVo(optional.get());
		
		return null;
	}

	@Transactional
	public TbCustomerMileVo findByCustIdAndRcmdCustId(long custId, long rcmdCustId) {
		Optional<TbCustomerMile> optional = tbCustomerMileRepository.findById(custId);
		if (optional.isPresent())
			return new TbCustomerMileVo(optional.get());
		
		return null;
	}

	@Transactional
	public void saveCustomerMile(TbCustomerMileVo custMile) {
		tbCustomerMileRepository.save(custMile.toEntity());
	}
	
}

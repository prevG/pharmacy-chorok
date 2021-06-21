package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.repository.TbCommUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CommUserDetailsService {

	@Autowired
	private TbCommUserRepository comUsrRepo;

    
    public TbCommUser loadUserByUsername(String usrEml) throws UsernameNotFoundException {
    	
        return comUsrRepo.selectComUsrByUsrEml( usrEml );
    }

    // UserService에서 이곳으로 이동
    // 현재 미사용. 추후 사용여부 확인요망.
	public List<TbCommUser> getUserList() {
		HashMap<String, Object> params = new HashMap<String, Object>();
		List<TbCommUser> resultList = comUsrRepo.getUserList(params);
		return resultList;
	}

	public Long joinUser() {

		return null;
	}

	/**
	 * 약사목록조회
	 */
	public List<TbCommUser> selectChemistList() {
		TbCommUser comUsr = new TbCommUser();
		comUsr.setUsrAuth("CHEMIST");

		return comUsrRepo.selectCommUsersByUsrAuth( comUsr );
	}

	/**
	 * 상담실장조회
	 */
	public List<TbCommUser> selectCounselorList() {
		TbCommUser comUsr = new TbCommUser();
		comUsr.setUsrAuth("COUNSELOR");

		return comUsrRepo.selectCommUsersByUsrAuth( comUsr );
	}
}


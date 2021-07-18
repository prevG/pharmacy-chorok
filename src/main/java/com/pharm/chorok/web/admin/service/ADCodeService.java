package com.pharm.chorok.web.admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.web.admin.repository.ADCodeRepository;

@Service
public class ADCodeService{

	@Autowired
	private ADCodeRepository codeRepository;

    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }
    
    /**
     * @deprecated selectCodesByGroupCd_2 함수로 대체함.
     * 
     * @param tbCommCode
     * @return
     */
    public ArrayList<TbCommCode> selectCodesByGroupCd(TbCommCode tbCommCode){
    	return codeRepository.selectCodesByGroupCd(tbCommCode);
    }
    
    public List<TbCommCode> selectCodesByGroupCd_2(TbCommCode tbCommCode) {
    	return codeRepository.selectCodesByGroupCd_2(tbCommCode);
    }
    
    public ArrayList<TbCommCode> selectCodes(TbCommCode tbCommCode){
    	return codeRepository.selectCodes(tbCommCode);
    }
    
    public List<TbCommCode> selectAbbrGrpCodes(TbCommCode tbCommCode){
    	return codeRepository.selectAbbrGrpCodes(tbCommCode);
    }
    
    public ArrayList<TbCommCode> selectAbbrCodes(TbCommCode tbCommCode){
    	return codeRepository.selectAbbrCodes(tbCommCode);
    }
    
    public int saveCode(TbCommCode tbCommCode) {
    	return codeRepository.saveCode(tbCommCode);
    }
    
    public int removeCode(TbCommCode tbCommCode) {
    	return codeRepository.removeCode(tbCommCode);
    }

}
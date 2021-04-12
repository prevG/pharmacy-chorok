package com.pharm.chorok.web.main.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbCustomer;

@Mapper
@Repository
public interface CustomerRepository {
        
    public TbCustomer selectUsrInfo(TbCustomer tbSurvey) throws Exception;
    
    
}

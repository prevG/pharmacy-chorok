package com.pharm.chorok.web.main.repository;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.table.TbCustomer;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CustomerRepository {
        
    public List<TbCustomer> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) throws Exception;
    public TbCustomer selectUsrInfo(TbCustomer tbSurvey) throws Exception;
    public TbCustomer findCustomerByCustId(HashMap<String, Object> params) throws Exception;
    public Long selectNewCustId() throws Exception;
    public int insertTbCustomer(TbCustomer custInfo) throws Exception;
    public int updateTbCustomer(TbCustomer custInfo) throws Exception;
    public int insertNewChartInfo(TbCustomer custInfo) throws Exception;
}

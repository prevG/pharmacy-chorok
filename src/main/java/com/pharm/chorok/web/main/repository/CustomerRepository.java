package com.pharm.chorok.web.main.repository;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.main.ResultRcmdMileVo;
import com.pharm.chorok.domain.table.TbCustomer;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CustomerRepository {
        
    public List<TbCustomer> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) throws Exception;
    public TbCustomer selectUsrInfo(TbCustomer tbSurvey) throws Exception;
    public TbCustomer findCustomerByCustId(HashMap<String, Object> params) throws Exception;
    public TbCustomer findCustomerByRsvtId(HashMap<String, Object> params) throws Exception;

    //금일 복용상담해야할 고객목록 및 복용정보
    public List<ResultDosingVo> findCustomerByDosgDt(HashMap<String, Object> params) throws Exception;
    
    public List<TbCustomer> findAllCustomer(TbCustomer inCustomer) throws Exception;
    public Long selectNewCustId() throws Exception;
    public int insertTbCustomer(TbCustomer custInfo) throws Exception;
    public int updateTbCustomer(TbCustomer custInfo) throws Exception;
    public int insertNewChartInfo(TbCustomer custInfo) throws Exception;
	
    public List<ResultRcmdMileVo> findRcmdListByCustId(long custId);
	public void updateRcmdMilgYn(ResultRcmdMileVo rcmdVo);
	public void updateTbCustMileage(TbCustomer custInfo) throws DataAccessException;

}

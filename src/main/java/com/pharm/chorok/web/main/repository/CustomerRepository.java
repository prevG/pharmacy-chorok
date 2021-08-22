package com.pharm.chorok.web.main.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.main.TbCustomerMileVo;
import com.pharm.chorok.domain.main.TbPpCnstMileVo;
import com.pharm.chorok.domain.table.TbCustomer;

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
	
    public List<TbCustomerMileVo> findRcmdListByCustId(long custId);
	public void updateRcmdMilgYn(TbCustomerMileVo rcmdVo);
	public void updateTbCustMileage(TbCustomer custInfo) throws DataAccessException;
	public List<TbPpCnstMileVo> findPayListByCustId(long custId) throws DataAccessException;

}

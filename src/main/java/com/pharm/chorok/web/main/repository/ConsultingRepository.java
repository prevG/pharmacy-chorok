package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ConsultingRepository {
    
    public List<ResultConsultingVo> selectConsultingChartByCustId( TbPpCnstChart cnstInfo ) throws Exception;
    public ResultConsultingVo selectConsultingChartByCnstId( TbPpCnstChart cnstInfo ) throws Exception;
    public Long selectNewCnstId() throws Exception;
    public int insertTbPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    public int updateTbPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    public int deleteTbPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    
    public long selectTbPpCnstChartPrevCnstId(TbPpCnstChart cnstInfo) throws DataAccessException;
}

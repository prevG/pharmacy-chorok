package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ConsultingRepository {
    
    public List<ResultConsultingVo> selectConsultingChartByCustId( TbPpCnstChart cnstInfo ) throws Exception;
    public Long selectNewCnstId() throws Exception;
    public int insertTpPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    public int updateTpPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    public int deleteTpPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
}

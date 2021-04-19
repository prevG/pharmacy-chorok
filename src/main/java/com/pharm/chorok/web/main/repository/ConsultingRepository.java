package com.pharm.chorok.web.main.repository;

import com.pharm.chorok.domain.table.TbPpCnstChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ConsultingRepository {
    

    public int insertTpPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
    public int updateTpPpCnstChart( TbPpCnstChart cnstInfo ) throws Exception;
}

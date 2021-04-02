package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ReservationScheduleRepository {
    
    public List<TbPpWorkTime> selectWorkTimeByUseYn() throws Exception;

    public List<TbPpRsvtSch> selectRsvtSchByWeekList(TbCommCalendar param) throws Exception;

    public TbPpRsvtSch findReservationInfoByRsvtId(TbPpRsvtSch param) throws Exception;
    
    public int insertTbPpRsvtSch(TbPpRsvtSch param) throws Exception;
    
    public int updateTbPpRsvtSch(TbPpRsvtSch param) throws Exception;
    
    public int deleteTbPpRsvtSch(TbPpRsvtSch param) throws Exception;
    
}

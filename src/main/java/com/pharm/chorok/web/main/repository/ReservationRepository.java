package com.pharm.chorok.web.main.repository;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ReservationRepository {
    
    public List<TbPpWorkTime> selectWorkTime() throws Exception;

    public List<TbPpWorkTime> selectTimeList() throws Exception;

    public TbCommCalendar selectDateAdd( HashMap<String, Object> params ) throws Exception;

	public List<TbCommCalendar> selectSameWeekDateListByDt( TbCommCalendar cal ) throws Exception;

	public List<TbCommCalendar> selectDashBoardDateListByDt( TbCommCalendar cal ) throws Exception;

    public List<TbPpRsvtSch> selectRsvtSchByWeek( TbCommCalendar cal )  throws Exception;

    public TbPpRsvtSch findReservationInfoByRsvtId(TbPpRsvtSch param) throws Exception;
    
    public int insertTbPpRsvtSch(TbPpRsvtSch param) throws Exception;
    
    public int updateTbPpRsvtSch(TbPpRsvtSch param) throws Exception;
    
    public int deleteTbPpRsvtSch(TbPpRsvtSch param) throws Exception;

    public int updateCustIdByRsvtId(TbPpRsvtSch param) throws Exception;
    
    public List<TbPpRsvtSch> selectOneDayBeforeRsv() throws Exception;
    
    public List<TbPpRsvtSch> selectDayRsv() throws Exception;

    public List<TbCommUser> selectChemistList() throws Exception;

    
    
}

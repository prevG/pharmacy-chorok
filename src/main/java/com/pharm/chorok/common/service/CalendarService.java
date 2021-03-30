package com.pharm.chorok.common.service;

import java.util.List;

import com.pharm.chorok.common.repository.TbCommCalendarRepository;
import com.pharm.chorok.domain.table.TbCommCalendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {
    
    @Autowired
    private TbCommCalendarRepository calRepo;

    /**
     * 오늘 날짜 조회
     * 
     * @return
     * @throws Exception
     */
    public TbCommCalendar selectCurrentDate() throws Exception {
        return calRepo.selectCurrentDate();
    }

    /**
     * 해당날자가 속한 주차의 모든 날짜를 조회
     * 
     * @param cal
     * @return
     * @throws Exception
     */
    public List<TbCommCalendar> selectSameWeekDateListByDt(TbCommCalendar cal) throws Exception {
        return calRepo.selectSameWeekDateListByDt( cal );
    }
 }

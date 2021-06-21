package com.pharm.chorok.common.service;

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

    
 }

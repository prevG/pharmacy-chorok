package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.util.SecurityContextUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class ReservationScheduleService {
    
    @Autowired
    private CalendarService calSvc;


    public Model getReservationTable( Model model ) throws Exception {

        TbCommCalendar currCal = calSvc.selectCurrentDate();
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
        List<TbCommCalendar> currDtList = calSvc.selectSameWeekDateListByDt( currCal );
        
		model.addAttribute( "name"   , comUser.getUsrNm() );
        model.addAttribute( "colList", currDtList ); //동적컬럼리스트

        return model;
    } 

}

package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;

@Service
public class ReservationScheduleService {
    
    @Autowired
    private CalendarService calSvc;

    @Autowired
    private ReservationScheduleRepository rsvtSchRepo;



    public Model getReservationTable( Model model ) throws Exception {

        TbCommCalendar currCal = calSvc.selectCurrentDate();

		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
        List<TbCommCalendar> currDtList = calSvc.selectSameWeekDateListByDt( currCal );
        List<TbPpWorkTime> workTimeList = rsvtSchRepo.selectWorkTimeByUseYn();
        List<TbPpRsvtSch> rsvtSchList  = rsvtSchRepo.selectRsvtSchByWeekList( currCal );

		model.addAttribute( "name"    , comUser.getUsrNm() );
        model.addAttribute( "colList" , currDtList );   //Column
        model.addAttribute( "rowList" , workTimeList ); //Row
        model.addAttribute( "dataList", rsvtSchList ); //Cell

        return model;
    } 
    
    public TbPpRsvtSch findReservationInfoByRsvtId( TbPpRsvtSch rsvtSch,  Model model  ) throws Exception {

    	TbPpRsvtSch rsvtSchInfo = rsvtSchRepo.findReservationInfoByRsvtId( rsvtSch );

		model.addAttribute( "schInfo", rsvtSchInfo );
    	return rsvtSchInfo;
    }
    
    
	public int saveReservationSchedule(TbPpRsvtSch rsvt) throws Exception {
		
		int result = -1;
		if( !StringUtils.hasLength( rsvt.getId() )) {
			result = rsvtSchRepo.insertTbPpRsvtSch( rsvt );
		} else {
			result = rsvtSchRepo.updateTbPpRsvtSch( rsvt );
		}
		return result;
	}
	
	public int deleteReservationSchedule(TbPpRsvtSch rsvt) throws Exception {
		return rsvtSchRepo.deleteTbPpRsvtSch( rsvt );
	}

}

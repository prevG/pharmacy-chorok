package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;

@Service
public class ReservationScheduleService {
    
    @Autowired
    private CalendarService calSvc;

    @Autowired
    private ReservationScheduleRepository rsvtSchRepo;



    public ModelAndView getReservationTable( ModelAndView mv ) throws Exception {

		TbCommCalendar currCal = calSvc.selectCurrentDate();

		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
        List<TbCommCalendar> currDtList = calSvc.selectSameWeekDateListByDt( currCal );
        List<TbPpWorkTime> workTimeList = rsvtSchRepo.selectWorkTimeByUseYn();
        List<TbPpRsvtSch> rsvtSchList  = rsvtSchRepo.selectRsvtSchByWeekList( currCal );

		mv.addObject( "name"    , comUser.getUsrNm() );
        mv.addObject( "colList" , currDtList );   //Column
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "dataList", rsvtSchList ); //Cell

        return mv;
    } 
    
	/**
	 * 예약스케쥴 정보 조회
	 * @param rsvtSch
	 * @param model
	 * @return
	 * @throws Exception
	 */
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

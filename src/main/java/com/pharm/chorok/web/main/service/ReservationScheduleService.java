package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
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

    public ModelAndView getReservationByDt( ModelAndView mv, ReservationPagination reservationPagination ) throws Exception {

		String todayDt   = calSvc.selectCurrentDate().getBaseDtStr();
		String currDt    = reservationPagination.getCurrDt();
		if( !StringUtils.hasText( currDt )) {
			currDt = todayDt;
		}
		
		TbCommCalendar currCal = new TbCommCalendar();
		currCal.setBaseDtStr( currDt );
        
		//검색일자와 동일한 주차를 가지는 날짜를 조회
        List<TbCommCalendar> currDtList = rsvtSchRepo.selectSameWeekDateListByDt( currCal );

		//검색일자와 동일한 주차에 속하는 등록된 스케쥴을 조회
        List<TbPpRsvtSch> rsvtSchList  = rsvtSchRepo.selectRsvtSchByWeek( currCal );
        
		//업무시간 목록을 조회
        List<TbPpWorkTime> workTimeList = rsvtSchRepo.selectWorkTime();
		

		mv.addObject( "currDt" , currDt        ); //검색기준일자
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "colList" , currDtList   ); //Column
        mv.addObject( "dataList", rsvtSchList  ); //Cell

        return mv;
    } 

	public ModelAndView getReservationByMovedWeekNo( ModelAndView mv, ReservationPagination reservationPagination ) throws Exception {

		Integer interval = reservationPagination.getInterval();
		String todayDt   = calSvc.selectCurrentDate().getBaseDtStr();
		String currDt    = reservationPagination.getCurrDt();

		if( interval == 0 ) {
			currDt = todayDt;
		}
		TbCommCalendar currCal = new TbCommCalendar();
		currCal.setBaseDtStr( currDt );

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put( "cal", currCal );
		params.put( "interval",  interval );
		
		//주차 변경이 발생한 경우 변경된 날짜를 가져온다.
		TbCommCalendar srchCal = rsvtSchRepo.selectDateAdd( params );

		//업무시간 목록을 조회
        List<TbPpWorkTime> workTimeList = rsvtSchRepo.selectWorkTime();

		//검색일자와 동일한 주차를 가지는 날짜를 조회
        List<TbCommCalendar> currDtList = rsvtSchRepo.selectSameWeekDateListByDt( srchCal );

		//검색일자와 동일한 주차에 속하는 등록된 스케쥴을 조회
        List<TbPpRsvtSch> rsvtSchList  = rsvtSchRepo.selectRsvtSchByWeek( srchCal );

		mv.addObject( "currDt"  , srchCal.getBaseDtStr()  ); //변경후 기준일자
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "colList" , currDtList   ); //Column
        mv.addObject( "dataList", rsvtSchList  ); //Cell

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

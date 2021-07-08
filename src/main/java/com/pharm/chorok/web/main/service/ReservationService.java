package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.web.main.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;

@Service
public class ReservationService {
    
    @Autowired
    private CalendarService calSvc;

    @Autowired
    private ReservationRepository rsvtSchRepo;

	@Autowired
	private CommUserDetailsService commUserDetailsSvc;

	public ModelAndView getDashBoard( ModelAndView mv, ReservationPagination reservationPagination ) throws Exception {

		getDashBoardReservationByDt(mv, reservationPagination );

        return mv;
    } 

	public ModelAndView getDashBoardReservationByDt( ModelAndView mv, ReservationPagination reservationPagination ) throws Exception {

		String todayDt   = calSvc.selectCurrentDate().getBaseDtStr();
		String currDt    = reservationPagination.getCurrDt();
		if( !StringUtils.hasText( currDt )) {
			currDt = todayDt;
		}
		
		TbCommCalendar currCal = new TbCommCalendar();
		currCal.setBaseDtStr( currDt );
        
		//검색일자와 동일한 주차를 가지는 날짜를 조회
        List<TbCommCalendar> currDtList = rsvtSchRepo.selectDashBoardDateListByDt( currCal );

		//검색일자와 동일한 주차에 속하는 등록된 스케쥴을 조회
        List<TbPpRsvtSch> rsvtSchList  = rsvtSchRepo.selectRsvtSchByWeek( currCal );
        
		//업무시간 목록을 조회
        List<TbPpWorkTime> workTimeList = rsvtSchRepo.selectWorkTime();

		//DATETIMEPICKER 시간대를 조회한다.
        List<TbPpWorkTime> timeList = rsvtSchRepo.selectTimeList();

		//약사목록 을 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        mv.addObject( "chemistList", chemistList  ); //약사목록


		mv.addObject( "currDt" , currDt        ); //검색기준일자
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "colList" , currDtList   ); //Column
        mv.addObject( "dataList", rsvtSchList  ); //Cell
        mv.addObject( "timeList", timeList  ); //Cell

        return mv;
    } 

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

		//DATETIMEPICKER 시간대를 조회한다.
        List<TbPpWorkTime> timeList = rsvtSchRepo.selectTimeList();
		

		mv.addObject( "currDt" , currDt        ); //검색기준일자
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "colList" , currDtList   ); //Column
        mv.addObject( "dataList", rsvtSchList  ); //Cell
        mv.addObject( "timeList", timeList  ); //Cell


		//약사목록 을 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        mv.addObject( "chemistList", chemistList  ); //약사목록

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
	 * 예약번호로 예약상세정보 조회
	 * 
	 * @param rsvtSch
	 * @return
	 * @throws Exception
	 */
    public TbPpRsvtSch findReservationByRsvtId( TbPpRsvtSch rsvtSch  ) throws Exception {
    	return rsvtSchRepo.findReservationByRsvtId( rsvtSch );
    }

    
    
	/**
	 * 예약자명 또는 전화번호로 예약상세정보 조회
	 * 
	 * @param rsvtSch
	 * @return
	 * @throws Exception
	 */
    public List<TbPpRsvtSch> findBySearchKeyword( TbPpRsvtSch rsvtSch  ) throws Exception {
    	return rsvtSchRepo.findBySearchKeyword( rsvtSch );
    }
    

	/**
	 * 예약정보로 예약상세정보 조회(예약일시/예약자성명/예약자휴대번호)
	 * 
	 * @param rsvtSch
	 * @return
	 * @throws Exception
	 */
	public TbPpRsvtSch findReservationByRsvtInfo( TbPpRsvtSch rsvtSch  ) throws Exception {
    	return rsvtSchRepo.findReservationByRsvtInfo( rsvtSch );
    }
    

	/**
	 * 예약상세정보 신규저장 및 수정
	 * 
	 * @param rsvt
	 * @return
	 * @throws Exception
	 */
	public int saveReservation(TbPpRsvtSch rsvt) throws Exception {
		
		int result = -1;

		Long rsvtId = rsvt.getRsvtId();
		if( rsvtId != null && rsvtId > 0) {
			result = rsvtSchRepo.updateTbPpRsvtSch( rsvt );
		} else {
			result = rsvtSchRepo.insertTbPpRsvtSch( rsvt );
		}
		return result;
	}
	

	/**
	 * 예약상세정보 삭제
	 * 
	 * @param rsvt
	 * @return
	 * @throws Exception
	 */
	public int deleteReservation(TbPpRsvtSch rsvt) throws Exception {
		return rsvtSchRepo.deleteTbPpRsvtSch( rsvt );
	}
}

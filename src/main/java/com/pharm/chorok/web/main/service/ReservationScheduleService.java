package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.web.main.repository.ConsultingRepository;
import com.pharm.chorok.web.main.repository.CustomerRepository;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;

@Service
public class ReservationScheduleService {
    
    @Autowired
    private CalendarService calSvc;

    @Autowired
    private ReservationScheduleRepository rsvtSchRepo;

    @Autowired
    private ConsultingRepository consultingRepo;

    @Autowired
    private CustomerRepository customerRepo;


	public ModelAndView getDashBoard( ModelAndView mv, ReservationPagination reservationPagination ) throws Exception {

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


		mv.addObject( "currDt" , currDt        ); //검색기준일자
        mv.addObject( "rowList" , workTimeList ); //Row
        mv.addObject( "colList" , currDtList   ); //Column
        mv.addObject( "dataList", rsvtSchList  ); //Cell

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
	 * @param ModelAndView mv
	 * @param TbPpRsvtSch rsvtSch 
	 * @return
	 * @throws Exception
	 */
    public ModelAndView findReservationInfoByRsvtId( ModelAndView mv, TbPpRsvtSch rsvtSch  ) throws Exception {

    	TbPpRsvtSch rsvtSchInfo = rsvtSchRepo.findReservationInfoByRsvtId( rsvtSch );

		//약사목록 을 조회
        // List<TbCommUser> chemistList = userRepo.selectChemistList();
		

    	mv.addObject( "schInfo", rsvtSchInfo );
        mv.addObject( "chemistList", null  ); //약사목록
    	return mv;
    }
    
	/**
	 * 상담하기(접수)버튼을 클릭한 경우 예약고객정보를 가지고 고객테이블에서 기본정보 조회
	 * 신규고객일 경우 예약정보를 사용한다.
	 * 
	 * @param ModelAndView mv
	 * @param TbPpRsvtSch rsvtSch 
	 * @return
	 * @throws Exception
	 */
    public ModelAndView findCustomerByRsvtId( ModelAndView mv, TbPpRsvtSch rsvtSch  ) throws Exception {


		Long rsvtId = rsvtSch.getRsvtId();
		Long custId = rsvtSch.getCustId();

		HashMap<String, Object> params = new HashMap<String, Object>();
		
		TbCustomer custInfo = null;
		List<ResultConsultingVo> cnstList = null;
		if( custId != null && custId > 0 ) {
			
			params.put("custId", custId );
    		custInfo = customerRepo.findCustomerByCustId( params );

			//상담차트 목록
			TbPpCnstChart cnstInfo = new TbPpCnstChart();
			cnstInfo.setCustId( custInfo.getCustId() );
			cnstList = consultingRepo.selectConsultingChartByCustId( cnstInfo );
		} else  {

			params.put("rsvtId", rsvtId );
			custInfo = rsvtSchRepo.findCustomerByRsvtSchId( params );
		}
		TbPpRsvtSch rsvtSchInfo = rsvtSchRepo.findReservationInfoByRsvtId( rsvtSch );


    	mv.addObject( "cnstList", cnstList );
    	mv.addObject( "rsvtInfo", rsvtSchInfo );
    	mv.addObject( "custInfo", custInfo );
    	return mv;
    }

    
	public int saveReservationSchedule(TbPpRsvtSch rsvt) throws Exception {
		
		int result = -1;

		Long rsvtId = rsvt.getRsvtId();
		if( rsvtId != null && rsvtId > 0) {
			result = rsvtSchRepo.updateTbPpRsvtSch( rsvt );
		} else {
			result = rsvtSchRepo.insertTbPpRsvtSch( rsvt );
		}
		return result;
	}
	
	public int deleteReservationSchedule(TbPpRsvtSch rsvt) throws Exception {
		return rsvtSchRepo.deleteTbPpRsvtSch( rsvt );
	}

}

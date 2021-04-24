package com.pharm.chorok.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class Scheduler {

    @Autowired 
    private SchedulingService schedulingService; 

    /*
	//주중 3시에 문자발송예약(예약고객)
	@Scheduled(cron = "0 0 3 * * MON-SAT") 
	 public void cronRsrvJob() {
		 schedulingService.job("RsrvSMS");
   }
	
	//매일 4시에 복용차트 문자 발송예약
	//그전에 밥먹는 사람 없겠지..
	@Scheduled(cron = "0 0 4 * * *") 
	 public void cronDoseJob() {
		 schedulingService.job("DoseSMS");
	}
	*/
    
    /*
    @Scheduled(fixedDelay = 10000) // 메소드 호출이 종료되는 시간에서 10000ms 이후 재 호출 
    public void doFixedDelayJob() { 
        schedulingService.job("RsrvSMS"); 
    }
    
    @Scheduled(fixedRate = 40000) // 메소드 호출이 종료되는 시간에서 10000ms 이후 재 호출 
    public void doFixedRateJob() { 
        schedulingService.job("DoseSMS"); 
    }
    */
    
 }

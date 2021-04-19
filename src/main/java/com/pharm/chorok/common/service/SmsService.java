package com.pharm.chorok.common.service;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;


@EnableScheduling 
public class SmsService {

	@Scheduled(fixedRateString = "5", initialDelay = 3000)
    public void ScheduleTest() throws Exception {
        System.out.println("kwka");
    }
 }

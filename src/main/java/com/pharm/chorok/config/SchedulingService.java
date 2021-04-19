package com.pharm.chorok.config;

import java.time.LocalTime;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class SchedulingService {
	
	
	 public void job(String option) { 
         try { 
             new Thread(new Runnable() { 
                 @Override 
                 public void run () { 
                     System.out.println(option + "--scheduling job start--" + LocalTime.now()); 
                     try { 
                         TimeUnit.SECONDS.sleep(10);
                         
                         if(option.equals("RsrvSMS")) {
                        	 RsrvSMS();
                         }
                         
                         if(option.equals("DoseSMS")){
                        	 DoseSMS(); 
                         }
                         
                     } catch (InterruptedException ignored) { 
                     } 
                     System.out.println(option + "--scheduling job end--" + LocalTime.now()); 
                 } 
             }).start(); 
         } catch (Exception ignored) { } 
         
     }
	 
	 
	 private void RsrvSMS() {
		System.out.println("RsrvSMS called");
	 }
	 
	 private void DoseSMS() {
		 System.out.println("DoseSMS called");
	 }
}

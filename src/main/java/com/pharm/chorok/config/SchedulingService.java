package com.pharm.chorok.config;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbSmsMsg;
import com.pharm.chorok.web.admin.repository.ADSMSRepository;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

import lombok.SneakyThrows;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Service
public class SchedulingService {
	
	final static String fromTel = "01038252547";
	
	@Autowired
	private ADSMSRepository SMSRepository;
	
	@Autowired
    private ReservationScheduleRepository rsvtSchRepo;
	
	
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
                         
                     } catch (InterruptedException ignored) {} 
                     
                     System.out.println(option + "--scheduling job end--" + LocalTime.now()); 
                 } 
             }).start(); 
         } catch (Exception ignored) { } 
         
     }
	 
	 @SneakyThrows
	 private void RsrvSMS(){
		System.out.println("RsrvSMS called");		
		TbSmsMsg rsvOneDayBeforeParam = new TbSmsMsg(1,"RSV","RSV1");
		TbSmsMsg rsvDayParam = new TbSmsMsg(1,"RSV","RSV0");
		
		TbSmsMsg msgOneDayBeforeMsg= SMSRepository.selectSmsMsg(rsvOneDayBeforeParam);
		List<TbPpRsvtSch> oneDayBeforeRsv = rsvtSchRepo.selectOneDayBeforeRsv();
		
		
		TbSmsMsg msgDayMsg=  SMSRepository.selectSmsMsg(rsvDayParam);
		List<TbPpRsvtSch> dayRsv = rsvtSchRepo.selectDayRsv();
		
		
	 }
	 
	 private void DoseSMS() {
		 System.out.println("DoseSMS called");
	 }
	 
	 
	 //https://docs.toast.com/ko/Notification/SMS/ko/api-guide/
	 private void toastSms() {
			String hostNameUrl = "https://api-sms.cloud.toast.com";     		// 호스트 URL
			String requestUrl= "/sms/v2.4/appKeys/0rhL2B2YO15WTOXr/sender/sms"; // 요청 URL
			String apiUrl = hostNameUrl + requestUrl;
			String method = "POST";				
			
			JSONObject bodyJson = new JSONObject();
			JSONObject toJson = new JSONObject();
		    JSONArray  toArr = new JSONArray();
			
		    //표준: 90바이트, 최대: 255자(EUC-KR 기준) [주의사항]	
			bodyJson.put("body","sms");				
		    bodyJson.put("sendNo",SchedulingService.fromTel);
		    //예약 일시(yyyy-MM-dd HH:mm)
		    bodyJson.put("requestDate","2021-04-19 15:00");
		    
		    
		    //최대 1,000명
		    toJson.put("recipientNo","01030038397");			
		    toArr.add(toJson);
		    
			
		    bodyJson.put("recipientList", toArr);
		    
		    String body = bodyJson.toJSONString();
		    
		    System.out.println(body);
		    
		    
		    try {

	        	System.out.println("apiUrl : "+apiUrl);
	            URL url = new URL(apiUrl);

	            HttpURLConnection con = (HttpURLConnection)url.openConnection();
	            con.setUseCaches(false);
	            con.setDoOutput(true);
	            con.setDoInput(true);
	            con.setRequestProperty("content-type", "application/json");
	            con.setRequestMethod(method);
	            con.setDoOutput(true);
	            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	            
	            wr.write(body.getBytes());
	            wr.flush();
	            wr.close();

	            int responseCode = con.getResponseCode();
	            BufferedReader br;
	            System.out.println("responseCode" +" " + responseCode);
	            if(responseCode==200) { // 정상 호출
	                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
	            } else {  // 에러 발생
	                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
	            }

	            String inputLine;
	            StringBuffer response = new StringBuffer();
	            while ((inputLine = br.readLine()) != null) {
	                response.append(inputLine);
	            }
	            br.close();
	            
	            System.out.println(response.toString());

	        } catch (Exception e) {
	            System.out.println(e);
	        }
		}
	 
	 
	 
	 
	 
}

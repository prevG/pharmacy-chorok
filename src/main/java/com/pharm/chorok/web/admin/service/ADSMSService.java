package com.pharm.chorok.web.admin.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.pharm.chorok.domain.main.SMSReservationVo;
import com.pharm.chorok.web.admin.repository.ADSMSRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Service
public class ADSMSService {

	@Autowired
	private ADSMSRepository SMSRepository;

	//toast 메세지 전송
	public void sendSmsReservation(SMSReservationVo smsObj) {


		String hostNameUrl = "https://api-sms.cloud.toast.com";     		// 호스트 URL
		String requestUrl= "/sms/v2.4/appKeys/0rhL2B2YO15WTOXr/sender/sms";                   		// 요청 URL
		String apiUrl = hostNameUrl + requestUrl;
		String method = "POST";				
		
		JSONObject bodyJson = new JSONObject();
		JSONObject toJson = new JSONObject();
	    JSONArray  toArr = new JSONArray();
		
		StringBuilder sms = new StringBuilder();
		sms.append( smsObj.getRsvtUsrNm());
		sms.append( "님." );
		sms.append( smsObj.getRsvtDt());
		sms.append( "에 초록건강한약국 상담이 예약되었습니다." );
		
		bodyJson.put("body", sms.toString());
		//최일준과장님 번호(보내는사람)
	    bodyJson.put("sendNo","01038252547");			
	    
	    //곽경준전화번호(받는사람)
	    toJson.put("recipientNo", smsObj.getRsvtCellNo());			
	    toArr.add(toJson);
	    
		//받는사람
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
package com.pharm.chorok.common.component;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.pharm.chorok.domain.table.TbPpSmsHist;

import org.springframework.stereotype.Component;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Component
public class SMSComponent {
	static final String apiKey = "4PbyZIDlDUSx4SsL";
	static final String hostNameUrl = "https://api-sms.cloud.toast.com";
	static final String method = "POST";
	static final String sendNo = "01035693756";
	public static enum MESSAGETYPE{
		SMSTYPE,
		MMSTYPE,
		TEMPLATETYPE
	}
	
	/*
	SMS 본문	255자	90바이트(한글 45자, 영문 90자)
	MMS 제목	120자	40바이트(한글 20자, 영문 40자)
	MMS 본문	4,000자	2,000바이트(한글 1,000자, 영문 2,000자)
	*/
	
	
	public List<TbPpSmsHist> sendMessage(MESSAGETYPE smsType){
		List<TbPpSmsHist> ret = null;
		String requestUrl = "";
		String apiUrl = "";
		
		if(smsType == MESSAGETYPE.SMSTYPE) {
			requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/sms";
			apiUrl = hostNameUrl + requestUrl;
			
			
			JSONObject bodyJson = new JSONObject();
			JSONObject toJson = new JSONObject();
		    JSONArray  toArr = new JSONArray();

		    bodyJson.put("sendNo",sendNo);
			bodyJson.put("body","sms1234");
			//bodyJson.put("senderGroupingKey","senderGroupingKey");
			
			
		    //곽경준전화번호(받는사람)
		    toJson.put("recipientNo","01035693756");
		    //toJson.put("recipientGroupingKey","recipientGroupingKey");
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
	            
	            
	            ret = getTbPpSmsHists(response.toString());

	        } catch (Exception e) {
	            System.out.println(e);
	        }
		    
		    
			
		}else if(smsType == MESSAGETYPE.MMSTYPE) {
			requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/mms";
			apiUrl = hostNameUrl + requestUrl;	
			
			
			JSONObject bodyJson = new JSONObject();
			JSONObject toJson = new JSONObject();
		    JSONArray  toArr = new JSONArray();
			
		    //최일준과장님 번호(보내는사람)
		  	bodyJson.put("sendNo",sendNo);
		    bodyJson.put("title","mms title");
			bodyJson.put("body","mms content");
						
		    
		    //곽경준전화번호(받는사람)
		    toJson.put("recipientNo","01035693756");			
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
	            
	            ret = getTbPpSmsHists(response.toString());

	        } catch (Exception e) {
	            System.out.println(e);
	        }
			
		}else if(smsType == MESSAGETYPE.TEMPLATETYPE) {
			
			//템플릿으로 보내야됨...
			/*
			* requestId 또는 startRequestDate + endRequestDate 또는 startCreateDate + endCreateDate는 필수입니다.
			* 등록 날짜/발송 날짜를 동시에 검색하는 경우, 발송 날짜는 무시됩니다.
			**/
			
			requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/mms";
			apiUrl = hostNameUrl + requestUrl;
			
			
			JSONObject bodyJson = new JSONObject();
			JSONObject toJson = new JSONObject();
		    JSONArray  toArr = new JSONArray();
		    
		    SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		    String time = format.format(new Date());
		    
		    //testTemplate
			//최일준과장님 번호(보내는사람)
			bodyJson.put("sendNo",sendNo);
			bodyJson.put("templateId","testTemplate");
			bodyJson.put("startRequestDate","2021-05-03 15:15:00");
			bodyJson.put("endRequestDate","2021-05-03 15:15:00");
			
		    //곽경준전화번호(받는사람)
		    toJson.put("recipientNo","01035017145");			
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
	            
	            ret = getTbPpSmsHists(response.toString());

	        } catch (Exception e) {
	            System.out.println(e);
	        }
			
		}
		
		return ret;
	}
	
	

	private List<TbPpSmsHist> getTbPpSmsHists(String resStr){
		
		List<TbPpSmsHist> ret = new ArrayList<TbPpSmsHist>();
		
		org.json.JSONObject jObject = new org.json.JSONObject(resStr);
        org.json.JSONObject jheader = jObject.getJSONObject("header");
        org.json.JSONObject jbody = jObject.getJSONObject("body");

        String rstCd = (String) jheader.get("resultCode");
        String rstMsg = (String) jheader.get("resultMessage");
        org.json.JSONArray sendResultList = jbody.getJSONObject("data").getJSONArray("sendResultList");
        
        for(int i=0; i<sendResultList.length(); i++) {
        	org.json.JSONObject sendResultItem = (org.json.JSONObject) sendResultList.get(i);
        	String rcpNo = (String)sendResultItem.get("recipientNo");
        	String rcpRstCd = (String)sendResultItem.get("resultCode");
        	String rcpRstMsg = (String)sendResultItem.get("resultMessage");
        	
        	TbPpSmsHist tbPpSmsHist = new TbPpSmsHist();
        	
            tbPpSmsHist.setRstCd(rstCd);
            tbPpSmsHist.setRstMsg(rstMsg);
            tbPpSmsHist.setRcpNo(rcpNo);
            tbPpSmsHist.setRcpRstCd(rcpRstCd);
            tbPpSmsHist.setRcpRstMsg(rcpRstMsg);
            
            ret.add(tbPpSmsHist);
        }
        
        return ret;
        
	}
	
	
	
	
}

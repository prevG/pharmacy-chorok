package com.pharm.chorok.common.component;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.pharm.chorok.domain.table.TbPpSmsHist;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Component
public class SMSComponent {
	static final String apiKey = "0rhL2B2YO15WTOXr";
	static final String hostNameUrl = "https://api-sms.cloud.toast.com";
	static final String method = "POST";
	static final String sendNo = "01038252547";
	
	/*
	SMS 본문	255자	90바이트(한글 45자, 영문 90자)
	MMS 제목	120자	40바이트(한글 20자, 영문 40자)
	MMS 본문	4,000자	2,000바이트(한글 1,000자, 영문 2,000자)
	*/
	
	

	
	//toast 메세지 전송
	public List<TbPpSmsHist> sendToastSms() {
		List<TbPpSmsHist> ret = null;
		
		String requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/sms";                   		// 요청 URL
		String apiUrl = hostNameUrl + requestUrl;
		
		JSONObject bodyJson = new JSONObject();
		JSONObject toJson = new JSONObject();
	    JSONArray  toArr = new JSONArray();

	    bodyJson.put("sendNo",sendNo);
		bodyJson.put("body","sms");
		//bodyJson.put("senderGroupingKey","senderGroupingKey");
		
		
	    //곽경준전화번호(받는사람)
	    toJson.put("recipientNo","01030038397");
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
	
	
	
	public void getSmsStatus() {
		String requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/sms";                   		// 요청 URL
		String apiUrl = hostNameUrl + requestUrl;
		
		JSONObject bodyJson = new JSONObject();
		JSONObject toJson = new JSONObject();
	    JSONArray  toArr = new JSONArray();

	    bodyJson.put("sendNo",sendNo);
		bodyJson.put("body","sms");
		//bodyJson.put("senderGroupingKey","senderGroupingKey");
		
		
	    //곽경준전화번호(받는사람)
	    toJson.put("recipientNo","01030038397");
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
            
            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e);
        }
	}
	
	
	public void sendToastMms() {
		String requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/mms";                   		// 요청 URL
		String apiUrl = hostNameUrl + requestUrl;				
		
		JSONObject bodyJson = new JSONObject();
		JSONObject toJson = new JSONObject();
	    JSONArray  toArr = new JSONArray();
		
	    //최일준과장님 번호(보내는사람)
	  	bodyJson.put("sendNo",sendNo);
	    
	    bodyJson.put("title","mms title");
		bodyJson.put("body","mms content");
					
	    
	    //곽경준전화번호(받는사람)
	    toJson.put("recipientNo","01030038397");			
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
	
	
	public void sendToastMmsWithFile() {
		String requestUrl= "/sms/v2.4/appKeys/"+apiKey+"/sender/mms";
		String apiUrl = hostNameUrl + requestUrl;				
		
		JSONObject bodyJson = new JSONObject();
		JSONObject toJson = new JSONObject();
	    JSONArray  toArr = new JSONArray();

		//최일준과장님 번호(보내는사람)
		bodyJson.put("sendNo",sendNo);
	    
	    bodyJson.put("title","mms title");
		bodyJson.put("body","mms content");
		
	    //곽경준전화번호(받는사람)
	    toJson.put("recipientNo","01030038397");			
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

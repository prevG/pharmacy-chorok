package com.pharm.chorok;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pharm.chorok.common.service.SMSService;

@SpringBootTest
public class SMSServiceTest {

	@Autowired
	private SMSService smsService;

	@Test
	void testSms() {
		// given
		String recipientNo = "01035693756";
		String smsContent = "Say Hello!";
		
		// when
		smsService.sendSms(recipientNo, smsContent);
		
		// then
		assertTrue(true, "sms test success "+ LocalDateTime.now().toString());
	}
	
}

package com.pharm.chorok;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pharm.chorok.common.component.SMSComponent;

@SpringBootTest
class SMSComponentTest {
	
	@Autowired
	private SMSComponent sms;

//	@Test
	void test() {
		
		sms.sendMmsWithAttach();
		
		assertTrue(true, "sms test");
	}

}

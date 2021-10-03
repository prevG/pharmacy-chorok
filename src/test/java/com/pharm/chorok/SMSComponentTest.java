package com.pharm.chorok;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pharm.chorok.common.component.SMSComponent;
import com.pharm.chorok.domain.table.TbPpSmsHist;

@SpringBootTest
class SMSComponentTest {
	
	@Autowired
	private SMSComponent smsComponent;

	@Test
	void testSms() {
		// given
		String recipientNo = "01035693756";
		String smsContent = "Say Hello!";
		
		// when
		List<TbPpSmsHist> tbPpSmsHists = smsComponent.sendSms(recipientNo, smsContent);
		
		// then
		assertEquals(1, tbPpSmsHists.size(), "sms test success "+ LocalDateTime.now().toString());
	}

}

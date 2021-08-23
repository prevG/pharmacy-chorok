package com.pharm.chorok;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.text.StringSubstitutor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class StringSubstitutorTest {

	@Test
	void test() {
		//given
		String variableTemplate = "My company name is ${companyName} and my name is ${name}.";
		Map<String, Object> valueMap = new HashMap<String, Object>();
		valueMap.put("companyName", "HSTNS");
		valueMap.put("name", "Jung Jinan");
		
		//when
		String result = StringSubstitutor.replace(variableTemplate, valueMap);
		
		//then
		assertEquals("My company name is HSTNS and my name is Jung Jinan.", result);
	}

}

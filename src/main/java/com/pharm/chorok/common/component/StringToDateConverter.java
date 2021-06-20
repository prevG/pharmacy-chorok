package com.pharm.chorok.common.component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToDateConverter implements Converter<String, Date> {

	@Override
	public Date convert(String source) {
		if (source == null || source.equals(""))
			return null;
		
		SimpleDateFormat format = new SimpleDateFormat("yyyyy-MM-dd");
		try {
			return format.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		} 

		return null;
	}

}

package com.pharm.chorok.domain.comm;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.pharm.chorok.domain.table.TbCommCode;

public class CommCodeEx {

	/**
	 * 생년월일 - 년도
	 * 
	 * @return
	 */
	public static List<TbCommCode> birthYyList() {
		List<TbCommCode> yyList = new ArrayList<TbCommCode>();
		
		LocalDate dt = LocalDate.now();
		for (int i = 0; i < 50; i++) {
			TbCommCode code = new TbCommCode();
			code.setDitcCd(String.valueOf(dt.getYear() - i));
			code.setDitcNm(String.valueOf(dt.getYear() - i));
			
			yyList.add(code);
		}
		
		return yyList;
	}
	
	/**
	 * 생년월일 - 월
	 * 
	 * @return
	 */
	public static List<TbCommCode> birthMmList() {
		List<TbCommCode> mmList = new ArrayList<TbCommCode>();
		
		for (int i = 1; i <= 12; i++) {
			TbCommCode code = new TbCommCode();
			code.setDitcCd(i < 10 ? "0" + i : String.valueOf(i));
			code.setDitcNm(String.valueOf(i));
			
			mmList.add(code);
		}
		
		return mmList;
	}
	
	/**
	 * 생년월일 - 일
	 * 
	 * @return
	 */
	public static List<TbCommCode> birthDdList() {
		List<TbCommCode> ddList = new ArrayList<TbCommCode>();
		
		for (int i = 1; i <= 31; i++) {
			TbCommCode code = new TbCommCode();
			code.setDitcCd(i < 10 ? "0" + i : String.valueOf(i));
			code.setDitcNm(String.valueOf(i));
			
			ddList.add(code);
		}
		
		return ddList;
	}
	
	/**
	 * 출산자녀수
	 * 
	 * @return
	 */
	public static List<TbCommCode> childCntList() {
		List<TbCommCode> ccList = new ArrayList<TbCommCode>();
		
		for (int i = 1; i <= 10; i++) {
			TbCommCode code = new TbCommCode();
			code.setDitcCd(String.valueOf(i));
			code.setDitcNm(String.valueOf(i));
			
			ccList.add(code);
		}
		
		return ccList;
	}
	
	/**
	 * 마지막 출산년도
	 * 
	 * @return
	 */
	public static List<TbCommCode> pcrtYearList() {
		List<TbCommCode> pyList = new ArrayList<TbCommCode>();
		
		LocalDate dt = LocalDate.now();
		for (int i = 0; i < 50; i++) {
			TbCommCode code = new TbCommCode();
			code.setDitcCd(String.valueOf(dt.getYear() - i));
			code.setDitcNm(String.valueOf(dt.getYear() - i));
			
			pyList.add(code);
		}
		
		return pyList;
	}
	
}

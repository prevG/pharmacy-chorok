package com.pharm.chorok.domain.comm;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.pharm.chorok.domain.main.TbCommCodeVo;

public class CommCodeEx {

	/**
	 * 생년월일 - 년도
	 * 
	 * @return
	 */
	public static List<TbCommCodeVo> birthYyList() {
		List<TbCommCodeVo> yyList = new ArrayList<TbCommCodeVo>();
		
		LocalDate dt = LocalDate.now();
		for (int i = 0; i < 50; i++) {
			yyList.add(TbCommCodeVo.builder()
					.ditcCd(String.valueOf(dt.getYear() - i))
					.ditcNm(String.valueOf(dt.getYear() - i))
					.build());
		}
		
		return yyList;
	}
	
	/**
	 * 생년월일 - 월
	 * 
	 * @return
	 */
	public static List<TbCommCodeVo> birthMmList() {
		List<TbCommCodeVo> mmList = new ArrayList<TbCommCodeVo>();
		
		for (int i = 1; i <= 12; i++) {
			mmList.add(TbCommCodeVo.builder()
					.ditcCd(i < 10 ? "0" + i : String.valueOf(i))
					.ditcNm(String.valueOf(i))
					.build());
		}
		
		return mmList;
	}
	
	/**
	 * 생년월일 - 일
	 * 
	 * @return
	 */
	public static List<TbCommCodeVo> birthDdList() {
		List<TbCommCodeVo> ddList = new ArrayList<TbCommCodeVo>();
		
		for (int i = 1; i <= 31; i++) {
			ddList.add(TbCommCodeVo.builder()
					.ditcCd(i < 10 ? "0" + i : String.valueOf(i))
					.ditcNm(String.valueOf(i))
					.build());
		}
		
		return ddList;
	}
	
	/**
	 * 출산자녀수
	 * 
	 * @return
	 */
	public static List<TbCommCodeVo> childCntList() {
		List<TbCommCodeVo> ccList = new ArrayList<TbCommCodeVo>();
		
		for (int i = 1; i <= 10; i++) {
			ccList.add(TbCommCodeVo.builder()
					.ditcCd(String.valueOf(i))
					.ditcNm(String.valueOf(i))
					.build());
		}
		
		return ccList;
	}
	
	/**
	 * 마지막 출산년도
	 * 
	 * @return
	 */
	public static List<TbCommCodeVo> pcrtYearList() {
		List<TbCommCodeVo> pyList = new ArrayList<TbCommCodeVo>();
		
		LocalDate dt = LocalDate.now();
		for (int i = 0; i < 50; i++) {
			pyList.add(TbCommCodeVo.builder()
					.ditcCd(String.valueOf(dt.getYear() - i))
					.ditcNm(String.valueOf(dt.getYear() - i))
					.build());
		}
		
		return pyList;
	}
	
}

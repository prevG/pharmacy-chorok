package com.common.exception;

public class SizeCheckException extends CustomException implements ExceptionItem {
	
	private String item;
	private int min;
	private int max;
	
	public SizeCheckException(String item, int min, int max){
		this.min = min;
		this.max = max;
	}
	
	public int getMin() {
		return this.min;
	}
	
	public int getMax() {
		return this.max;
	}

	@Override
	public String getMessage() {
		return this.item + " is Short or Long size (min:" + this.min + ", max:" + this.max + ")";
	}

	@Override
	public String getErrorCode() {
		return "SIZE_CHECK_ERROR";
	}

	@Override
	public String getItem() {
		return this.item;
	}
}
package com.common.exception;

public class NumberCheckException extends CustomException implements ExceptionItem {
	
	private String item;
	
	public NumberCheckException(String item){
		this.item = item;
	}

	@Override
	public String getMessage() {
		return this.item + " is Not Number";
	}

	@Override
	public String getCode() {
		return "NUMBER_CHECK_ERROR";
	}

	@Override
	public String getItem() {
		return this.item;
	}
}
package com.common.exception;

public class EmailCheckException extends CustomException implements ExceptionItem {
	
	private String item;
	
	public EmailCheckException(String item){
		this.item = item;
	}

	@Override
	public String getMessage() {
		return this.item + " is Not Email address";
	}

	@Override
	public String getErrorCode() {
		return "EMAIL_CHECK_ERROR";
	}

	@Override
	public String getItem() {
		return this.item;
	}
}

package com.common.exception;

abstract public class CustomException extends Exception {
	
	public static final String SUCCESS = "success";
	public static final String FAIL = "fail";
	
	protected CustomException() {
		
	}
	
	public abstract String getErrorCode();

	@Override
	public abstract String getMessage();
}
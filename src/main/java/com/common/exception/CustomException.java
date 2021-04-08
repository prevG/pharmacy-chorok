package com.common.exception;

abstract public class CustomException extends Exception {
	
	protected CustomException() {
		
	}
	
	public abstract String getCode();

	@Override
	public abstract String getMessage();
}
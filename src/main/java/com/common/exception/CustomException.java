package com.common.exception;

abstract public class CustomException extends Exception {
	private String item = null;
	private String code = null;
	
	protected CustomException(String item, String code) {
		this.item = item;
		this.code = code;
	}
	
	public String getItem() {
		return this.item;
	}

	public String getCode() {
		return this.code;
	}

	@Override
	public abstract String getMessage();
}
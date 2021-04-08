package com.common.exception;

public class EmptyCheckException extends CustomException implements ExceptionItem {
	
	private String item;
	
	public EmptyCheckException(String item){
		this.item = item;
	}

	@Override
	public String getMessage() {
		return this.item + "is Empty";
	}

	@Override
	public String getCode() {
		return "EMPTY_CHECK_ERROR";
	}

	@Override
	public String getItem() {
		return this.item;
	}
}
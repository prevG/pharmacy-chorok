package com.common.exception;

public class NumberCheckException extends CustomException {
	public NumberCheckException(String item){
		super(item, "NUMBER_CHECK_ERROR");
	}

	@Override
	public String getMessage() {
		return super.getItem() + " is Not Number";
	}
}
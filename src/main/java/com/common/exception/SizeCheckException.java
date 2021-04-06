package com.common.exception;

public class SizeCheckException extends CustomException {
	public SizeCheckException(String item){
		super(item, "SIZE_CHECK_ERROR");
	}

	@Override
	public String getMessage() {
		return super.getItem() + " is Short or Long size";
	}
}
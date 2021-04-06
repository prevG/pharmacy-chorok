package com.common.exception;

public class EmailCheckException extends CustomException {
	public EmailCheckException(String item){
		super(item, "EMAIL_CHECK_ERROR");
	}

	@Override
	public String getMessage() {
		return super.getItem() + " is Not Email address";
	}
}

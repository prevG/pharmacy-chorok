package com.common.exception;

public class EmptyCheckException extends CustomException {
	public EmptyCheckException(String item){
		super(item, "EMPTY_CHECK_ERROR");
	}

	@Override
	public String getMessage() {
		return super.getItem() + "is Empty";
	}
}
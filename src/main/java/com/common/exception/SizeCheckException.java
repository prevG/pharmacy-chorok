package com.common.exception;

public class SizeCheckException extends CustomException {
	
	private int min;
	private int max;
	
	public SizeCheckException(String item, int min, int max){
		super(item, "SIZE_CHECK_ERROR");
		this.min = min;
		this.max = max;
	}

	@Override
	public String getMessage() {
		return super.getItem() + " is Short or Long size (min:" + this.min + ", max:" + this.max + ")";
	}
}
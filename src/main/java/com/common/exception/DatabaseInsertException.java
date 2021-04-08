package com.common.exception;

public class DatabaseInsertException extends CustomException {

	@Override
	public String getMessage() {
		return "No data Inserted";
	}

	@Override
	public String getCode() {
		return "DATABASE_INSERT_EROOR";
	}

}

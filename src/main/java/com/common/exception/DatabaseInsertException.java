package com.common.exception;

public class DatabaseInsertException extends CustomException {

	@Override
	public String getMessage() {
		return "No data Inserted";
	}

	@Override
	public String getErrorCode() {
		return "DATABASE_INSERT_EROOR";
	}

}

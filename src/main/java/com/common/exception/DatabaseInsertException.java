package com.common.exception;

public class DatabaseInsertException extends CustomException {

	public DatabaseInsertException() {
		super(null, "DATABASE_INSERT_EROOR");
	}

	@Override
	public String getMessage() {
		return "No data Inserted";
	}

}

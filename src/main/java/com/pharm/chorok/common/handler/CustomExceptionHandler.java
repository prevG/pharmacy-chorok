package com.pharm.chorok.common.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.pharm.chorok.domain.comm.ResponseMessage;

import lombok.extern.slf4j.Slf4j;

/**
 * Runtime exception handler class advice
 * 
 * @author Jaratus
 *
 */
@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseMessage> handleException() {
		log.error("handleException");
		return new ResponseEntity<>(new ResponseMessage("error", "요청 작업중에 오류가 발생했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

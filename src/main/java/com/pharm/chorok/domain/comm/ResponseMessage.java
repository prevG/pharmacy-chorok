package com.pharm.chorok.domain.comm;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class ResponseMessage {
     
    // HttpStatus
    private String status;
    
    // Http Default Message
    private String message;
    
    // Error Code
    private String errorCode;

    private Object data;

	public ResponseMessage(String status, String message) {
		this.status = status;
		this.message = message;
	}
    
}
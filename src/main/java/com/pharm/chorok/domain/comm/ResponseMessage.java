package com.pharm.chorok.domain.comm;

import lombok.Data;
 
@Data
public class ResponseMessage {
     
    // HttpStatus
    private String status;
    
    // Http Default Message
    private String message;
    
    // Error Code
    private String errorCode;

    private Object data;
}
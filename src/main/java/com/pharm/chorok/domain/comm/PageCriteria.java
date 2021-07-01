package com.pharm.chorok.domain.comm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class PageCriteria<T> {

	
	private T criteria;
	
	private Object data;
	
}

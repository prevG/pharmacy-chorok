function $onlyNum( obj ) {
    var result = $( obj ).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    $( obj ).val( result );
}


function $isEmpty(str) {
	/*
	*********************************************************************************************************
	*   함수설명  : 문자열이 빈문자열 혹은 공백만 있는 문자열이지 검사한다.
	* str    : 문자열
	***********************************************************************************************************
	*/
	if ($.trim(str) == '') return true;
	return false;
}

function $isEmptyObj( obj ) {
	
	if( obj != null && obj != 'undefined') return true;
	return false;
}
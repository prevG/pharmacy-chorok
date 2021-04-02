$( document ).ready( function() {
	
	/**
	 * timepicker에 사용될 값 조회
	 */
	var allowTimeList = [];
    rowList.find( function( obj) {
        var hhmm = moment( obj["startHm"] ).format("HH:mm");
        allowTimeList.push( hhmm );
    });

	/**
	 * 예약일시 datetimepicker 적용
	 */
    $.datetimepicker.setLocale('ko');
    $( "#rsvtDt" ).datetimepicker({
        minDate	: '2021-01-01',
        format	: 'Y-m-d H:i',
        weeks   : true,
        lang    : "ko",
        //scrollMonth : false,
        //scrollInput : false,
        allowTimes: allowTimeList
    });

	/**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
    $( "input[name=genTpCd]" ).off("change").on("change", function( e ){
		
		if($(this).prop('checked')){
     		$('input[name="genTpCd"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
   	});

	/**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
	$( "input[name=rsvtTpCd]" ).off("change").on("change", function( e ){
		
		if($(this).prop('checked')){
     		$('input[name="rsvtTpCd"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
	});
	
	
	$( "#btnSaveRsvtSch" ).off("click").on("click", function( e ){
		$.ajax({
			type : 'post',
	        url  : '/api/v1/main/rsvt/saveRsvtSch',
	        data : $("form[name=saveForm]").serialize(),
			success : function(data) {
				alert( "성공" );
			},
			error : function(xhr, ajaxOptions, thrownError) {
				alert( "실패" );
			}
		});
	});
});
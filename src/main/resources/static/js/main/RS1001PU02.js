$( document ).ready( function() {
	

	/**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
    $( "input[name=custGenTpCd]" ).off("change").on("change", function( e ){
		
		if($(this).prop('checked')){
     		$('input[name="custGenTpCd"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
   	});

	/**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
	$( "input[name=mrgYn]" ).off("change").on("change", function( e ){
		
		if($(this).prop('checked')){
     		$('input[name="mrgYn"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
	});
	
	
    /**************************************************************
     * 고객정보 저장
     **************************************************************/
	 $(document).on("click", "button[name='btnSaveCustomer']", function (e) {

		var params = $("form[name=saveCustForm]").serialize();
		$.ajax({
			type : 'post',
	        url  : '/api/v1/main/customer/saveCustomer',
	        data : params,
			success : function( result ) {

				if( result.status == "success" ) {
					alert( result.message );
					
				} else {
					alert( result.errorMessage );
				}
			}
		});
	});

	/**************************************************************
     * 차트 생성
     **************************************************************/
	 $(document).on("click", "button[name='btnNewChart']", function (e) {

		var params = $("form[name=saveCustForm]").serialize();
		$.ajax({
			type : 'post',
	        url  : '/api/v1/main/customer/createNewChart',
	        data : params,
			success : function( result ) {
				if( result.status == "success" ) {
					alert( result.message );
					table01.setData( result.data )
					
				} else {
					alert( result.errorMessage );
				}
			}
		});
	});


	/**************************************************************
     * 차트 목록 조회
     **************************************************************/
	loadConsultingChart = function() {
		var params = $("form[name=saveCustForm]").serialize();
		$.ajax({
			type : 'post',
	        url  : '/api/v1/main/customer/createNewChart',
			datatype : "json",
	        data : params,
			success : function( result ) {

				if( result.status == "success" ) {
					alert( result.message );
					table01.setData( result.data )
					
				} else {
					alert( result.errorMessage );
				}
			}
		});
	}
});
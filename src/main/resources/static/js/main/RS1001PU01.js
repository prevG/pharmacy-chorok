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
	

	/**************************************************************
     * 저장하기
     **************************************************************/
	 $(document).off("click", "button[name='btnSaveRsvtSch']").on("click", "button[name='btnSaveRsvtSch']", function (e) {

        var params = $("form[name=detailForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/main/reservation/saveRsvtSch',
            data: params,
            success: function (result) {

                if (result.status == "success") {
					alert(result.message);
					$(".modal").modal("hide");
					refreshTimeTable();
				} else {
					alert(result.errorMessage);
				}
            }
        });
	 });

	//저장후 타임테이블 새로고침
	refreshTimeTable = function () {
		var url = "/reservation/dashboard/reload";
		var params = {
			"currDt": moment($("#rsvtDt").val()).format("YYYYMMDD")
		};

		$("#time-table").load( url, params, function (response, status, xhr) {

			if (200 == xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log(response, status, xhr);
			}
		});
	}
});


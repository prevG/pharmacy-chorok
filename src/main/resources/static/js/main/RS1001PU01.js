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
	
	

	$("#rsvtCellNo").keydown(function(event) {

/*	    var key = event.charCode || event.keyCode || 0;
	    $text = $(this);
	    if (key !== 8 && key !== 9) {
		
		    
			var changedVal = $text.val().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
			
			console.log( "changedVal", changedVal );
	        $text.val( changedVal );

	        if ($text.val().length === 3) {
	            $text.val($text.val() + '-');
	        }
	        if ($text.val().length === 8) {
	            $text.val($text.val() + '-');
	        }
	    }
	 
	    return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));        
*/  
	});
	

	/**************************************************************
     * 저장하기
     **************************************************************/
	$("button[name='btnSaveRsvtSch']").off("click").on("click", function (e) {

		var params = $("form[name=detailForm]").serialize();
		$.ajax({
			type: 'post',
			url: '/api/v1/main/reservation/saveRsvtSch',
			data: params,
			success: function (result) {

				if (result.status == "success") {
					alert(result.message);
					$(".modal").modal("hide")

					refreshTimeTable();
				} else {
					alert(result.errorMessage);
				}
			}
		});
	});

	//저장후 타임테이블 새로고침
	refreshTimeTable = function () {
		var url = "/reservation/dashboard/refresh";
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


$( document ).ready( function() {


    /**************************************************************
     * 예약고객의 상세스케쥴 보기
     **************************************************************/
    $( document ).on("click", "button[name='rsvtSch']", function( e ) {    
	
		var params = {
			"id" : $(e.target ).closest("div").attr("data-id")
		}
		findReservationDetail( params );
    });

    /**************************************************************
     * 새 스케쥴 등록하기
     **************************************************************/
    $( document ).on("click", "button[name='btnNewSch']", function( e ) {   
		var params = {
			"id" : ""
		}
		findReservationDetail( params );
    });

    /**************************************************************
     * 지난주 스케쥴 보기
     **************************************************************/
    $( document ).on("click", "button[name='prevWeek']", function( e ) {   

		var params = {
            "currDt"   : $("#currDt").val(),
            "interval" : -7
        };
        moveWeekTimeTable( params );
    });

    /**************************************************************
     * 금주 스케쥴 보기
     **************************************************************/
    $( document ).on("click", "button[name='thisWeek']", function( e ) {   
        
        var params = {
            "currDt"   : $("#currDt").val(),
            "interval" : 0
        };
        moveWeekTimeTable( params );
    });

    /**************************************************************
     * 다음주 스케쥴 보기
     **************************************************************/
    $( document ).on("click", "button[name='nextWeek']", function( e ) {   

        var params = {
            "currDt"   : $("#currDt").val(),
            "interval" : 7
        };
        moveWeekTimeTable( params );
		
    });

    findReservationDetail = function( params ) {

		var url = "/reservation/RS1001MV/detail";
		$("#reservation-detail").load(url, params, function(response, status, xhr) {

			if (200==xhr.status) {
				$("#reservation-detail").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }

    moveWeekTimeTable = function( params ) {
        var url = "/reservation/RS1001MV/moveWeek";
		$("#time-table").load(url, params, function(response, status, xhr) {

			if (200==xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }

    refreshTimeTable = function( params ) {
        var url = "/reservation/RS1001MV/refresh";
		$("#time-table").load(url, params, function(response, status, xhr) {

			if (200==xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }


});
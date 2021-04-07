$( document ).ready( function() {

    $.contextMenu({
        selector: "button[name='rsvtSch']",
        items: {
            insert : {name: "상담 차트", callback: function(key, opt){ console.log( key, opt); }},
            modify : {name: "스케쥴 수정"  , callback: function(key, opt){ console.log( key, opt); }}
        }
        // there's more, have a look at the demos and docs...
    });

    /**************************************************************
     * 스케쥴 클릭시 상세스케쥴 확인
     **************************************************************/
    $( document ).on("click", "button[name='rsvtSch'], button[name='btnNewSch']", function( e ) {    
        
        e.preventDefault(); //remove href function
        var params = {
        	"id" : $(e.target ).closest("div").attr("data-id")
        };	
		$(".modal .modal-content").load("/rsvt/rs1001p1", params, function (data, status, xhr) {			
			$(".modal").modal('show');
			$("#rsvtDt").focus();
		});
    });

    /**************************************************************
     * 새 스케쥴 등록하기
     **************************************************************/
    $( document ).on("click", "button[name='btnNewSch']", function( e ) {   
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

    moveWeekTimeTable = function( params ) {
        var url = "/rsvt/rs1001m/moveWeek";
		$("#time-table").load(url, params, function(response, status, xhr) {

			if (200==xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }

    refreshTimeTable = function( params ) {
        var url = "/rsvt/rs1001m/refresh";
		$("#time-table").load(url, params, function(response, status, xhr) {

			if (200==xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }
});
$( document ).ready( function() {


    /**************************************************************
     * 예약고객 상세스케쥴 클릭시 상세스케쥴 확인
     **************************************************************/
    $( document ).on("click", "button[name='rsvtSch']", function( e ) {    
        
        e.preventDefault(); //remove href function
        var params = {
        	"rsvtId" : $(e.target ).closest("div").attr("data-id")
        };	

		$("#modalRsvtDtl .modal-content").load("/reservation/RS1001PU01", params, function (data, status, xhr) {			
			$(".modal").modal('show');
		});
    });

    /**************************************************************
     * 금주 스케쥴보기
     **************************************************************/
    $( document ).on("click", "button[name='btnThisWeek']", function( e ) {    
        
        e.preventDefault(); //remove href function
        location.href = "/reservation/RS1001MV";
    });

    refreshTimeTable = function( params ) {
        var url = "/reservation/RS1001MV/refresh";
		$("#reservation-detail").load(url, params, function(response, status, xhr) {
			if (200==xhr.status) {
				$("#time-table").html(response);
			} else {
				console.log( response, status, xhr );
			}
		});
    }
});
$( document ).ready( function() {
	
	var allowTimeList = [];
	rowList.find( function( obj) {
		var hhmm = moment( obj["startHm"] ).format("HH:mm");
		allowTimeList.push( hhmm );
	});
	
	$( document ).on( "click", "#rsvtDt", function(e) {	
		
		$( e.target ).datetimepicker({
			minDate	: '2021-01-01',
			format	: 'Y-m-d H:i',
			weeks   : true,
			lang    : "ko",
			//scrollMonth : false,
			//scrollInput : false,
			allowTimes: allowTimeList
		});
		$.datetimepicker.setLocale('ko');
		
	});
    $("button[name='rsvtSch'").off("click").on("click", function( e ) {    
        
        e.preventDefault(); //remove href function
        var params = {
        	"id" : $(e.target ).closest("div").attr("data-id")
        };	
		$(".modal .modal-content").load("/rsvt/rs1001p1", params, function (data, status, xhr) {			
			$(".modal").modal('show');
		});
    });
});
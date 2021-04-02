$( document ).ready( function() {


    $( document ).on("click", "button[name='rsvtSch']", function( e ) {    
        
        e.preventDefault(); //remove href function
        var params = {
        	"id" : $(e.target ).closest("div").attr("data-id")
        };	
		$(".modal .modal-content").load("/rsvt/rs1001p1", params, function (data, status, xhr) {			
			$(".modal").modal('show');
			$("#rsvtDt").focus();
		});
    });
});
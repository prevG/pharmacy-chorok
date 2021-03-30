$( document ).ready( function() {

    // $("a[name='rsvtSch'").off("click").on("click", function( e ) {
    $("button[name='rsvtSch'").off("click").on("click", function( e ) {    
        
        e.preventDefault(); //remove href function
        $(".modal").modal('show');
        
    });
});
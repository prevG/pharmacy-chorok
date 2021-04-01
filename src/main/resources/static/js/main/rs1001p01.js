$( document ).ready( function() {
	
	
    
    var allowTimeList = [];
    rowList.find( function( obj) {
        var hhmm = moment( obj["startHm"] ).format("HH:mm");
        allowTimeList.push( hhmm );
    });

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
});
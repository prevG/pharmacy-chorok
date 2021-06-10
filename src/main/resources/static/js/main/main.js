$( document ).ready( function() {


    var table01 = new Tabulator("#table01", {
        height: "270px",
        selectable : 1,
        headerSort:false,
        ajaxURL		: "/api/v1/main/chart/dashList01",
        ajaxConfig	: "POST",
        layout:"fitDataFill",
        columns: [
            { title: "차트번호", field: "cnstId"     , width:60,  hozAlign:"center", visible : true},
            { title: "고객명",  field: "custUsrNm"  , width:120,  hozAlign:"center", visible : true},
            { title: "연락처", field: "custCellNo"  , width:120, hozAlign:"center"}
        ],
        rowDblClick:function(e, row){
            row.toggleSelect();
            loadChartByCnstId( row );
            callSrvChart( row  );
        }
    });
    var table02 = new Tabulator("#table02", {
        height: "270px",
        selectable : 1,
        headerSort:false,
        layout:"fitDataFill",
        columns: [
            { title: "차트번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담일시", field: "cnstDt"  , width:120, hozAlign:"center"}
        ],
        rowDblClick:function(e, row){
            row.toggleSelect();
            loadChartByCnstId( row );
            callSrvChart( row  );
        }
    });
    var table03 = new Tabulator("#table03", {
        height: "270px",
        selectable : 1,
        headerSort:false,
        layout:"fitDataFill",
        columns: [
            { title: "차트번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담일시", field: "cnstDt"  , width:120, hozAlign:"center"}
        ],
        rowDblClick:function(e, row){
            row.toggleSelect();
            loadChartByCnstId( row );
            callSrvChart( row  );
        }
    });
    var table04 = new Tabulator("#table04", {
        height: "270px",
        selectable : 1,
        headerSort:false,
        layout:"fitDataFill",
        columns: [
            { title: "차트번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담번호", field: "cnstId"  , width:60,  hozAlign:"center", visible : true},
            { title: "상담일시", field: "cnstDt"  , width:120, hozAlign:"center"}
        ],
        rowDblClick:function(e, row){
            row.toggleSelect();
            loadChartByCnstId( row );
            callSrvChart( row  );
        }
    });
    
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
});
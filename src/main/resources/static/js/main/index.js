$( document ).ready( function() {

    $("#table01").datagrid({
	    url: '/api/v1/main/chart/dashList01',
        width: "100%",
        height: "auto",
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'},
        ]]
    });  
    $("#table02").datagrid({
	    url: '/api/v1/main/chart/dashList02',
        width: "100%",
        height: "auto",
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'},
        ]]
    });  
    $("#table03").datagrid({
	    url: '/api/v1/main/chart/dashList03',
        width: "100%",
        height: "auto",
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: "현재 복용 일시중지 중인 고객이 없습니다.",
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'},
            {field: 'lastDosgDt', title: '마지막복용일자', align: 'center', width: '100'},
            {field: 'passDays'  , title: '복용중단일수'  , align: 'center', width: '100'},
        ]]
    });
    $("#table04").datagrid({
	    // url: '/api/v1/main/chart/dashList04',
        width: "100%",
        height: "auto",
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: "금일 택배발송 해야할 목록이 없습니다.",
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'}
        ]]
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

    /**************************************************************
     * 복용상담스케쥴보기(약사님)
     **************************************************************/
    $( document ).on("click", "button[name='btnDosingListByChemist']", function( e ) {    
        
        e.preventDefault(); //remove href function
        location.href = "/customer/CUS2001ML";
    });

    /**************************************************************
     * 복용상담스케쥴보기(실장님님)
     **************************************************************/
    $( document ).on("click", "button[name='btnDosingListByCounselor']", function( e ) {    
        
        e.preventDefault();
        location.href = "/customer/CUS2001ML";
    });

    /**************************************************************
     * 복용상담스케쥴보기(약사님)
     **************************************************************/
    $( document ).on("click", "button[name='btnCustListByStopDosing']", function( e ) {    
    
        e.preventDefault(); //remove href function
        location.href = "/customer/CUS2001ML";
    });
    
    /**************************************************************
     * 복용상담스케쥴보기(실장님님)
     **************************************************************/
    $( document ).on("click", "button[name='btnTransitList']", function( e ) {    
        
        e.preventDefault();
        location.href = "/customer/CUS2001ML";
    });
});
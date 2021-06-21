$( document ).ready( function() {

    $.datetimepicker.setLocale('ko');
    $( "#dosgDt" ).datetimepicker({
        format	: 'Y-m-d',
        weeks   : true,
         timepicker:false
    });

    /**************************************************************
     * 고객목록 테이블
     **************************************************************/
    var table01 = new Tabulator("#table01", {
        height: "600px",
        selectable : 1,
        headerSort:false,
        layout:"fitDataFill",
        ajaxURL		: "/api/v1/main/customer/findCustomerByDosgDt",
        ajaxConfig	: "POST",
        ajaxParams  : {
            "dosgDt"  : $("#dosgDt").val(),
        },
        columns: [
            { title: "고객번호" , field: "custId"     , width:60,  hozAlign:"center", visible : true},
            { title: "고객명"  ,  field: "custUsrNm" , width:160, hozAlign:"left"
            , formatter:function(cell, formatterParams){
                var value = cell.getValue();
                return "<span style='color:blue;'>" + value + "</span>";
                }
            },
            { title: "휴대번호"    , field: "custCellNo" , width:140, hozAlign:"center"},
            { title: "복용구분"    , field: "custBirthDt", width:140, hozAlign:"center"},
            { title: "복용단계"    , field: "cnstGenTpCd", width:140 , hozAlign:"center"},
            { title: "통화가능시간" , field: "zipCode"    , width:140 , hozAlign:"center"},
            { title: "담당약사"    , field: ""      , width:300, hozAlign:"left"},
            { title: "담당상담실장" , field: "addr2"      , width:300, hozAlign:"left"}
        ],
        rowDblClick:function(e, row){

	        var custId = row.getCell("custId").getValue();
            location.href="/customer/CUS1002MV/"+custId
        }
    });
    
    /**************************************************************
     * 예약고객 상세스케쥴 클릭시 상세스케쥴 확인
     **************************************************************/
    $( document ).on("click", "button[name='btnSearch']", function( e ) {    
        table01.setData("/api/v1/main/customer/findCustomerByDosgDt",
        {
            "dosgDt"  : $("#dosgDt").val()
        });
    });

});
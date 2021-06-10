$( document ).ready( function() {


    /**************************************************************
     * 고객목록 테이블
     **************************************************************/
    var table01 = new Tabulator("#table01", {
        height: "600px",
        selectable : 1,
        headerSort:false,
        layout:"fitDataFill",
        ajaxURL		: "/api/v1/main/customer/findAllCustomer",
        ajaxConfig	: "POST",
        ajaxParams  : {
            "custUsrNm"  : $("#custUsrNm").val(),
            "custCellNo" : $("#custCellNo").val()
        },
        columns: [
            { title: "고객번호" , field: "custId"     , width:60,  hozAlign:"center", visible : true},
            { title: "고객명"  ,  field: "custUsrNm" , width:160, hozAlign:"left"
            , formatter:function(cell, formatterParams){
                var value = cell.getValue();
                return "<span style='color:blue;'>" + value + "</span>";
                }
            },
            { title: "휴대번호" , field: "custCellNo" , width:120, hozAlign:"center"},
            { title: "생년월일" , field: "custBirthDt", width:100, hozAlign:"center"},
            { title: "성별"    , field: "cnstGenTpCd", width:80 , hozAlign:"center"},
            { title: "우편번호" , field: "zipCode"    , width:80 , hozAlign:"center"},
            { title: "주소1"   , field: "addr1"      , width:300, hozAlign:"left"},
            { title: "주소2"   , field: "addr2"      , width:300, hozAlign:"left"}
        ],
        rowDblClick:function(e, row){

	        var custId = row.getCell("custId").getValue();
            location.href="/customer/CUS1002MV/"+custId
        }
    });

    // /api/v1/main/customer/findAllCustomer
    
    /**************************************************************
     * 예약고객 상세스케쥴 클릭시 상세스케쥴 확인
     **************************************************************/
    $( document ).on("click", "button[name='btnSearch']", function( e ) {    
        table01.setData("/api/v1/main/customer/findAllCustomer",
        {
            "custUsrNm"  : $("#custUsrNm").val(),
            "custCellNo" : $("#custCellNo").val()
        });
    });

});
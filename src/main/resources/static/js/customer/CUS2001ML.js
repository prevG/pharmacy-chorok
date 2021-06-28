$( document ).ready( function() {

    //검색조건 복용일자 
    $('#dosgDt').datebox({
    });


    /**************************************************************
     * 고객목록 테이블
     **************************************************************/
     $('#table01').datagrid({
	    url: "/api/v1/main/customer/findCustomerByDosgDt",
        queryParams : {
            "dosgDt" : $("#dosgDt").val()
        },
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'custId',
	    rownumbers: true,
		fitColumns: true, 
        fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        pagination: true,
        pageSize: 50,
        pageList: [50],
        dragSelection: true,
        onDblClickRow: function(value) {
        	fnCustInfo();
        },
        columns:[[
            {field: 'custId'   , title: '고객번호', align: 'center', halign: 'center', width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', halign: 'center', width: '80',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo' , title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'},
            {field: 'custBirthDt', title: '복용구분'    , align: 'center', width: '80'},
            {field: 'custGenTpCd', title: '복용단계'    , align: 'center', width: '80'},
            {field: 'cnstGenTpCd', title: '성별'       , align: 'center', width: '80'},
            {field: 'custAge'    , title: '나이'       , align: 'center', width: '80'},
            {field: 'picUsrNo'   , title: '담당약사'    , align: 'center', width: '80'},
            {field: 'cicUsrNo'   , title: '담당상담실장' , align: 'center', width: '80'},
            {field: 'zipCode'    , title: '우편번호'    , align: 'center', width: '80'},
            {field: 'addr1'      , title: '주소'       , align: 'left', halign: 'center', width: '200'},
            {field: 'addr2'      , title: '상세주소'    , align: 'left', halign: 'center', width: '200'},
        ]]
	});
});


function fnSearch() {
    var dosgDtObj = $("#dosgDt");
    if( $isEmpty( dosgDtObj.val() )) {
        alert("복용일자 입력 후 검색버튼을 클릭해 주세요.");
        dosgDtObj.focus();
        return;
    }
	var queryParams = $("#table01").datagrid('options').queryParams;
	queryParams.dosgDt = $("#dosgDt").val();
	
	$('#table01').datagrid('reload');
}

function fnCustInfo() {
	var row = $("#table01").datagrid("getSelected");
	if (!row) return;
	
	location.href = '/customer/CUS1002MV_2/'+ row.custId;
}
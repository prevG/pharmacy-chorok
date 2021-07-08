$( document ).ready( function() {

    //검색조건 복용일자 
    $('#dosgDt').datebox({
    });

    /**************************************************************
     * 고객목록 테이블
     **************************************************************/
     $('#table01').datagrid({
	    //url: "/api/v1/main/customer/findCustomerByDosgDt",
        queryParams : {
            "dosgDt" 	: $("#dosgDt").val(),
            "picUsrNo" 	: $("#picUsrNo").val(),
            "pic2UsrNo" : $("#pic2UsrNo").val()
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
        			return '<span style="color:blue;font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo' , title: '핸드폰번호'  , align: 'center', width: '100', editor: 'numberbox'},
            {field: 'cnstId'     , title: '상담번호'    , align: 'center', width: '100'},
            {field: 'dosgDt'     , title: '복용일자'    , align: 'center', width: '100'},
            {field: 'dosgTpNm'	 , title: '복용구분'    , align: 'center', width: '80'},
            {field: 'dosgTpNm'   , title: '복용단계'    , align: 'center', width: '80'},
            {field: 'custGenTpNm', title: '성별'       , align: 'center', width: '80'},
            {field: 'custAge'    , title: '나이'       , align: 'center', width: '80'},
            {field: 'picUsrNm'   , title: '담당한약사'   , align: 'center', width: '80'},
            {field: 'pic2UsrNm'  , title: '담당상담실장' , align: 'center', width: '80'},
            {field: 'cnstHhNm'	 , title: '상담가능시간' , align: 'center', width: '80'},
			{field: 'cnstHhMemo' , title: '상담시간메모' , align: 'center', width: '200'},
            {field: 'zipCode'    , title: '우편번호'    , align: 'center', width: '80'},
            {field: 'addr1'      , title: '주소'       , align: 'left', halign: 'center', width: '200'}
        ]]
	});
	
	fnSearch();
});

function fnSearch() {
    var dosgDtObj = $("#dosgDt");
    if( $isEmpty( dosgDtObj.val() )) {
        alert("복용일자 입력 후 검색버튼을 클릭해 주세요.");
        dosgDtObj.focus();
        return;
    }
	var queryParams = $("#table01").datagrid('options').queryParams;
	queryParams.dosgDt 		= $("#dosgDt").val();
	queryParams.picUsrNo 	= $("#picUsrNo").val();
	queryParams.pic2UsrNo 	= $("#pic2UsrNo").val();
	
	$('#table01').datagrid('load', '/api/v1/main/customer/findCustomerByDosgDt');
}

function fnCustInfo() {
	var row = $("#table01").datagrid("getSelected");
	if (!row) return;
	
	location.href = '/customer/CUS1002MV_2/'+ row.custId +'/1';
}
/******************************************************
 * 
 * customer
 * 
 ******************************************************/
 
function fnInit() {
	$('#dg').datagrid({
	    url: '/api/v1/main/customer/findAllCustomer',
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
        onDblClickRow: function() {
        alert('hi');
        },
        columns:[[
			{
				field: 'custId', 
				title: '고객번호',
				align: 'center',  
				width: '100'
			},
        	{
        		field: 'custUsrNm', 
        		title: '고객이름', 
        		align: 'center', 
        		width: '150', 
        		editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
        	{
        		field: 'custCellNo', 
        		title: '핸드폰번호', 
        		align: 'center', 
        		width: '150', 
        		editor: 'numberbox'
        	},
        	{
        		field: 'custBirthDt', 
        		title: '생년월일', 
        		align: 'center', 
        		width: '200', 
        		editor: 'text'
        	},
        	{
        		field: 'custGenTpCd', 
        		title: '성별', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'mrgYn', 
        		title: '결혼유무', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'checkbox',
        			options: { on: 'Y', off: 'N' }
        		}
        	},
        	{
        		field: 'zipCode', 
        		title: '우편번호', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'addr1', 
        		title: '주소', 
        		align: 'center', 
        		width: '200', 
        		editor: 'text'
        	},
        	{
        		field: 'addr2', 
        		title: '상세주소', 
        		align: 'center', 
        		width: '150', 
        		editor: 'text'
        	},
        	{
        		field: 'delYn', 
        		title: '삭제여부', 
        		align: 'center', 
        		width: '100', 
        		editor: { 
        			type: 'checkbox',
        			options: { on: 'Y', off: 'N' }
        		}
        	},
        ]]
	});
}

function fnSearch() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.custUsrNm = $("#custUsrNm").val();
	queryParams.custCellNo = $('#custCellNo').val();
	
	$('#dg').datagrid('reload');
}

function fnNewCust() {

}

function fnCustInfo() {
	var row = $("#dg").datagrid("getSelected");
	if (!row) return;
	
	location.href = '/customer/CUS1002MV/'+ row.custId;
}

$(document).ready(function() {
	fnInit();
});

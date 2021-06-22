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

function fnNewCustPop() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','신규등록');
    $('#addFrm').form('clear');
    $('#addFrm').form('load', {
    	/*dlg_custGenTpCd : 'F',
    	dlg_mrgYn : 'Y',
    	dlg_brstFdgYn : 'N',*/
		dlg_delYn : '00000'
	});
}

function addUser() {
	var param = {
		custUsrNm : $('#addFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : $('#addFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : $('#addFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : $('#addFrm input[name=dlg_custGenTpCd]:checked').val(),
		mrgYn : $('#addFrm input[name=dlg_mrgYn]:checked').val(),
		pcrtChdCnt : $('#addFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
		lstPcrtYear : $('#addFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
		brstFdgYn : $('#addFrm input[name=dlg_brstFdgYn]:checked').val(),
		vistTpCd : $('#addFrm input[name=dlg_vistTpCd]:checked').val(),
		zipCode : $('#addFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
		addr1 : $('#addFrm input[textboxName=dlg_addr1]').textbox('getValue'),
		addr2 : $('#addFrm input[textboxName=dlg_addr2]').textbox('getValue'),
		delYn : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue') === '00000' ? 'N' : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue')
	};
	
	$.post('/customer/add', param, function(result) {
		if (result.status === 'success') {
			$.messager.show({ title: 'Success', msg: result.message });
			fnSearch();
		} else {
			$.messager.show({ title: 'Error', msg: result.message });
			return;
		}
		$('#addDlg').dialog('close');
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

$(document).ready(function() {
	fnInit();
});

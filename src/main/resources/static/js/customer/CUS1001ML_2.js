/******************************************************
 * 
 * 고객목록
 * 
 ******************************************************/
var gC1008 = [];
var gC1020 = [];

function fnInit() {
	gC1008 = getCodeData('C1008'); // 남성/여성
	gC1020 = getCodeData('C1020'); // 기혼/미혼
	
	$('#dg').datagrid({
	    //url: '/api/v1/main/customer/findAllCustomer',
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
        			return '<span style="color:blue;font-weight:bold;">'+ value +'</span>';
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
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1008, required: true }
        		},
        		formatter: function(value, row) {
        			return row.custGenTpCdVal;
        		}
        	},
        	{
        		field: 'mrgYn', 
        		title: '결혼유무', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1020, required: true }
        		},
        		formatter: function(value, row) {
        			return row.mrgYnVal;
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
        		editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span>'+ (value) ? value : 'N' +'</span>';
        		}
        	},
        ]]
	});
}

function fnSearch() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.custUsrNm = $("#custUsrNm").val();
	queryParams.custCellNo = $('#custCellNo').val();
	
	$('#dg').datagrid('load', '/api/v1/main/customer/findAllCustomer');
}

function fnCustInfo() {
	var row = $('#dg').datagrid('getSelected');
	if (!row) {
		$.messager.confirm('고객목록', '고객목록에서 상담고객을 선택해 주세요');
		return;	
	}
	
	location.href = '/customer/CUS1002MV_2/'+ row.custId;
}

function fnNewCustPop() {
	$('#addCustDlg').dialog('open').dialog('center').dialog('setTitle','신규등록');
    $('#addCustFrm').form('clear');
    $('#addCustFrm').form('load', {
    	dlg_pcrtChdCnt : 1
	});
}

function saveNewCust() {
	var param = {
		custUsrNm : 	$('#addCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : 	$('#addCustFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : 	$('#addCustFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : 	$('#addCustFrm input[name=dlg_custGenTpCd]:checked').val(),
		mrgYn : 		$('#addCustFrm input[name=dlg_mrgYn]:checked').val(),
		pcrtChdCnt : 	$('#addCustFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
		lstPcrtYear : 	$('#addCustFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
		brstFdgYn : 	$('#addCustFrm input[name=dlg_brstFdgYn]:checked').val(),
		vistTpCd : 		$('#addCustFrm input[name=dlg_vistTpCd]:checked').val(),
		zipCode : 		$('#addCustFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
		addr1 : 		$('#addCustFrm input[textboxName=dlg_addr1]').textbox('getValue'),
		addr2 : 		$('#addCustFrm input[textboxName=dlg_addr2]').textbox('getValue'),
		delYn : 		'N'
	};
	
	$.post('/customer/add', param, function(result) {
		if (result.status === 'success') {
			$.messager.show({ title: 'Success', msg: result.message });
			fnSearch();
		} else {
			$.messager.alert('사용자 등록', result.message);
			return;
		}
		$('#addCustDlg').dialog('close');
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.alert('사용자 등록', xhr.responseJSON.message, 'error');
		return;
	});
}

$(document).ready(function() {
	fnInit();
	fnSearch();
	
	$('#custUsrNm').textbox('textbox').bind('keydown', function(e) {
		if (e.keyCode === 13) fnSearch();
	});
	$('#custCellNo').numberbox('textbox').bind('keydown', function(e) {
		if (e.keyCode === 13) fnSearch();
	});
	
	/**************************************************************
     * "고객상담정보" 클릭시
     **************************************************************/
	$(document).off("click", "#btnCustInfo").on("click", "#btnCustInfo", function (e) {

		fnCustInfo();
	});
	
	/**************************************************************
     * "신규등록" 클릭시
     **************************************************************/
	$(document).off("click", "#btnNewCustPop").on("click", "#btnNewCustPop", function (e) {

		fnNewCustPop();
	});

	/**************************************************************
     * "저장" 클릭시
     **************************************************************/
	$(document).off("click", "#btnSaveCust").on("click", "#btnSaveCust", function (e) {

		saveNewCust();
	});
});

function fnZipCode() {
	sample2_execDaumPostcode2();
}

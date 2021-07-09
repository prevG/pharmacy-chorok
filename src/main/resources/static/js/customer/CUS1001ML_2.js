/******************************************************
 * 
 * 고객목록 (CUS1001ML)
 * 
 ******************************************************/
$(document).ready(function() {
	var CUS1001ML = {
		init: function() {

		    /**************************************************************
		     * 고객목록 테이블
		     **************************************************************/
			$('#dg01').datagrid({
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
		        	$("#btnCustInfo").trigger('click');
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
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.custGenTpCdVal;
		        		}
		        	},
		        	{
		        		field: 'mrgYn', 
		        		title: '결혼유무', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
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
			
			/**************************************************************
		     * 엔터키 바인딩
		     **************************************************************/
			$('#custUsrNm').textbox('textbox').bind('keydown', function(e) {
				if (e.keyCode === 13) CUS1001ML.search();
			});
			$('#custCellNo').numberbox('textbox').bind('keydown', function(e) {
				if (e.keyCode === 13) CUS1001ML.search();
			});
			$("#custDlg").dialog({
				onClose: function() {
					CUS1001ML.search();
				}
			});
			
			/**************************************************************
		     * "검색" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSearchCust").on("click", "#btnSearchCust", function (e) {
		
				CUS1001ML.search();
			});

			/**************************************************************
		     * "고객상담정보" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnCustInfo").on("click", "#btnCustInfo", function (e) {
				var row = $('#dg01').datagrid('getSelected');
				if (!row) {
					$.messager.confirm('고객목록', '고객목록에서 고객을 선택해 주세요');
					return;	
				}
	
				$("#custDlg").load("/customer/CUS1001ML_D/"+ row.custId +"/0", function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객정보');
					$.parser.parse($('#custDlg'));
		        });
			});
			
			/**************************************************************
		     * "신규등록" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewCustPop").on("click", "#btnNewCustPop", function (e) {
				
				$("#custDlg").load("/customer/CUS1001ML_D/0/0", function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객정보');
					$.parser.parse($('#custDlg'));
		        });
			});
		},
		search: function() {
			var queryParams = $("#dg01").datagrid('options').queryParams;
			queryParams.delYn 		= "N";
			queryParams.custUsrNm 	= $("#custUsrNm").val();
			queryParams.custCellNo 	= $('#custCellNo').val();
			
			$('#dg01').datagrid('load', '/api/v1/main/customer/findAllCustomer');
		}
	};
	
	// init
	CUS1001ML.init();
	CUS1001ML.search();
});

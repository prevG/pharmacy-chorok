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
				fitColumns: false, 
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
		        		formatter: function(value, row) { return '<a href="javascript:void(0)" style="font-weight:bold;">'+ value +'</a>'; }
		        	},
		        	{
		        		field: 'custCellNo', 
		        		title: '핸드폰번호', 
		        		align: 'center', 
		        		width: '120'
		        	},
		        	{
		        		field: 'custBirthDt', 
		        		title: '생년월일', 
		        		align: 'center', 
		        		width: '120'
		        	},
		        	{
		        		field: 'custGenTpCd', 
		        		title: '성별', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return row.custGenTpCdNm; }
		        	},
		        	{
		        		field: 'mrgYn', 
		        		title: '결혼유무', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return row.mrgYnNm; }
		        	},
		        	{
		        		field: 'custMemo2', 
		        		title: '특이사항', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return $isEmpty(row.custMemo2) ? '' : '***'; }
		        	},
		        	{
		        		field: 'rcmdCnt', 
		        		title: '추천인수', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return row.rcmdCnt > 0 ? row.rcmdCnt : ''; }
		        	},
		        	{
		        		field: 'mileage', 
		        		title: '마일리지', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) {
		        			return Number(row.mileage) === 0 ? '' : Number(row.mileage);
		        		}
		        	},
		        	{
		        		field: 'zipCode', 
		        		title: '우편번호', 
		        		align: 'center', 
		        		width: '100'
		        	},
		        	{
		        		field: 'addr1', 
		        		title: '주소', 
		        		align: 'center', 
		        		width: '200'
		        	},
		        	{
		        		field: 'addr2', 
		        		title: '상세주소', 
		        		align: 'center', 
		        		width: '150'
		        	},
		        	{
		        		field: 'delYn', 
		        		title: '사용여부', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return (value === 'N') ? '사용' : '미사용'; }
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
				
				$("#custDlg").remove(); // need to clear...
				$("#custDlgWrap").load("/customer/CUS1001ML_D/"+ row.custId +"/0", function (data, status, xhr) {
					$.parser.parse($('#custDlgWrap'));
					$('#custDlg').window('open').window('center').window('setTitle', '고객상담정보');
		        });
			});
			
			/**************************************************************
		     * "신규등록" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewCustPop").on("click", "#btnNewCustPop", function (e) {
				
				$("#custDlg").remove(); // need to clear...
				$("#custDlgWrap").load("/customer/CUS1001ML_D/0/0", function (data, status, xhr) {
					$.parser.parse($('#custDlgWrap'));
					$('#custDlg').window('open').window('center').window('setTitle', '고객상담정보');
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

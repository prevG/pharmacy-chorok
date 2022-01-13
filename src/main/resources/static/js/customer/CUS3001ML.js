/******************************************************
 * 
 * 복용상담스케줄 (CUS2001ML)
 * 
 ******************************************************/
$( document ).ready( function() {
	var CUS2001ML = {
		init: function() {

		    /**************************************************************
		     * 고객목록 테이블
		     **************************************************************/
		     $('#table01').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'custId',
			    rownumbers: true,
				//fitColumns: true, 
		        //fit: false,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
/*		        pagination: true,
		        pageSize: 50,
		        pageList: [50],*/
		        dragSelection: true,
				remoteSort : false,
				width:'100%',
		        onDblClickRow: function(value) {
		        	$("#btnCustInfo").trigger('click');
		        },
			    frozenColumns:[[
			        {field: 'custId'   , title: '고객번호', align: 'center', halign: 'center', width: '80', sortable:true},
		        	{field: 'custUsrNm', title: '고객이름', align: 'center', halign: 'center', width: '80', sortable:true,
		        		formatter: function(value, row) { return '<a href="javascript:void(0)" style="font-weight:bold;">'+ value +'</a>'; }
		        	},
		            {field: 'custCellNo' , title: '핸드폰번호'  , align: 'center', width: '100', editor: 'numberbox', sortable:true}
			    ]],
		        columns:[[
					{field: 'dlvDt'       , title: '택배배송일'    , align: 'center', width: '80', sortable:true },
					{field: 'payTpNm'     , title: '결제유형'     , align: 'center', width: '140', sortable:true },		            
		            {field: 'cateTpNmDesc', title: '감량/요요'    , align: 'center', width: '110', sortable:true},
		            {field: 'dosgTpNmDesc', title: '감량종류'     , align: 'center', width: '110', sortable:true},
		            {field: 'zipCode'     , title: '우편번호'    , align: 'center', width: '80', sortable:true},
		            {field: 'addr1'       , title: '주소'       , align: 'left', halign: 'center', width: '300', sortable:true},
		            {field: 'picUsrNm'    , title: '담당한약사'   , align: 'center', width: '80', sortable:true},
		            {field: 'pic2UsrNm'   , title: '담당상담실장' , align: 'center', width: '90', sortable:true},
					{field: 'cnstDt'      , title: '상담일시'     , align: 'center', width: '110', sortable:true },
		            {field: 'cnstId'      , title: '상담번호'     , align: 'center', width: '80', sortable:true },
		        ]]
			});
			
			/**************************************************************
		     * "고객상담정보" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnCustInfo").on("click", "#btnCustInfo", function (e) {
				var row = $('#table01').datagrid('getSelected');
				if (!row) {
					$.messager.confirm('고객목록', '고객목록에서 고객을 선택해 주세요');
					return;	
				}
	
				$("#custDlg").remove(); // need to clear...
				$("#custDlgWrap").load("/customer/CUS1001ML_D/"+ row.custId +"/1", function (data, status, xhr) {
					$.parser.parse($('#custDlgWrap'));
					$('#custDlg').window({
						onBeforeClose: function() { CUS2001ML.search(); }
					})
					.window('open')
					.window('center')
					.window('setTitle', '고객상담정보');
		        });
			});
		},
		search: function() {
		    var dlvDtObj = $("#dlvDt");
		    var queryParams = $("#table01").datagrid('options').queryParams;
			queryParams.dlvDt 		 = $("#dlvDt").val();
			queryParams.custUsrNm 	 = $("#custUsrNm").val();
			queryParams.custCellNo 	 = $('#custCellNo').val();
			queryParams.picUsrNo 	 = $("#picUsrNo").val();
			queryParams.pic2UsrNo 	 = $("#pic2UsrNo").val();
			queryParams.payTpCd 	 = $("#payTpCd").val();
			
			var dlvDpuYn        = $('#searchFrm input[checkboxname=eqGtYn]').checkbox('options').checked;
			if( dlvDpuYn ) {
				queryParams.eqGtYn   = "Y";
			} else {
				queryParams.eqGtYn   = "";
			}
						
			$('#table01').datagrid('load', '/api/v1/main/customer/findCustomerByDlvDt');
		}
	};
	
	// init
	CUS2001ML.init();
	CUS2001ML.search();
	
	 /**************************************************************
     * 검색버튼 클릭시
     **************************************************************/
    $( document ).on("click", "#btnSearchCust", function( e ) {    
        CUS2001ML.search();
    });

	/**************************************************************
     * 엔터키 바인딩
     **************************************************************/
	$('#custUsrNm').textbox('textbox').bind('keydown', function(e) {
		if (e.keyCode === 13) CUS2001ML.search();
	});
	$('#custCellNo').numberbox('textbox').bind('keydown', function(e) {
		if (e.keyCode === 13) CUS2001ML.search();
	});
});
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
		            {field: 'custId'   , title: '고객번호', align: 'center', halign: 'center', width: '80'},
		        	{field: 'custUsrNm', title: '고객이름', align: 'center', halign: 'center', width: '80',
		        		formatter: function(value, row) { return '<a href="javascript:void(0)" style="font-weight:bold;">'+ value +'</a>'; }
		        	},
		            {field: 'custCellNo' , title: '핸드폰번호'  , align: 'center', width: '100', editor: 'numberbox'},
		            {field: 'custGenTpNm', title: '성별'       , align: 'center', width: '80'},
		            {field: 'custAge'    , title: '나이'       , align: 'center', width: '60'},
		            {field: 'cnstId'     , title: '상담번호'    , align: 'center', width: '80' },
		            {field: 'dosgDt'     , title: '복용일자'    , align: 'center', width: '80' },
		            {field: 'cateTpNm'	 , title: '감량/요요'   , align: 'center', width: '110',
		                formatter: function(value, row, index) {
		                    if( $isEmpty(row.cateTpValNm) ) {
		                        return value;    
		                    } else {
		                        return value +'('+ row.cateTpValNm +')';
		                    }
		                }
		            },
		            {field: 'dosgTpNm'	 , title: '감량종류'    , align: 'center', width: '110',
		                formatter: function(value, row, index) {
		                    if( $isEmpty(row.dosgTpValNm) ) {
		                        return value;    
		                    } else {
		                        return value +'('+ row.dosgTpValNm +')';
		                    }
		                }
		            },
		            {field: 'dosgSeq'    , title: '복용일차'    , align: 'center', width: '70',
		                formatter: function(value, row, index) {
		                    if( value == 0 ) {
		                        return '시작전날';    
		                    } else {
		                        return value +' 일차';
		                    }
		                }
		            },
		            {field: 'pausYnNm'   , title: '통화여부'    , align: 'center', width: '90'},
		            {field: 'picUsrNm'   , title: '담당한약사'   , align: 'center', width: '80'},
		            {field: 'pic2UsrNm'  , title: '담당상담실장' , align: 'center', width: '80'},
		            {field: 'cnstHhNm'	 , title: '상담가능시간' , align: 'center', width: '80'},
					{field: 'cnstHhMemo' , title: '상담시간메모' , align: 'left' , halign: 'center', width: '200'},
		            {field: 'zipCode'    , title: '우편번호'    , align: 'center', width: '80'},
		            {field: 'addr1'      , title: '주소'       , align: 'left', halign: 'center', width: '200'}
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
	
				$("#custDlgWrap").load("/customer/CUS1001ML_D/"+ row.custId +"/1", function (data, status, xhr) {
					$.parser.parse($('#custDlgWrap'));
					$('#custDlg').window('open').window('center').window('setTitle', '고객상담정보');
		        });
			});
		},
		search: function() {
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
			queryParams.pausYn 		= $("#pausYn").val();
			
			
			
			$('#table01').datagrid('load', '/api/v1/main/customer/findCustomerByDosgDt');
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
});
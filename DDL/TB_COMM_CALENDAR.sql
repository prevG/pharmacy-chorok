DROP TABLE bazzarmall.TB_COMM_CALENDAR; 

CREATE TABLE bazzarmall.TB_COMM_CALENDAR (
	BASE_DT DATE NOT NULL,
	BASE_DT_STR varchar(8) NOT NULL,
	DAYS_STR_ENG varchar(3) NOT NULL,
	DAYS_STR_KOR varchar(20) NOT NULL,
	DAYS_NUM INT NOT NULL,
	WK_NUM VARCHAR(6) NULL,
	MON_LAST_DT	DATE NOT NULL,
	HOLIDAY_YN varchar(1) NULL,
	REG_DT DATETIME NOT NULL,
	REG_USR_NO INT NOT NULL,
	UPD_DT DATETIME NULL,
	UPD_USR_NO INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

INSERT INTO TB_COMM_CALENDAR (
	BASE_DT,
	BASE_DT_STR,
	DAYS_STR_ENG,
	DAYS_STR_KOR,
	DAYS_NUM,
	WK_NUM,
	MON_LAST_DT,
	HOLIDAY_YN,
	REG_DT,
	REG_USR_NO 
)
 select d
     , date_format( d, '%Y%m%d')
     , date_format( d, '%a')
     , (
       case when dayofweek( d ) = 1 then '일' 
     		when dayofweek( d ) = 2 then '월'
     		when dayofweek( d ) = 3 then '화'
     		when dayofweek( d ) = 4 then '수'
     		when dayofweek( d ) = 5 then '목'
     		when dayofweek( d ) = 6 then '금'
     	    else '토'
       end
       ) AS week
     , dayofweek( d ) as days
     , date_format( d , '%X%V')
     , last_day( d )
     , NULL
     , NOW()
	 , 1
  from (
       select @rnum:=@rnum+ 1 as rownum
            , date(adddate('2021-01-01', interval @rnum day)) as d
         from ( select @rnum:=-1)r, t
  	   ) t
 where year(d) < 2050;
 
COMMIT;


SELECT *
  FROM TB_COMM_CALENDAR tc;
 
 
 


 


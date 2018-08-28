	//FIFA活動版20180602
	//讀取Banner
	var isReloadBanner = 0;
	function reLoadBanner()
	{
		console.log( 'reLoadBanner()----------');
		if( isReloadBanner == 1 ) return;
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'fifaBannerList.php',
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
			},
			success: function(response) {
				console.log( 'get Data reLoadBanner()----------');
				$( '#fifaBanner' ).html( response );
				isReloadBanner = 1;
			}
		});
	}
	//更新會員餘額
	function reLoadUserInfo()
	{
		console.log( 'reLoadUserInfo()----------');

		var iData			= new Object;
		iData['noCache']	= 1;				//設定是否重設市場項目Cache(剛交易後，取得新的資料)
		iData['ac']			= 'upMemberInfo';
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_targetList.php',
			data: iData,
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
			},
			success: function(response) {
				var reArr = JSON.parse( response );
				if( reArr.username != '' )
				{
					$( '#quotaView' ).html( reArr.quotaView );
					$( '#pQuotaView' ).html( reArr.quotaView );
					$( '#memberQuota' ).val( reArr.quota );
				}
			}
		});
	}
	
	//市場項目
	function fifaMarkTab( a,b,c,d,g,sid )
	{
		document.location.href='fifa.php?ac=Market&ga12='+a+'&gameid='+b+'&gametime='+c+'&gamename='+d+'&competitionname='+g+'&status_id='+sid+'';
	}
	
	//市場下單 START----------------------
	var CacheReLoadData	= '';
	//市場參數-賽事列表
	var CacheGameID		= '';
	var CacheGa12		= '';
	var CacheGameTime	= '';
	var CacheCPName		= '';
	var CacheGameName	= '';
	var CacheGameGTag	= '';//保本
	//市場參數-市場項目
	var CacheMarketID	= '';
	var CacheSelectID	= '';
	var CacheTradingVol = '';
	var CacheMarketName	= '';
	var CacheSelectName	= '';
	var CacheProfit		= '';
	var CacheSize		= '';
	//市場訂單
	var CacheOrderNo	= '';
	
	//清理重設市場參數
	function clearCacheVal()
	{
		console.log( 'clearCacheVal()');
		CacheGameID		= '';
		CacheGa12		= '';
		CacheGameTime	= '';
		CacheCPName		= '';
		CacheGameName	= '';
		CacheGameGTag	= '';
		CacheMarketID	= '';
		CacheSelectID	= '';
		CacheTradingVol = '';
		CacheMarketName	= '';
		CacheSelectName	= '';
		CacheProfit		= '';
		CacheSize		= '';
		CacheOrderNo	= '';
	}
	//市場項目下單後，兩秒(API Cache)更新市場項目&會員餘額
	var upDataTime;
	var upDataTimeId;
	function upDataTimeFunc(){
		//console.log( 'upDataTimeFunc()'+upDataTime);
		clearTimeout( upTimeId );
		if( upDataTime == 0 )
		{
			//更新會員餘額
			reLoadUserInfo();
			//更新市場項目
			reLoadMarket();
		}else{
			upDataTime--;
			upDataTimeId = setTimeout( upDataTimeFunc, 1000 );
		}
	}
	//市場項目自動更新時間
	var upTimeNum;
	var upTimeId;
	function upTimeFunc(){
		$( "#runMarketTime1" ).html( upTimeNum );
		$( "#runMarketTime2" ).html( upTimeNum );
		$( "#runMarketTime3" ).html( upTimeNum );
		$( "#runMarketTime4" ).html( upTimeNum );
		//console.log( 'upTimeNum:'+upTimeNum );
		clearTimeout( upTimeId );
		if( upTimeNum == 0 )
		{
			reLoadMarket();
		}else{
			upTimeNum--;
			upTimeId = setTimeout( upTimeFunc, 1000 );
		}
	}
	
	function reLoadMarket()
	{
		marketTab( CacheGameID, CacheGa12, CacheGameTime, CacheCPName, CacheGameName, CacheGameGTag );
	}
	// STEP1 啟動市場項目表動作
	function marketStart( gameid, ga12, gametime, competitionname, gamename, status_id )
	{
		console.log( 'marketStart( '+gameid+', '+ga12+', '+gametime+', '+competitionname+', '+gamename+', '+status_id+' )');
		clearCacheVal();//清理重設市場參數
		CacheGameID				= gameid;
		CacheGa12				= ga12;
		CacheGameTime			= gametime;
		CacheCPName				= competitionname;
		CacheGameName			= gamename;
		CacheGameGTag			= status_id;

		CacheReLoadData = ''; //清除設定, 依照市場項目Cache
		var now = new Date().getTime();
		upTimeNum = 60;
		upTimeFunc();//啟動更新計時
	}
	// STEP2 呼叫右側市場項目表
	function marketTab( gameid, ga12, gametime, competitionname, gamename, status_id )
	{
		console.log( 'marketTab( '+gameid+', '+ga12+', '+gametime+', '+competitionname+', '+gamename+', '+status_id+' )');
		clearCacheVal();//清理重設市場參數
		CacheGameID				= gameid;
		CacheGa12				= ga12;
		CacheGameTime			= gametime;
		CacheCPName				= competitionname;
		CacheGameName			= gamename;
		CacheGameGTag			= status_id;

		var iData				= new Object;
		iData['gameid']			= gameid;
		iData['ga12']			= ga12;
		iData['gametime']		= gametime;
		iData['noCache']		= CacheReLoadData; //設定是否重設市場項目Cache(剛交易後，取得新的資料)
		console.log( 'noCache:'+iData['noCache']+'-------' );
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_targetList.php',
			data: iData,
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
				//loadingCtrl( 1 );
			},
			success: function(response) {
				//loadingCtrl( 0 );
				CacheReLoadData = ''; //清除設定, 依照市場項目Cache
				var now = new Date().getTime();
				$( '#MarketInfo' ).html( response );
				//$( '#GameTitleInfo' ).html( '&nbsp;&nbsp;【'+CacheCPName+'】'+' '+CacheGameTime.slice(5)+' '+CacheGameName.replace(/ v /, "(主) vs ") );
				upTimeNum = 60;
				upTimeFunc();//啟動更新計時
			}
		});
	}
	
	//下單POPUP STEP1
	function MarketOrder( marketid, selectid, TradingVol, marketname, selectname, profit, systemrate, price, fee, isGuaranteed )
	{
		console.log( 'MarketOrder( '+marketid+', '+selectid+', '+TradingVol+', '+marketname+', '+selectname+', '+profit+', '+systemrate+', '+price+', '+fee+', '+isGuaranteed+' )');

		CacheGameID		= $( '#gameid' ).val();
		CacheGa12		= $( '#ga12' ).val();
		CacheCPName		= $( '#competitionname' ).val();
		CacheGameName	= $( '#gamename' ).val();
		//CacheGameTime	= $( '#gametime' ).val();
		console.log( 'CacheGameTime( '+CacheGameTime+' )');
		CacheMarketID	= marketid;
		CacheSelectID	= selectid;
		CacheTradingVol = TradingVol;
		CacheMarketName	= marketname;
		CacheSelectName	= selectname;
		CacheProfit		= profit;
		CacheFee		= fee;

		//獲取單號
		var profitNum			= new Number( profit*100 );
		var iData				= new Object;
		iData['ac']				= 'getOrderNo';
		iData['gameid']			= CacheGameID;
		iData['ga12']			= CacheGa12;
		iData['gametime']		= CacheGameTime;
		iData['competitionname']= CacheCPName;
		iData['gamename']		= CacheGameName;
		iData['marketid']		= CacheMarketID;
		iData['selectid']		= CacheSelectID;
		iData['profit']			= CacheProfit;
		iData['systemrate']		= systemrate;
		iData['price']			= price;
		iData['fee']			= fee;
		iData['isGuaranteed']	= isGuaranteed;
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_targetList.php',
			data: iData,
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
				//loadingCtrl( 1 );
				$( "#gameGuaranteed" ).removeClass( "modal_guaranteed" );
				$( "#gameGuaranteed" ).html( '' );
				$( "#gameGuaranteed2" ).removeClass( "modal_guaranteed" );
				$( "#gameGuaranteed2" ).html( '' );
			},
			success: function(response)
			{
				//loadingCtrl( 0 );
				reArr = response.split( ":" );
				var reArr = JSON.parse( response );
				if( reArr.errorcode == '000' )
				{
					CacheOrderNo = reArr.msg;
					var gameNameArr = CacheGameName.split(" v ");
					var sGameName	= gameNameArr[0]+'<span class="vs2">vs</span>'+gameNameArr[1];
					if( isGuaranteed == '1' )
					{
						$( "#gameGuaranteed" ).addClass( "modal_guaranteed" );
						$( "#gameGuaranteed" ).html( '保本' );
						$( "#gameGuaranteed2" ).addClass( "modal_guaranteed" );
						$( "#gameGuaranteed2" ).html( '保本' );
					}
					//輸入金額POPUP資料
					$( '#sGameTime' ).html( CacheGameTime );
					$( '#sCPName' ).html( CacheCPName );
					$( '#sGameName' ).html( sGameName );
					$( '#sProfit' ).html( profitNum.toFixed(2)+'%' );
					$( '#MarketInfo_Item' ).html( CacheMarketName );
					$( '#MarketInfo_Select' ).html( CacheSelectName );
					$( '#MarketInfo_Item2' ).html( CacheMarketName );
					$( '#MarketInfo_Select2' ).html( CacheSelectName );
					$( '#Bet' ).val( '' );
					$( '#orderrisk_st' ).html( '' );
					$( '#Modal_orderInput' ).css( 'display', 'block' );
					//確認POPUP資料
					$( '#sGameTime2' ).html( CacheGameTime );
					$( '#sCPName2' ).html( CacheCPName );
					$( '#sGameName2' ).html( CacheGameName );
					$( '#sProfit2' ).html( profitNum.toFixed(2)+'%' );
					$( '#MarketInfo_ItemSelect' ).html( CacheMarketName+' '+CacheSelectName );
					$( '#MarketInfo_ItemSelect2' ).html( CacheMarketName+' '+CacheSelectName );
					$( '#Bet' ).focus();
				}
				else
				{
					msg( {'status':0, 'title':'', 'text1':'资料已更新，请重新进行['+reArr.errorcode+']', 'text2':'' } );
					reLoadMarket();
				}
			}
		});
		//alert( 'selectid:'+selectid+' TradingVol:'+TradingVol+' marketid:'+marketid );
	}
	
	//下單快捷金額增加金額
	function addOrderAmount( inputVal )
	{
		var addVal		= 0;
		var OrderAmount	= 0;
		var mbQuota		= 0;
		var setNewVal	= 0;
		if( $('#Bet').val() )			{ OrderAmount = parseFloat( $('#Bet').val() ); }
		if( $('#memberQuota').val() )	{ mbQuota = parseFloat( $('#memberQuota').val() ); }
		if( inputVal )					{ addVal = parseFloat( inputVal ); }
		if( inputVal == 'all' )			{ setNewVal = mbQuota; }else{ setNewVal = OrderAmount + addVal; }
		if( setNewVal > CacheTradingVol ) { setNewVal = CacheTradingVol; alert( '可交易量为'+CacheTradingVol); }
		$('#Bet').val( setNewVal );
		Calculate();
	}
	//執行快捷金額設定
	function upFastAmount()
	{
		var fa0 = $( "#fastAmount0" ).val();
		var fa1 = $( "#fastAmount" ).val();
		var fa2 = $( "#fastAmount2" ).val();

		if( fa0 == '' && fa1 == '' && fa2 == '' )
		{
			msg( {'status':0, 'title':'', 'text1':'', 'text2':'请输入数字！' } );
			return;
		}
		if( isNaN(fa0) || isNaN(fa1) || isNaN(fa2) )
		{
			msg( {'status':0, 'title':'', 'text1':'', 'text2':'请输入数字...'+fa0+' / '+fa1+' / '+fa2 } );
			return;
		}
		if( fa0.length > 6 || fa1.length > 6 || fa2.length > 6 )
		{
			msg( {'status':0, 'title':'', 'text1':'', 'text2':'设定金额过大' } );
			return;
		}
		var faArr = { fastAmount:[] };

		if( fa0 ) faArr.fastAmount.push( fa0 );
		if( fa1 ) faArr.fastAmount.push( fa1 );
		if( fa2 ) faArr.fastAmount.push( fa2 );
				$( "#Modal_setting" ).css( 'display', 'none' );
				var newBar = '';
				for( var i = 0 ; i <=2 ; i++ )
				{
					if( faArr.fastAmount[i] )
					{
						newBar = newBar+'<button class="money_btn" onclick="addOrderAmount(\''+faArr.fastAmount[i]+'\')">'+faArr.fastAmount[i]+'</button>'
					}
				}
				$( '#fastAmountBar' ).html( newBar+'<button class="all" onclick="addOrderAmount( \'all\' )">全部</button>');
return;
		
		var faArr = { fastAmount:[] };

		if( fastAmount0 ) faArr.fastAmount.push( fastAmount0 );
		if( fastAmount1 ) faArr.fastAmount.push( fastAmount1 );
		if( fastAmount2 ) faArr.fastAmount.push( fastAmount2 );

		var iData		 = new Object;
		iData['actionStep'] = 'upFastAmount';
		iData['fastAmount']	 = faArr.fastAmount;
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_userCenter.php',
			data: iData,
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
				//loadingCtrl( 1 );
			},
			success: function(response)
			{
				$( "#Modal_setting" ).css( 'display', 'none' );
				var newBar = '';
				for( var i = 0 ; i <=2 ; i++ )
				{
					if( faArr.fastAmount[i] )
					{
						newBar = newBar+'<button class="money_btn" onclick="addOrderAmount(\''+faArr.fastAmount[i]+'\')">+'+faArr.fastAmount[i]+'</button>'
					}
				}
				$( '#fastAmountBar' ).html( newBar+'<button class="all" onclick="addOrderAmount(\'all\')">全部</button>');
				//loadingCtrl( 0 );
			}
		});
	}

	//取消下單POPUP STEP1
	function cancelStep1()
	{
        $("#Modal_orderInput").css('display', 'none');
	}
	//取消下單POPUP STEP2
	function cancelStep2()
	{
        $("#Modal_order02").css('display', 'none');
	}
	//完成交易-關閉
	function finishClose()
	{
		$("#Modal_cover3").css('display', 'none');
	}
	//完成交易-前往交易明細
	function viewOrderRecord()
	{
		document.location.href = 'orderinfo.php';
	}
	
	function fastAmountPOPUP()
	{
		$( '#Modal_setting' ).css('display', 'block');
	}
	function fastAmountClose()
	{
		$( "#Modal_setting" ).css( 'display', 'none' );
	}
	
	//下單計算預估獲利STEP1.2
	function Calculate()
	{
		CacheSize = parseFloat( $('#Bet').val() );
		//ckOrderAmount( CacheSize );//檢查金額
		
		var size = Math.pow( 10, 2 );
		result = Math.floor( ( CacheSize*CacheProfit*0.95 ) * size ) / size ;//計算預估獲利

		$( '#orderrisk_st' ).html( result );
		$( '#orderrisk' ).html( result );
		$( '#Bet2' ).html( CacheSize );
	}
	//下單確認STEP1.3
	function MarketConfirm()
	{
		//var OrderAmount = $('#OrderAmount').val();
		if( !ckOrderAmount( CacheSize ) ) return false;
		$("#Modal_orderInput").css('display', 'none');
		$("#Modal_order02").css('display', 'block');//開啟確認POPUP
	}
	//送出注單
	function orderSubmit()
	{
		var iData		 = new Object;
		iData['ac']		 = 'actionOrder';
		iData['size']	 = CacheSize;
		iData['OrderNo'] = CacheOrderNo;
		//alert( 'Ready Submit Order gameid:'+iData['gameid']+', ga12:'+iData['ga12']+', effectivetime:'+iData['effectivetime']+', marketid:'+iData['marketid']+', selectid:'+iData['selectid']+', profit:'+iData['profit'] );
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_targetList.php',
			data: iData,
			error: function(xhr) {
			},
			beforeSend:function(result)
			{
				$( "#Modal_order02" ).css( 'display', 'none' );
				//loadingCtrl( 1 );
			},
			success: function(response)
			{
				//loadingCtrl( 0 );
				var res = JSON.parse( response );
				if( res.errorcode == '000' )
				{
					CacheReLoadData = 1; //設定是否重設市場項目Cache(剛交易後，取得新的資料)
					$( '#res_competitionname' ).html( res.competitionname );
					$( '#res_gametime' ).html( res.gametime );
					$( '#res_game' ).html( res.game );
					$( '#res_gameselect' ).html( res.gamemarket+' '+res.gameselect );
					$( '#res_betid' ).html( res.betid );
					$( '#res_dealmoney' ).html( res.dealmoney );
					$( '#res_profit' ).html( res.profit );
					$( '#res_conversion' ).html( res.conversion );
					$( '#Modal_cover3' ).css( 'display', 'block' );
				}
				else
				{
					msg( {'status':0, 'title':'', 'text1':'交易失敗', 'text2':'['+res.errorcode+']'+res.msg } );
				}
				//更新市場項目表
				//reLoadMarket();
				upDataTime = 2;
				upDataTimeFunc();//2秒經過API Cache更新資料
			}
		});
		
	}
	//檢驗金額
	function ckOrderAmount( OrderAmount )
	{
		var sre = /^[0-9]+(\.[0-9]{1,2})?$/;//小數點2位
		
		if( OrderAmount == '' )
		{
			msg( {'status':0, 'title':'', 'text1':'请输入金额', 'text2':"最低交易金额100元" } );
			$('#Bet').focus();
			return;
		}
		if( isNaN( OrderAmount ) )
		{
			msg( {'status':0, 'title':'', 'text1':'请重新输入金额', 'text2':"请输正确数字，不含其他文字符号" } );
			$('#Bet').focus();
			return;
		}
	
		if( !sre.test( OrderAmount ) )
		{
			msg( {'status':0, 'title':'', 'text1':'请重新输入金额', 'text2':"交易金额最多小数点2位" } );
			$('#Bet').focus();
			return;
		}
		if( OrderAmount < 100 )
		{
			msg( {'status':0, 'title':'', 'text1':'请重新输入金额', 'text2':"最低交易金额100元" } );
			$('#Bet').focus();
			return;
		}
		if( OrderAmount > CacheTradingVol )
		{
			msg( {'status':0, 'title':'', 'text1':'请重新输入金额', 'text2':"交易金额，超过可交易量"+CacheTradingVol } );
			//$( '#OrderAmount' ).focus();
			$( '#Bet' ).val( CacheTradingVol );
			Calculate();
			return;
		}
		if( OrderAmount > $('#memberQuota').val() )
		{
			msg( {'status':0, 'title':'', 'text1':'请重新输入金额', 'text2':"交易金额，超出可用余额"+$('#memberQuota').val() } );
			$('#Bet').focus();
			return;
		}
		return true;
	}

	/*交易量統計圖表*/
	function chatShow( tag, num )
	{
		if( tag == 0 ) alert( '尚无成交量' );
		var chatData = new Object;
		chatData["chatTag"] = tag;
		chatData["chatItem"] = num;
		jQuery.ajax({
			type: 'POST',
			url: './chatShow.php' ,
			data: chatData ,		
			error: function(xhr) {
				return false;
			},
			beforeSend:function(response)
			{
				jQuery('#Modal_cover4').attr('style','display:block');
				jQuery('#Modal_cover4').html("<div class='Loading'></div>");
			}, 
			success: function(response) {		 	
				jQuery('#Modal_cover4').html(response); 
			}
		});
	}

	function msg( msgArr )
	{
		alert( msgArr['text2'] );
	}
	
	$(function() {
		$('#sche_lists_date').change(function(){
			$('.sche_list_content').hide();
			$('#date' + $(this).val()).show();
		});
	});
	
	//<div id="LiveClock"></div>
	function ActivityTime() {
		var activityDeadline = new Date("07/15/2018"); //开幕倒计时 
		var activityNow = new Date();
		var activityLeave = (activityDeadline.getTime() - activityNow.getTime());
		var activityDay = Math.floor(activityLeave / (1000 * 60 * 60 * 24));

		var LiveClock = document.getElementById("LiveClock")
		activityDay = activityDay + 1;

		if (activityDay > 0) {
			LiveClock.innerHTML = activityDay;
			setTimeout("ActivityTime()", 10000);
		}
	}
	ActivityTime();
	
	//<div id="LiveClock"></div>
	function sDigitalTime() 
	{ 
		var deadline= new Date("07/15/2018"); //开幕倒计时 
		var now = new Date() ;
		var leave = (deadline.getTime() - now.getTime()) ;
		var day = Math.floor(leave / (1000 * 60 * 60 * 24)) ;
		 
		var LiveClock=document.getElementById("LiveClock")
		day = day+1; 
	 
		if (day>0) { 
			LiveClock.innerHTML = day; 
			setTimeout("DigitalTime()",10000) ;
		} 
	} 
	sDigitalTime();
	
	function DigitalTime() {
		var deadline = new Date("06/13/2018 23:00"); //开幕倒计时 
		var now = new Date();
		var leave = (deadline.getTime() - now.getTime());
		var day = Math.floor(leave / (1000 * 60 * 60 * 24));
		
		var hour = Math.floor(leave / (1000 * 3600)) - (day * 24);
		var hourOne = parseInt(hour / 10);
		var hourTwo = hour%10;
		
		var minute = Math.floor(leave / (1000 * 60)) - (day * 24 * 60) - (hour * 60);
		var minOne = parseInt(minute / 10);
		var minTwo = minute%10;
		
		var second = Math.floor(leave / (1000)) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		var secOne = parseInt(second / 10);
		var secTwo = second%10;
		

		var LiveClockDays = document.querySelector('.LiveClockDays');
		var LiveClockH = document.querySelector('.timeHour');
		var LiveClockM = document.querySelector('.timeMin');
		var LiveClockS = document.querySelector('.timeSec');

		day = day + 1;

		if (day > 0) {

			LiveClockDays.innerHTML = day;

			LiveClockH.innerHTML = '<span>' + hourOne + '</span><span>' + hourTwo + '</span>';
			LiveClockM.innerHTML = '<span>' + minOne + '</span><span>' + minTwo + '</span>';
			LiveClockS.innerHTML = '<span>' + secOne + '</span><span>' + secTwo + '</span>';
			
			
			setTimeout("DigitalTime()", 1000);
		}
	}
	DigitalTime();
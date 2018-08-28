<?php
	//require_once('../psec/modules/allmodules.php');//public,session module
	include( '../devInclude/includeBaseV2m.php' );

	$strIndex	= array( 9063255, 9063256, 9063254 );
	$strSet		= array( 9063255=>'客队赢进四球以上', 9063256=>'平手进四球以上', 9063254=>'主队赢进四球以上' );

	$rc			= new redisCache;
	$orderinfo	= json_decode( $rc->getVar( $_REQUEST['chatTag'] ), true );
	$competitionname=$_POST['competitionname'];
	//$chatArr	= $orderinfo['deal_money_array'];

	/*while( list( $key ) = @each( $chatArr ) )
	{
		$x = 1;
		while( list( $key2 ) = @each( $chatArr[$key] ) )
		{
			if( $chatArr[$key][$key2]['selection_id'] == 9063256 ) continue;
			$dArr = $chatArr[$key][$key2];
			if( $key2 == 9 )
			{
				$cArr[$key][$x]['item'] = implode( ',', $cArr[$key][$x]['item'] );
				$cArr[$key][$x]['num']	= implode( ',', $cArr[$key][$x]['num'] );
				$x++;
			}
			$cArr[$key][$x]['item'][]	= ( in_array( $dArr['selection_id'], $strIndex ) ) ?  sprintf( "'%s'", $strSet[$dArr['selection_id']] ) : sprintf( "'%s'", $dArr['selection_name'] ) ;
			$cArr[$key][$x]['num'][]	= floor( $dArr['dealmoney'] );
			$xArr[$key]['total'] += $dArr['dealmoney'];
		}
		$cArr[$key][$x]['item'] = implode( ',', $cArr[$key][$x]['item'] );
		$cArr[$key][$x]['num']	= implode( ',', $cArr[$key][$x]['num'] );
		$cArr['chat'.$key]		= urldecode( json_encode( $cArr[$key] ) );
	}
	*/

	//獨立交易量表
	$Arr['eventId']=$_POST['gameid'];
	$Arr['marketId']=$_POST['marketId'];
	$Arr['chartid']=$_POST['chartid'];
	//print_r($Arr);

	$result=dealmoneychart($Arr);

	$deal=array();
	$x=1;
	
	while (list($key)=@each($result)) 
	{
		$dealdata[$x]['selection'][]=$result[$key]['selection'];
		$dealdata[$x]['totaldealmoney'][]=$result[$key]['selection_sum_deal_money'];
				
		$deal[$x]['item']=@implode(',',$dealdata[$x]['selection']);
		$deal[$x]['num']=@implode(',',$dealdata[$x]['totaldealmoney']);
	}

	//$tpl = new TemplatePower( "template/chatShow.html" );
	$tpl = new TemplatePower( "template/ac_chart.html" );
	$tpl->prepare();
	
	$titleArr = array( 1=>ALL_SCORE, 2=>HALF_SCORE, 3=>FIRST_GOAL, 0=>TOTAL_SCORE );
	$tpl->assign( 'titleName', $titleArr[$_REQUEST['chatItem']] );
	$tpl->assign( 'gameName', $orderinfo['gamename'] );
	$tpl->assign( 'totalNum', number_format( $xArr[$_REQUEST['chatItem']]['total'], 0 ) );//$total[$_REQUEST['chatItem']] );
	$tpl->assign('competitionname',$competitionname);
	/*$i = 1;
	$sArr = $cArr[$_REQUEST['chatItem']];
	while( list( $s ) = @each( $sArr ) )
	{
		$tpl->assign( 'chatNum', $sArr[$s]['num'] );
		$tpl->assign( 'chatItem', $sArr[$s]['item'] );
		$i++;
	}

	if( $i == 2 )
	{
		$tpl->newBlock( 'closeChat' );
		$tpl->assign( 'closeNum', 2 );
	}*/
		$tpl->assign( 'chatNum', $sArr[$s]['num'] );
		$tpl->assign( 'chatItem', $sArr[$s]['item'] );

	$tpl->printToScreen();
?>
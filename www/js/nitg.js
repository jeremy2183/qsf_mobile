function tips()
{
	$('.already_like').fadeIn(500);
	setTimeout (function(){
		$('.already_like').fadeOut(1000);
	},1000);
}


//发表留言底家 
function notallow( ckStr ) //先过滤留言内容
{
	var ckStrang = /[`'*@=><|}{)(#\$%\^&\*+/]+/g;
	if( ckStrang.test( ckStr ) )
	{
		return 'Contains symbols';
	}
	if(ckStr.toLowerCase()=="https" || ckStr.toLowerCase()=="http") 
	{ 
  		return 'Contains words';
	} 
	return true;
}



function opinion()
{
	if( notallow( $('#msg').val() ) != true )
	{
		var ckResult = notallow( $('#msg').val() );
		tips();
		if( ckResult == 'Contains symbol') $('#tips').html('评论内容不可含符号');
		if( ckResult == 'Contains words' ) $('#tips').html('评论内容不可含特殊字符');	
		return false;
	}
	else if($('#msg').val() =='')
	{
		tips();
		$('#tips').html('请输入您的评论');	
	}
	else
	{
		var change=new Object;
		change['content']=$('#msg').val();
		change['news_id']=$('#newsid').val();
		var newsid=$('#newsid').val();
		change['tag']='opinion';
		Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_newsinfo.php',
			data: change,
			error: function(xhr)
			{
				//alert('error');
			},
			beforeSend:function(result)
			{
				
			},
			success: function(answer)
			{
				 //alert(answer);
				if( answer=="S01" )
				{
					$('#tips').html('评论发表成功');
				}

				window.location.href="newsInfo_msg.php?news_id="+newsid;
				
			}
		});
	}
	
}
//新闻按赞功能
function newslike(likes,id)
{
	//alert(likes);
	var likes=likes+1;
	//$('#newslike').html(likes);
	//$(".like_message_icon").addClass('like_active_icon');
	var change= new Object;
	change['news_id']=id;
	change['tag']='newslike';
	Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_newsinfo.php',
			data: change,
			error: function(xhr)
			{
				//alert('error');
			},
			beforeSend:function(result)
			{
				
			},
			success: function(answer)
			{
				if( answer!="S01" )
				{
					//$("#xx").fadeToggle(750);
					//alert('x'+answer+'x');
					//alert('x'+answer+'x');
					tips();
					//$('#newslike').html(likes-1);
				}
				else
				{
					$('#newslike').html(likes);
					$(".like_message_icon").addClass('like_active_icon');
				}
			}
		});
}

//留言按赞功能
function msglike(like,msg_id)
{
	var like=like+1;
	
	var change= new Object;
	change['msg_id']=msg_id;
	change['tag']='msglike';
	//alert(change['tag']);
	Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_newsinfo.php',
			data: change,
			error: function(xhr)
			{
				//alert('error');
			},
			beforeSend:function(result)
			{
				
			},
			success: function(answer)
			{
				//alert('x'+answer+'x');
				if( answer!="S01" )
				{
					//var info = {'status':0, 'title':'', 'text1':'您已经赞过了', 'text2':'' };
					//msg(info);
					tips();
					//$('#msg_like'+msg_id).html(like-1);
				}
				else
				{
					$("#msg_like"+msg_id).html(like);

				}
				
			}
		});
}

function nocomment(msg_num,newsid)
{	
	//alert(msg_num+'+'+newsid);
	if(msg_num>0)
	{
		window.location.href="newsInfo_msg.php?news_id="+newsid;
	}
	else
	{
		tips();
		$('#tips').html('目前尚无评论');
	}
	
}

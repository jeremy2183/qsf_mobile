$(function() {

  $('.switch').change(function(){
    $(this).toggleClass('checked');
    var ss = $('input[name="checbox_input"]:checked').val();
    //alert(ss);
    if(ss=='on')
     {
 $('input[name="checbox_input"]').attr('checked',true);    	
     }
    else
    {
  $('input[name="checbox_input"]').attr('checked',false);  	
    }

  });
   
 if('{_JS_ERROR_CODE_}'=='900')
	{
  var ss = $.cookies.get('closeweb');
  alert(ss);
   	   if(ss=='y')
   	    {
   	return;   
   	    }
   	   else
   	   	{
  $('#myModa2').modal('show');
	return; 	  
   	   	}
	
	}
});
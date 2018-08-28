function siidyy() {
	$('.menu_btn').click(function () {
		$('.sidy').addClass('sidy--opened');
	});


	$(document).mouseup(function (e) {
		var pop = $('sidy__panel');
		if (!pop.is(e.target) && pop.has(e.target).length === 0) {
			 $('.sidy').removeClass('sidy--opened');
		}
	});



};
siidyy();

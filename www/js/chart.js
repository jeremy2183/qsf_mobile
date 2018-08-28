function chart_main() {

	var width_tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	var max = Math.max.apply(Math, st);

	for (var i = 0; i < st.length; i++) {
		var Value = document.createElement("div");
		Value.className = ('score');
		document.querySelector('#score').appendChild(Value);
		Value.innerHTML = '<p>' + stChartValue[i] + '</p>';

		var wrap = document.createElement("div");
		wrap.className = ('bar_wrap');
		document.getElementById('chart_column').appendChild(wrap);

		var bar_font = document.createElement("div");
		bar_font.className = ('bar');
		wrap.appendChild(bar_font);

		var bar_Circle_div = document.createElement("div");
		bar_Circle_div.className = ('bar_Circle_div');
		bar_font.appendChild(bar_Circle_div);

		var bar_LittleCircle = document.createElement("div");
		bar_LittleCircle.className = ('bar_LittleCircle');
		bar_Circle_div.appendChild(bar_LittleCircle);

		var bar_value = document.createElement("div");
		bar_value.className = ('bar_value');
		document.getElementById('chart_column').appendChild(bar_value);
		bar_value.setAttribute('data-count', st[i]);
		bar_value.innerHTML = addCommas(st[i]);
	}

	function addCommas(val) {
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	var bar = document.getElementsByClassName("bar");
	var barV = document.getElementsByClassName("bar_value");
	setInterval(function () {
		for (var i = 0; i < bar.length; i++) {
			if (st[i] === 0) {
				continue;
			} else if (width_tmp[i] >= (st[i] / max) * 100) {
				barV[i].innerHTML = addCommas( st[i] );
				continue;
			} else {
				width_tmp[i] += 2;
				bar[i].style.width = (width_tmp[i]) + '%';
				barV[i].innerHTML = addCommas(  Math.floor( st[i]*(width_tmp[i]/100) ) );
			}

			if (width_tmp[i] >= 1 && width_tmp[i] < 20) {
				bar[i].classList.add('first_color');
			} else if (width_tmp[i] >= 20 && width_tmp[i] <= 40) {
				bar[i].classList.add('second_color');
				bar[i].classList.remove('first_color');
			} else if (width_tmp[i] >= 40 && width_tmp[i] <= 60) {
				bar[i].classList.add('third_color');
				bar[i].classList.remove('second_color');
			} else if (width_tmp[i] >= 60) {
				bar[i].classList.add('fourth_color');
				bar[i].classList.remove('third_color');
			}
		}
	}, 1);
};

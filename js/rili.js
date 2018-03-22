;
( function ( $ ) {
	$.fn.rili = function ( opt ) {
		var obj = {
			table: '',
			sel1: '',
			sel2: ''
		}
		var set = $.extend( obj, opt );
		var date = new Date(),
			today = date.getDate(), //今天几号
			year = date.getFullYear(), //今年
			month = date.getMonth(), //本月
			dyrq = new Date( year, month + 1, 0 ).getDate(), //相减得到本月天数
			benyue1 = new Date( year, month, 1 ).getDay(); //本月1号星期几

		addDay()
		sel()

		function appendNode( nodes, date ) {
			nodes.append( `<li>${date}</li>` )
		}

		function addDay() { //添加日期
			var week=['日','一','二','三','四','五','六'];
			set.td.html( '' )
			for(var j = 0 ; j < 7 ; j++){
				appendNode( set.td.eq( j ), `星期${week[j]}` )
			}
			var aa = ( dyrq + benyue1 ) % 7 ? dyrq + 7 - ( dyrq + benyue1 ) % 7 : dyrq;
			console.log(aa)
			for ( i = 0; i < aa; i++ ) {
				if ( i < benyue1 ) {
					appendNode( set.td.eq( i ), '' )
				}
				if(i < dyrq){
					if ( ( i + 1 ) == today ) {
						appendNode( set.td.eq( ( i + benyue1 ) % 7 ), `<b>${i+1}</b>` )
					} else {
						appendNode( set.td.eq( ( i + benyue1 ) % 7 ), `${i+1}` )
					}
				}else{
					appendNode( set.td.eq( ( i + benyue1 ) % 7 ), '' )
				}

			}
		}

		function sel() { //添加下拉列表
			var y = ''
			for ( i = 1990; i < 2051; i++ ) {
				if ( i == year ) {
					y += '<option selected>' + i + '</option>'
				} else {
					y += '<option>' + i + '</option>'
				}
				set.sel1.html( y );
			}
			set.sel2.html( '' )
			for ( i = 1; i <= 12; i++ ) {
				var mn = ( '<option>' + i + '</option>' )
				set.sel2.append( $( mn ) )
			}
			set.sel2.children().eq( month ).attr( 'selected', 'selected' )
		}

		set.sel2.on( 'change', sc2 )
		set.sel1.on( 'change', sc2 )

		function sc2() {
			month = set.sel2.val() - 1;
			year = set.sel1.val()
			dyrq = new Date( year, month + 1, 0 ).getDate(); //相减得到本月天数
			benyue1 = new Date( year, month, 1 ).getDay(); //本月1号星期几
			addDay()
		}
	}
} )( jQuery )
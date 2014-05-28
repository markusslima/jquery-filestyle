$('#input01').jfilestyle()

$('#input02').jfilestyle({buttonText: 'My filestyle'});

$('#input03').jfilestyle({input: false });

$('#input04').jfilestyle({icon: false });

$('#input05').jfilestyle({theme: 'blue'});

$('#input06').jfilestyle({size: '100px'});

$('#input07').jfilestyle({iconName: 'icon-plus'});

$('#input08').jfilestyle( );

$('#clear').click(function () {
	$('#input08').jfilestyle('clear');
});

$('#input09').jfilestyle({theme: 'orange'});

$('#toggleInput').click(function () {
	var fs = $('#input09');
	if (fs.jfilestyle('input'))
		fs.jfilestyle('input', false);
	else
	   	fs.jfilestyle('input', true);
});

$('#input10').jfilestyle({theme: 'green'});

$('#toggleIcon').click(function () {
	var fs = $('#input10');
	if (fs.jfilestyle('icon'))
		fs.jfilestyle('icon', false);
	else
	   	fs.jfilestyle('icon', true);
});

$('#input11').jfilestyle();
$('#input11').jfilestyle('buttonText', '');

$('#input12').jfilestyle({theme: 'red'});

$('#input13').jfilestyle();

$('#destroy').click(function () {
	$('#input12').jfilestyle('destroy');
});

$('.form').find(':file').jfilestyle();
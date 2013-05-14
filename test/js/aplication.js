$('#input01').jfilestyle()

$('#input02').jfilestyle({
	buttonText: 'My filestyle',
	theme: 'green'
});

$('#input03').jfilestyle({
	input: false,
});

$('#input04').jfilestyle({
	icon: false
});

$('#input05').jfilestyle();

$('#input06').jfilestyle({
	size: '100px'
});

$('#input07').jfilestyle({
	iconName: 'icon-plus',
	buttonText: 'Add'
});

$('#input08').jfilestyle({
	buttonText: 'File',
	classButton: 'btn btn-success'
});

$('#clear').click(function () {
	$('#input08').jfilestyle('clear');
});

$('#input09').jfilestyle({
	buttonText: 'File',
	classButton: 'btn btn-primary'
});

$('#toggleInput').click(function () {
	var fs = $('#input09');
	if (fs.jfilestyle('input'))
		fs.jfilestyle('input', false);
	else
	   	fs.jfilestyle('input', true);
});

$('#input10').jfilestyle({
	buttonText: 'File',
	classButton: 'btn btn-primary'
});

$('#toggleIcon').click(function () {
	var fs = $('#input10');
	if (fs.jfilestyle('icon'))
		fs.jfilestyle('icon', false);
	else
	   	fs.jfilestyle('icon', true);
});

$('#input11').jfilestyle({
	buttonText: 'Multiple',
	classButton: 'btn btn-danger'
});

$('#input12').jfilestyle();
$('#input12').jfilestyle('buttonText', '');

$('.form-horizontal').eq(1).find(':file').jfilestyle();
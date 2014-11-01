<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Plantillas en Laravel</title>
</head>
<body>

	<p>{{$dato}}</p>

	@if ($dato == 'Enric')
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus amet itaque dicta cumque commodi dolorem, et nemo vel dignissimos, nostrum praesentium, in cupiditate exercitationem laudantium at adipisci velit natus vero.
		</p>
	@endif

</body>
</html>
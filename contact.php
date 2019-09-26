<?php

/* Anything that goes in here is only performed if the form is submitted */



if (isset($_POST['submit'])) {

	$name = $_POST['name'];

	$email = $_POST['email'];

	$message = $_POST['message'];

	$formcontent="De: $name \n Email: $email \n Message: $message" ;

	$recipient = 'vguevara@integritysolutions.ec';

	$subject = $_POST['theme'];

	$mailheader = "From: $email \r\n";

	mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");

	$message = 'Gracias por tu mensaje, estaremos en contacto en breve';

	echo "<script type='text/javascript'>alert('$message');</script>";

}

?>

<!DOCTYPE html> 

<html>

<head>

	<meta charset="UTF-8">

	<title>Contacto Integrity Solutions | Integridad Laboral</title>

	<meta property="og:site_name" content="Integrity Solutions" />

	<meta property="og:title" content="Integrity Solutions | Pruebas de Polígrafo - Preempleo - Estudios de Seguridad - Investigacion de Fraudes - Capacitacion en Seguridad Vial Quito Guayaquil Tlf: +593 995 527 670" />

	<meta property="og:description" content="Integrity Solutions® Pruebas de Polígrafo, Pruebas de Preempleo, Estudios de Seguridad, Investigacion de Fraudes, Capacitacion en Seguridad Vial Quito Guayaquil - Ecuador Tlf: +593 995 527 670"/>

	<meta name="description" content="Integrity Solutions® Pruebas de Polígrafo, Pruebas de Preempleo, Estudios de Seguridad, Investigacion de Fraudes, Capacitacion en Seguridad Vial Quito Guayaquil - Ecuador Tlf: +593 995 527 670"/>

	<meta content="True" name="HandheldFriendly">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

	<link href="style.css" rel="stylesheet" type="text/css" media="screen">

	<link href="style-headers.css" rel="stylesheet" type="text/css" media="screen">

	<link href="images/favicon.png" rel="shortcut icon" type="image/png">

	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <script type="text/javascript" src="js/jquery.js"></script>

	<!--[if lt IE 9]

		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>

		<link href="style-ie.css" rel="stylesheet" type="text/css" media="screen">

	<![endif]-->

</head>



<body class="home"><div class="root">

	<header data-aos="fade-down" class="h3 sticky-enabled no-topbar">

		

		<section class="main-header">

			<div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i></div>

			<p  class="title"><a href="./"><img src="images/temp/logo.png" alt="Integrity Solutions"></a></p>

			<nav class="social">

				<ul>

					<li><a target="_blank" href="https://www.facebook.com/IntegritySolutionsEC" class="facebook">Facebook</a></li>

					<li><a href="mailto:info@integritysolutions.ec?subject=URG Integritysolutions.ec">Email</a></li>

					<li><a target="_blank" href="http://integrity-solutions.negocio.site/" class="googleplus">Google+</a></li>

					<li><a  target="_blank" href="https://www.linkedin.com/company/integrity-solutions-ec/" class="linkedin">LinkedIn</a></li>

				</ul>

			</nav>

            <nav>

				<ul>

					<li><a href="./">Inicio</a>

					</li>					

					<li class="sub-menu"><a href="#/">Servicios</a>

						<ul>		

							<li><a href="integrityreport.html">Integrity Report</a></li>

							<li><a href="poligrafo.html">Pol&iacute;grafo</a></li>

							<li><a href="integritest.html">AMITAI&#174; Honestidad</a></li>

							<li><a href="seguridadvial.html">Seguridad Vial</a></li>

						</ul>

					</li>

					<li class="sub-menu"><a href="#/">Acceso Informes</a>

						<ul>

							<li><a href="https://1drv.ms/f/s!Ai5jre2Bpevgga4R35Ps3K-20qA3gA">DirecTv</a></li>

							<li><a href="https://1drv.ms/f/s!Ai5jre2Bpevggd8O2EuuamSBCFZWpA">Banco Diners</a></li>

						</ul>					

					</li>

					<li><a class="current-menu-item" href="#/">Contacto</a>				

					</li>						

				</ul>

			</nav>

             <div class="clear"></div>

        </section>

	</header>

	<section>	

		<section data-aos="zoom-out-right" data-aos-duration="1000" class="container3">

			<h2><span style="color: #fff; border: none;">Cont&aacute;ctanos</span></h2>

			<div class="contact-container">

				<form action="contact.php" method="POST" class="contact-form">

					<label>Nombre</label>

					<input name="name" placeholder="" required>

							

					<label>Email</label>

					<input name="email" type="email" placeholder="" required>



					<label>Tema</label>

					<select id ="topicList" name="theme" size="1">

						<option value="URG Contacto Web">Seleccionar</option> 

						<option value = "URG Cotizacion">Cotizaci&oacute;n</option>

						<option value = "URG Informacion">Informaci&oacute;n general</option>

					</select>



					<label>Mensaje</label>

					<textarea name="message" placeholder=""></textarea>

							

					<input id="submit" name="submit" type="submit" value="Enviar">

				</form>

				<div class="contact-map">

					<h3><span>Mapa</span></h3>

					<div class="pc-tab" data-aos="fade-up">

						<input checked="checked" id="tab3" type="radio" name="pct">

						<input id="tab4" type="radio" name="pct">

						<nav>

							<ul>

								<li class="tab3">

									<label for="tab3">Quito</label>

								</li>

								<li class="tab4">

										<label for="tab4">Guayaquil</label>

									</li>

							</ul>

						</nav>

						<section>

							<div class="tab3">

								<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.205069172745!2d-78.479449!3d-0.1675183!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xac28efccab48eeaa!2sIntegrity+Solutions+Ecuador!5e0!3m2!1sen!2sec!4v1566288735373!5m2!1sen!2sec" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

							</div>

							<div class="tab4">

									<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.017800971279!2d-79.90222068524486!3d-2.14687009843509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDgnNDguNyJTIDc5wrA1NCcwMC4xIlc!5e0!3m2!1ses!2sec!4v1567113715973!5m2!1ses!2sec" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>

								</div>

						</section>

					</div>

				</div>

			</div>

		</section>

		<a href="#top" class="go-top">Go to top of page</a>

	</section>



	<footer data-aos="fade-up" data-aos-anchor-placement="top-bottom">

		<section class="widgets"><article>

				<h3><span>Contacto</span></h3>

				<p>Integrity Solutions<br><strong>Quito:</strong><br>Edificio AXIOS<br>Oficina 904<br>Av. De los Shyris N41-151 e Isla Floreana<br><strong>Guayaquil:</strong><br>Av. Francisco de Orellana MZ 101 Solar 2 y Av. Agust&iacute;n Freire<br>Tlf: +593 995 527 670<br>+593 995 527 732<br>(02) 513 3970<br>E-mail: <a href="mailto:info@integritysolutions.ec?subject=URG Integritysolutions.ec">info@integritysolutions.ec</a></p>

			</article><article class="widget_links">

				<h3><span>Servicios</span></h3>

				<ul>

					<li><a href="integrityreport.html">Integrity Report</a></li>

					<li><a href="poligrafo.html">Pol&iacute;grafo</a></li>

					<li><a href="integritest.html">AMITAI&#174; Honestidad</a></li>

					<li><a href="seguridadvial.html">Seguridad Vial</a></li>

				</ul>

			</article><article class="widget_photos">

				<h3><span>Social</span></h3>

				<ul>

				<li><a style="color: #3b5998" target="_blank" href="https://www.facebook.com/IntegritySolutionsEC"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></li>

					<li><a style="color: #cc3333" target="_blank " href="http://integrity-solutions.negocio.site/"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>

					<li><a style="color: #0077b5" target="_blank" href="https://www.linkedin.com/company/integrity-solutions-ec/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>

				</ul>

			</article>

		</section>

		
		<section class="copyright">Copyright © 2019 by <a href="https://amazondigitalecuador.com">Amazon Digital Ecuador</a></section>
	</footer>

    

    

	<script type="text/javascript" src="js/scripts.js"></script>

	<script type="text/javascript" src="js/aos.js"></script>

  <script>

    AOS.init();

  </script>

	<!--[if lt IE 9]>

		<script type="text/javascript" src="js/ie.js"></script>

	<![endif]-->

	<!-- Global site tag (gtag.js) - Google Analytics -->

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115651902-1"></script>	

	<script type="aplication/ld+json">

{

	"@context": "http://schema.org",

	"@type": "Store",

    "image": "logo.png",

	"name": "Integrity Solutions",

	"email": "mailto:ppadilla@integritysolutions.ec",

	"telephone": "(593) 995-527-670",

	"url": "Https://integritysolutions.ec",

	"address": {

		"@type": "PostalAddress",

		"addressLocality": "Tena, Ecuador",

		"postalCode": "150150",

		"streetAddress": "Av. De los Shyris N41-151 e Isla Floreana"

	  },

	"sameAs": [

		"https://www.facebook.com/IntegritySolutionsEC",

		"http://integrity-solutions.negocio.site/",

		"https://www.linkedin.com/company/integrity-solutions-ec/"

	],

	"openingHoursSpecification": [

    {

      "@type": "OpeningHoursSpecification",

      "dayOfWeek": "http://schema.org/Sunday"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes": "18:00:00" ,

      "dayOfWeek": "http://schema.org/Saturday",

      "opens": "08:30:00"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes":  "18:00:00",

      "dayOfWeek": "http://schema.org/Thursday",

      "opens": "08:30:00"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes": "18:00:00",

      "dayOfWeek": "http://schema.org/Tuesday",

      "opens": "08:30:00"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes": "18:00:00",

      "dayOfWeek":  "http://schema.org/Friday",

      "opens": "08:30:00"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes": "18:00:00",

      "dayOfWeek": "http://schema.org/Monday",

      "opens": "08:30:00"

    },

    {

      "@type": "OpeningHoursSpecification",

      "closes": "18:00:00",

      "dayOfWeek":  "http://schema.org/Wednesday",

      "opens": "08:30:00"

    }

  ]

}

</script>		

</body>



</html>
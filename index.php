<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>EBT Passport</title>

		<!--meta name="viewport" content="width=device-width, initial-scale=1.0"-->

		<!-- Bootstrap core CSS -->

		<!--<link rel="stylesheet" href="/css/bootstrap.css">-->

		<!-- CSS -->
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

		<link rel="stylesheet" href="css/local.css">

		<link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.10.3.custom.css" />

		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

		<!-- Fuel UX CSS -->
		<!--<link href="css/fuelux.css" rel="stylesheet">-->

		<!-- JSTree Plugin/if using this remove the fuelux -->
		<link href="css/jstree.css" rel="stylesheet">

		<!-- jQuery -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
		<script src="js/jquery-git.js"></script>
		<script src="js/jquery.cookie.js"></script>

		<script src="js/main.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div class="doc-search">

			<h3>Documents</h3>

			<form role="form" method="GET" id="search-form">
				<!--<div class="form-group">-->
				<div class="input-group">
					<input value="" type="text" class="form-control searchfield"
						name="search" id="search" placeholder="Search Documents" autofocus>
					<span class="input-group-addon">
							<i class="fa fa-search" id="textbox-icon"></i>
					</span>
					<select id="folders" name="folders" class="form-control">
						<option value="0">All</option>
					</select>
				</div><!-- End of input-group -->
				<input val="Search" type="submit" class="btn btn-default hidden">&nbsp;
				<span style="display:none;" id="spinny">
				<img src="/images/ajax-loader-arrows.gif"></span>
			</form>


			<div id="error-container">
			</div>

				<!-- in this example the tree is populated from inline HTML
				<ul>
					<li>Root node 1
						<ul>
							<li id="child_node_1">Child node 1</li>
							<li>Child node 2</li>
						</ul>
					</li>
					<li>Root node 2</li>
				</ul>-->

    	<div class = "row clearfix" >
        <div class = "col-md-8 column" >
            <div class = "col-md-10" >
                <div class = "row-fluid" >
                    <div class = "results span11" >
                        <input type = "submit" class = "btn btn-default submit-filter hidden" >
                    </div >
										<ul id="results">
										</ul>
                    <script id = "FileTemplate" type = "text/template" >
                        <div >
                            <div class = "" >

                                            <span >
                                                <a href = "<%= url %>" ><%= filename %></a >
                                                  <small > (<%= filesize %>KB)</small >
                                        </span >
                                <%=  (new Date(last_modified)).toDateString()  %>
                            </div >
                        </div >
                    </script >
                </div >
            </div >
        </div >
        <div class = "col-md-4 column" >
						<div id="jstree">
						</div >
            <div id = "lazy" class = "demo" ></div >
        </div >
        <div class = "col-md-12 column" >
        </div >
    </div >
		</div><!-- End of doc-search -->
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		<!--<script src="js/fuelux.js"></script>-->
		<script>
				var base_url = "http://192.168.2.143";
		</script>
		<script src="js/jstree.min.js"></script>
		<script src="js/docs.js"></script>
		<script src="js/underscore-min.js"></script >
		<script src="js/backbone-min.js"></script >
		<script src="js/backbone_app.js"></script >
	</body>
</html>

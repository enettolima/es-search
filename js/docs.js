function doSearch(searchstring) {
        $("#spinny").show();

        $("#resultsHeader").hide();
				hideErrorMessage("#error-container");

        event.preventDefault();

        $("#results").empty();

				var folder_selected =  $("#folders").val();

				var data = buildSearchQuery(folder_selected, searchstring);

        $.ajax({
            //url: '/lsvc/docs-search',
            url: '/modules/search.php',
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(data),
            success: function(response) {

                $("#spinny").hide();

                var data = response.hits.hits;
                var doc_ids = [];
                var source = null;
                var content = '';

                if (data.length > 0) {
                    $("#resultsHeader").html(data.length + " Results").show();
                    for (var i = 0; i < data.length; i++) {

                        source = data[i].fields;

                        var url = source["file.url"][0];

                        var dateString = undefined;

                        if (typeof source["meta.date"] !== "undefined") {

                            var formattedDate = new Date(source["meta.date"][0]);

                            var d = formattedDate.getDate();
                            var m =  formattedDate.getMonth();
                            m += 1;  // JavaScript months are 0-11
                            var y = formattedDate.getFullYear();

                            dateString = m + "/" + d + "/" + y;
                        }

                        var re = /^file:\/\/\/media\/web\/downloads\/(.*)$/;

                        if (url) {

                            var highlight = "Summary Not Available";

                            if (data[i].highlight) {

                                highlight = data[i].highlight.content[0];

                             }

                            var fixed = url.match(re)[1];

                            var filename 	= source["file.filename"][0];
                            var virtual 	= source["path.virtual"][0];

                            var full = "/docs" + source["path.virtual"][0] + encodeURIComponent(filename);

                            var row = "";

                            row += "<li>";
                            row += "<h4><a target='_blank' href='"+full+"'>"+filename+"</a></h4>";
                            row += "<ul>";
                            if (typeof dateString !== "undefined") {
                                row += "<li><strong>File Date:</strong> "+dateString+"</li>";
                            }
                            row += "<li>"+highlight+"</li>";
                            row += "<li class='file-path'><i class='fa fa-paper-plane-o'></i> Path: "+virtual+"</li>";
                            row += "</ul>";
                            row += "</li>";

                            $("#results").append(row);
                        }

                    }

                } else {
                  //$("#resultsHeader").html("No Results").show();
									showErrorMessage("#error-container", "<strong>Ooops!</strong> No results found! Please try again.","alert-danger", true, 3000);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                var jso = jQuery.parseJSON(jqXHR.responseText);
                error_note('section', 'error', '(' + jqXHR.status + ') ' + errorThrown + ' --<br />' + jso.error);
            }
        });
}

function buildSearchQuery(folder, searchstring){
	var response = '';
	var real_folder = folder+"/";
	var must_query = '';
	if(folder==0){
		/*response = {
				query: {
						bool: {
							must:[{
								match: { _all: searchstring }
							}]
						}
				},
				//fields : ["filename", "url", "path.virtual", "lastdate", "date"],
				fields : ["filename", "url", "path.virtual", "last_modified", "date"],
				size : 1000,
				highlight : {
						"fields" : {
								"content" : {}
						}
				}
		};*/
		//must_query = { match: { _all: searchstring }};
		response = {
			query: {
				bool: {
					must:[
						{ match: { _all: searchstring }}
					]
				}
			},
			//fields : ["filename", "url", "path.virtual", "lastdate", "date"],
			fields : ["filename", "url", "path.virtual", "last_modified", "date"],
			size : 1000,
			highlight : {
				"fields" : {
					"content" : {}
				}
			}
		};
	}else{
		//must_query = { match: { _all: searchstring }},
		//{ match: { "path.virtual": real_folder }};
		response = {
			query: {
				bool: {
					must:[
						{ match: { _all: searchstring }},
						{ match: { "path.virtual": real_folder }}
					]
				}
			},
			//fields : ["filename", "url", "path.virtual", "lastdate", "date"],
			fields : ["filename", "url", "path.virtual", "last_modified", "date"],
			size : 1000,
			highlight : {
				"fields" : {
					"content" : {}
				}
			}
		};
	}
	/*response = {
		query: {
			bool: {
				must:[
					must_query
				]
			}
		},
		//fields : ["filename", "url", "path.virtual", "lastdate", "date"],
		fields : ["filename", "url", "path.virtual", "last_modified", "date"],
		size : 1000,
		highlight : {
			"fields" : {
				"content" : {}
			}
		}
	};*/
	/*response = {
		query: {
			bool: {
				must:[
					{ match: { _all: searchstring }},
					{ match: { "path.virtual": real_folder }}
				]
			}
		},
		//fields : ["filename", "url", "path.virtual", "lastdate", "date"],
		fields : ["filename", "url", "path.virtual", "last_modified", "date"],
		size : 1000,
		highlight : {
			"fields" : {
				"content" : {}
			}
		}
	};*/
	console.log("Json is "+JSON.stringify(response));
	return response;
}

function showErrorMessage(container, message, type, auto_hide, hide_timeout){
	var error_box = '<div class="alert '+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+message+'</div>';
	$(container).html(error_box);
	$(container).hide();
	$(container).slideDown("fast", function() {});

	if(auto_hide){
		$(container).delay(hide_timeout).fadeOut('slow');
	}
	/*if(auto_hide){
		setTimeout(function() {
        $(container).hide('blind', {}, 500)
    }, hide_timeout);
	}
*/
}

function hideErrorMessage(container){
	//$(container).html('');
	$(container).slideUp("fast", function() {});
	//$(container).hide();
}

$(document).ready(function(){
	//Change the icon of the text box as the user types
	$( ".searchfield" ).keyup(function() {
		toggleSearchButton();
	});

	//If button is clicked when there is text in it,
	//clear text and show folders
	$(".input-group-addon").on('click', function (e) {
		if ($('.searchfield').val()) {
			$('.searchfield').val("");
			toggleSearchButton();
		}
	});

	//Process the search
	$("form").on("submit", function(event){
		if ($('.searchfield').val()) {
			doSearch($('.searchfield').val());
		}else{
			return false;
		}
	});

});

var treefolders = [];
//Function to get the directories and populate the listbox on the search
$(function () {
	console.log("inside Folders function");
	var data = "";
	 $.ajax({
				url: '/modules/folders-list.php',
				type: 'GET',
				contentType: 'application/json; charset=UTF-8',
				crossDomain: true,
				dataType: 'json',
				data: JSON.stringify(data),
				success: function(response) {

					var data = response.hits.hits;
					var doc_ids = [];
					var source = null;
					var content = '';
					var folders = [];

					if (data.length > 0) {
						//$("#results").html(data.length + " Results").show();
						for (var i = 0; i < data.length; i++){
							source = data[i]._source;
							//var url = source["path.virtual"][0];
							if(source.virtual!=null){
								folders.push(source.virtual);
								var res = source.virtual.split("/")
								if(!$.inArray(res[1], treefolders)){
									treefolders.push(res[1]);
								}
							}
						}

						if(folders.length>0){
							folders.sort();
							for (var i = 0; i < folders.length; i++){
								$('#folders').append('<option value="'+folders[i]+'">'+folders[i]+'</option>');
							}
						}
						console.log("done Folders function");
						//buildTree();
					} else {
						//$("#results").html("No Results").show();
					}

			},
			/*error: function(jqXHR, textStatus, errorThrown) {
					var jso = jQuery.parseJSON(jqXHR.responseText);

					error_note('section', 'error', '(' + jqXHR.status + ') ' + errorThrown + ' --<br />' + jso.error);
			}*/
	});
});

//Function toggles between the search results and the folders structure
function toggleSearchButton(){
	if ($('.searchfield').val()) {
		//Change the icon to show the cross instead of the search icon
		$('#textbox-icon').removeClass('fa fa-search').addClass('fa fa-times');
		//hide the documents tree
		//$('#jstree').fadeOut( "slow", function() {});
	}else{
		$('#results').html('');
		//Change the icon to show the search instead of the cross
		$('#textbox-icon').removeClass('fa fa-times').addClass('fa fa-search');
		//hide the documents tree
		//$('#jstree').fadeIn( "slow", function() {});
	}
}
/*
$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});*/

/*
$(function () {
    // 6 create an instance when the DOM is ready
    $('#jstree').jstree({
			"core" : {
				"animation" : 0,
				"check_callback" : true,
				//"themes" : { "stripes" : true },
				'data' : {
					'url' : function (node) {
						return node.id === '#' ?
							'/modules/folders-tree.php' : 'modules/folders.php';
							//'ajax_demo_roots.json' : 'ajax_demo_children.json';
					},
					'data' : function (node) {
						return { 'id' : node.id };
					}
				}
			},
			"types" : {
				"#" : {
					"max_children" : 1,
					"max_depth" : 4,
					"valid_children" : ["root"]
				},
				"root" : {
					//"icon" : "/static/3.1.0/assets/images/tree_icon.png",
					//"icon" : "fa fa-folder-open",
					"valid_children" : ["default"]
				},
				"default" : {
					//"icon" : "fa fa-folder-open",
					"valid_children" : ["default","file"]
				},
				"file" : {
					//"icon" : "glyphicon glyphicon-file",
					//"icon" : "fa fa-file-o",
					"valid_children" : []
				}
			},
			"plugins" : [
				"contextmenu", "dnd", "search",
				"state", "types"
			]
		}).on("changed.jstree", function (e, data) {
        if (data.selected.length) {
					//console.log("clicked on "+data.instance.get_node(data.selected[0]).id);
					$('#path').val(data.instance.get_node(data.selected[0]).id);
					//$('.breadcrumb li a').text(data.instance.get_node(data.selected[0]).id);
					$('#search-form').submit();
        }
    });
    // 7 bind to events triggered on the tree
    // 8 interact with the tree - either way is OK
    $('button').on('click', function () {
      $('#jstree').jstree(true).select_node('child_node_1');
      $('#jstree').jstree('select_node', 'child_node_1');
      $.jstree.reference('#jstree').select_node('child_node_1');
    });
  });*/

/*
$('#lazy').jstree({
    'core': {
        'data': {
            "url": base_url + "/modules/folders-tree.php",
            "data": function (node) {
                return {"id": node.id};
            }
        }
    }
}).on("changed.jstree", function (e, data) {
	console.log("Jstree changed");
    if (data.selected.length) {
        $('#path').val(data.instance.get_node(data.selected[0]).id);
        $('.breadcrumb li a').text(data.instance.get_node(data.selected[0]).id);
        $('#search-form').submit();
    }
});
$('#search-form').submit(function (e) {
	console.log("search-form submit");
    e.preventDefault();
    $('.submit-filter').click();
});*/

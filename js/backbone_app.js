
/**
 * Created by wallas on 27/04/2015.
 */

/*
 * generate a url out of filters and generate the server side link
 * @return {String} url
 */
var last_refine = 0;

var FiltrationManager = {
    url: function () {
        var url = base_url + "/ajax/search/files?";
        var query = '';

        $("#search-form input[type=text]").each(function (i, el) {
            if ($(el).val() !== "" && $(el).val() !== " " && el.id != 'ww') {
                query += el.id + '=' + $(el).val() + '&';

            }
        });
        $("#search-form input[type=hidden]").each(function (i, el) {
            if ($(el).val() !== "" && $(el).val() !== " " && el.id != 'ww') {
                query += el.id + '=' + $(el).val() + '&';

            }
        });

        if (history.pushState) {
            var new_url = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + query;
            window.history.replaceState({
                path: new_url
            }, '', new_url);
        }
        return url + query;
    }
};

var File = Backbone.Model.extend({
    defaults: {
        p5: false
    }
});

var Files = Backbone.Collection.extend({
    model: File,
    url: FiltrationManager.url(),
    parse: function (response) {

        count_of_people = response.total;
        $("#total").html(count_of_people);
        return response.data;
    }
});
var FileView = Backbone.View.extend({
    tagName: "li",
    className: "applicant_single_view active-tab",
    template: $("#FileTemplate").html(),
    render: function () {
        var tmpl = _.template(this.template);
        //tmpl is a function that takes a JSON object
        this.$el.html(tmpl(this.model.toJSON()));
        //this.el is what we defined in tagName.
        return this;
    }
});
var FilesView = Backbone.View.extend({
    el: $(".results"),
    initialize: function () {

        //$("#demmer").show();
        this.collection = new Files();
        this.collection.on("add", this.renderFile, this);

    },
    events: {
        'click .submit-filter': 'addFilter'
    },
    render: function () {
        $(".results").empty();
        _.each(this.collection.models, function (item) {
            this.renderPerson(item);
        }, this);
    },
    renderFile: function (item) {

        var FileViews = new FileView({
            model: item
        });
        this.$el.append(FileViews.render().el);
    },
    addFilter: function (e) {
			console.log("addFilter");

        if (last_refine == 0 || (Date.now() - last_refine) > 100) {
            last_refine = Date.now();
            e.preventDefault();
            $('.result_number').html('<img src="' + window.location.protocol + "//" + window.location.host + '/img/apache_pb.gif' + '" />');
            $('#pagination').html('');

            $(".applicant_single_view").remove();

            this.collection.fetch({
                url: FiltrationManager.url(),
                success: function () {

                },
                error: function () {
                    $('#error_connection').fadeIn(2000, function () {
                        $('#error_connection').fadeOut(2000);
                    });


                    $('.submit-filter').click();
                }
            });
        }
    }
});
/* END backbone IMeditation */

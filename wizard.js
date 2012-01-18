(function($) {
	$.fn.extend({
		wizard : function(options) {

			getSections(this);

			$(this).children().hide();

			addHeaderContent(this);

			addContent(this);

			addFooterContent(this);

			currentPage = sections[0].id;

			$.each(options, function(index) {
				if (options[index].policy != undefined) {
					navigationPolicy = options[index].policy;
				}
				if(options[index].onNext != undefined){
					next = options[index].onNext;
				}
				if(options[index].onPrevious != undefined){
					previous = options[index].onPrevious;
				}
			});

		}

	});

})(jQuery);

var sections = [];

var navigationPolicy;

var next;

var previous;

var getSections = function(parent) {
	sections = $(parent).children("section");
};

var addHeaderContent = function(parent) {

	var headerContent = '<div class="row">'
			+ '<div class="row display">'
			+ '<div class="twelve columns">'
			+ '<header title="Here s the title" class="wizard-header">'
			+ $(parent).attr('title') + '</header></div></div></div>';

	$(parent).append(headerContent);

};

var addContent = function(parent) {

	var content = '<div class="row">' + '<div class="row display" >'
			+ '<div class="three columns">' + '<nav class="wizard-nav">'
			+ '<dl class="nice tabs vertical">';

	var navigationPanelContent = '';

	$
			.each(
					sections,
					function(index) {
						navigationPanelContent = navigationPanelContent
								+ '<dd><a type="button" onclick="navigationPanelClicked(this.text)">'
								+ (sections[index].title) + '</a></dd>';
					});

	navigationPanelContent = navigationPanelContent + '</dl></nav></div>';

	var sectionContent = '<div class="nine columns" id="section-content">';

	sectionContent = sectionContent + '</div></div></div>';

	$(parent).append(content + navigationPanelContent + sectionContent);

	$.each(sections, function(index) {

		$('#section-content').append($('#' + sections[index].id));

	});

	$('#' + sections[0].id).show();

};

var addFooterContent = function(parent) {
	footerContent = '<div class="row">'
			+ '<div class="row display">'
			+ '<div class="twelve columns">'
			+ '<footer><p><input class="navigation-button-next" '
			+ 'type="button" value="Next">'
			+ '<input class="navigation-button-previous" type="button" value="Previous"></p></footer></div></div></div>';

	$(parent).append(footerContent);
	$('.navigation-button-next').click(function() {
		nextClicked();
	});

	$('.navigation-button-previous').click(function() {
		previousClicked();
	});

};

var currentPage = "";

var showPreviousPage = function(i) {
	$('#' + currentPage).hide();
	currentPage = sections[i - 1].id;
	$('#' + currentPage).show();
};

var previousClicked = function() {
	for (i = 0; i < sections.length; i++) {
		if (currentPage == sections[i].id && sections[i - 1] != undefined) {
			if (previous != undefined) {
				var a = previous.call();
				if (a == true) {
					showPreviousPage(i);
				}
			} else {
				showPreviousPage(i);
			}
			break;
		} else {
			continue;
		}
	}
};

var showNextPage = function() {
	$('#' + currentPage).hide();
	currentPage = sections[i + 1].id;
	$('#' + currentPage).show();
}

var nextClicked = function() {
	for (i = 0; i < sections.length; i++) {
		if (currentPage == sections[i].id && sections[i + 1] != undefined) {
			if (next != undefined) {
				var a = next.call();
				if (a == true) {
					showNextPage(i);
				}
			} else {
				showNextPage(i);
			}
			break;
		} else {
			continue;
		}
	}
};

var navigationPanelClicked = function(value) {
	for (i = 0; i < sections.length; i++) {
		if (navigationPolicy == undefined || navigationPolicy == 'flexible') {
			if (sections[i].title == value) {
				currentPage = sections[i].id;
				$('#' + currentPage).show();
			} else {
				var id = sections[i].id;
				$('#' + id).hide();
				continue;
			}
		}else {
			alert('Not possible since navigation policy is not flexible');
			break;
		}
	}
};

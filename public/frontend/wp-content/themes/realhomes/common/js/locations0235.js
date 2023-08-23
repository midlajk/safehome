(function ($) {
	"use strict";

	if (typeof realhomesLocationsData !== 'undefined') {

		const parentLocations = realhomesLocationsData.all_locations.map(location => ({ name: location.name }));

		const selectBoxesIDs = realhomesLocationsData.select_names;
		const selectBoxesCount = parseInt(realhomesLocationsData.select_count);
		const multiSelect = realhomesLocationsData.multi_select_locations; // Added multi-select flag
		const anyText = realhomesLocationsData.any_text;
		const consoleLogEnabled = false;

		if (consoleLogEnabled) {
			console.log('Parent Locations: ');
			console.log(parentLocations);
		}

		(function () {
			prepareSelectBoxes();

			for (let selectIndex = 0; selectIndex < selectBoxesCount; selectIndex++) {
				const currentSelect = $('#' + selectBoxesIDs[selectIndex]);
				const currentIsLast = (selectBoxesCount === (selectIndex + 1));

				if (selectIndex === 0) {
					addParentLocations(currentSelect, currentIsLast);
				}
			}
		})();

		function addParentLocations(targetSelect, addAllChildren) {
			let insertionCounter = 0;

			parentLocations.forEach(function (currentLocation) {
				targetSelect.append('<option value="' + currentLocation.name + '">' + currentLocation.name + '</option>');
				insertionCounter++;
			});
		}

		function prepareSelectBoxes() {
			for (let selectIndex = 0; selectIndex < selectBoxesCount; selectIndex++) {
				let currentSelectId = selectBoxesIDs[selectIndex];
				let currentSelect = $('#' + currentSelectId);

				if (multiSelect === 'yes') { // Check if it's a multi-select input
					currentSelect.attr('multiple', 'multiple'); // Add 'multiple' attribute
				}

				addAnyOption(currentSelect);
			}
		}

		function addAnyOption(targetSelect) {
			if (targetSelect.has('option').length > 0) {
				return;
			}

			let targetSelectIndex = selectBoxesIDs.indexOf(targetSelect.attr('id'));

			if (targetSelect.parents('.rh_prop_search__select').hasClass('rh_location_prop_search_' + targetSelectIndex)) {
				let targetSelectPlaceholder = targetSelect.parents('.rh_prop_search__select').data('get-location-placeholder');
				targetSelect.append('<option value="' + targetSelectPlaceholder + '" selected="selected">' + targetSelectPlaceholder + '</option>');
			} else if (targetSelect.parents('.rh_prop_loc__select').hasClass('rh_location_prop_loc_' + targetSelectIndex)) {
				targetSelect.append('<option value="' + anyText + '" selected="selected">' + anyText + '</option>');
			}
		}
	}
})(jQuery);

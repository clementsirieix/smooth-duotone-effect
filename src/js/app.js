/*jslint es6 browser:true */
/*global require */
((window, document, $, _) => {
    'use strict';
    const $document = $(document),
          $startColor = $('#start-color'),
          $endColor = $('#end-color'),
          $channels = {
              red: $('feFuncR'),
              green: $('feFuncG'),
              blue: $('feFuncB')
          };
    // translate hex color to rgb color
    const splitChannels = (value) => {
        return {
            red: parseInt(value.substr(1,2), 16),
            green: parseInt(value.substr(3,2), 16),
            blue: parseInt(value.substr(5,2), 16)
        };
    };
    // update the svg filters
    // index, value : 0 or 1, 0 the starting color, 1 the ending color
    const updateValue = (index, newChannels) => {
        for(let chan in $channels) {
            const oldValues = $channels[chan].attr('tableValues').split(' ');
            oldValues[index] = (newChannels[chan] / 255).toString();
            const newValues = oldValues.join(' ');
            $channels[chan].attr('tableValues', newValues);
        }
    };
    const changeStartValue = (e) => {
        const newChannels = splitChannels(e.target.value);
        updateValue(0, newChannels);
    };
    const changeEndValue = (e) => {
        const newChannels = splitChannels(e.target.value);
        updateValue(1, newChannels);
    };
    // detect color changes
    $startColor.on('change', _.debounce(changeStartValue, 200));
    $endColor.on('change', _.debounce(changeEndValue, 200));
})(window, document, $, _);

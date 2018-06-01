define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTextChange defined for txtSearchBox **/
    AS_TextField_g6b63931c1da4a83bb14b319c7104134: function AS_TextField_g6b63931c1da4a83bb14b319c7104134(eventobject, changedtext) {
        var self = this;
        return self.searchCity.call(this);
    },
    /** onRowClick defined for segSearchCity **/
    AS_Segment_d22948a3ffd743dab73f9d7a03cbabcf: function AS_Segment_d22948a3ffd743dab73f9d7a03cbabcf(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_True() {
            self.choiseCity.call(this, rowNumber);
        }
        function SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_False() {}
        function SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_Callback(response) {
            if (response === true) {
                SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_True();
            } else {
                SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_False();
            }
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": "Add City",
            "yesLabel": "Yes",
            "noLabel": "No",
            "alertIcon": "plus_add_green.png",
            "message": "Do you really want to add this city?",
            "alertHandler": SHOW_ALERT__hb7da2d4b0414d04b74bdbaed1728ef6_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** onTouchStart defined for segSearchCity **/
    AS_Segment_ib5eb11a78b54e3c8ce355e4470b40bf: function AS_Segment_ib5eb11a78b54e3c8ce355e4470b40bf(eventobject, x, y) {
        var self = this;
    },
    /** onClick defined for btnGetCities **/
    AS_Button_a45c38c70fe044d2aa9efcacdb87d9de: function AS_Button_a45c38c70fe044d2aa9efcacdb87d9de(eventobject) {
        var self = this;
        return self.showNewCity.call(this);
    },
    /** onClick defined for flxSearch **/
    AS_FlexContainer_gef274a357c34e07adffe73812bace0e: function AS_FlexContainer_gef274a357c34e07adffe73812bace0e(eventobject) {
        var self = this;
    }
});
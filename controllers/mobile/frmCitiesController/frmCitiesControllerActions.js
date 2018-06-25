define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for lstCities **/
    AS_Segment_f8abff1d63554838b1c0a223c1088dcc: function AS_Segment_f8abff1d63554838b1c0a223c1088dcc(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.deleteRecord.call(this);
    },
    /** onClick defined for addNewCity **/
    AS_Button_dd0a310792b44cedacc3e017e14cc86c: function AS_Button_dd0a310792b44cedacc3e017e14cc86c(eventobject) {
        var self = this;
        return self.navigate.call(this);
    },
    /** postShow defined for frmCities **/
    AS_Form_add0bae1cd46438facecc174d604106b: function AS_Form_add0bae1cd46438facecc174d604106b(eventobject) {
        var self = this;
        return self.fetchData.call(this);
    }
});
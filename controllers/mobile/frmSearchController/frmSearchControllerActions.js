define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTextChange defined for inputSearch **/
    AS_TextField_c9b2f30ccd5745b5b4c8fab87ea04f97: function AS_TextField_c9b2f30ccd5745b5b4c8fab87ea04f97(eventobject, changedtext) {
        var self = this;
        return self.searchDataTimer.call(this);
    },
    /** onDone defined for inputSearch **/
    AS_TextField_i530c976bfe24d9abf2ac5f0532377e4: function AS_TextField_i530c976bfe24d9abf2ac5f0532377e4(eventobject, changedtext) {
        var self = this;
    },
    /** onRowClick defined for lstSearch **/
    AS_Segment_f84b8724569645f180720718efab5c16: function AS_Segment_f84b8724569645f180720718efab5c16(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.create.call(this);
    }
});
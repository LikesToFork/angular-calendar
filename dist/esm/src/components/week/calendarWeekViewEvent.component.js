import { Component, Input, Output, EventEmitter } from '@angular/core';
var CalendarWeekViewEventComponent = (function () {
    function CalendarWeekViewEventComponent() {
        this.eventClicked = new EventEmitter();
    }
    return CalendarWeekViewEventComponent;
}());
export { CalendarWeekViewEventComponent };
CalendarWeekViewEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-week-view-event',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-event\"\n        [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n        [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n        [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n        [ngClass]=\"weekEvent.event?.cssClass\"\n        [mwlCalendarTooltip]=\"weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event\"\n        [tooltipPlacement]=\"tooltipPlacement\">\n        <mwl-calendar-event-actions [event]=\"weekEvent.event\"></mwl-calendar-event-actions>\n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          view=\"week\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{weekEvent: weekEvent, tooltipPlacement: tooltipPlacement, eventClicked: eventClicked}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
CalendarWeekViewEventComponent.ctorParameters = function () { return []; };
CalendarWeekViewEventComponent.propDecorators = {
    'weekEvent': [{ type: Input },],
    'tooltipPlacement': [{ type: Input },],
    'customTemplate': [{ type: Input },],
    'eventClicked': [{ type: Output },],
};
//# sourceMappingURL=calendarWeekViewEvent.component.js.map
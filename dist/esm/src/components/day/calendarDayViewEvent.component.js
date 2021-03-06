import { Component, Input, Output, EventEmitter } from '@angular/core';
var CalendarDayViewEventComponent = (function () {
    function CalendarDayViewEventComponent() {
        this.eventClicked = new EventEmitter();
    }
    return CalendarDayViewEventComponent;
}());
export { CalendarDayViewEventComponent };
CalendarDayViewEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view-event',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"dayEvent.event.color.secondary\"\n        [style.borderColor]=\"dayEvent.event.color.primary\"\n        [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n        [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n        [ngClass]=\"dayEvent.event.cssClass\"\n        [mwlCalendarTooltip]=\"dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event\"\n        [tooltipPlacement]=\"tooltipPlacement\">\n        <mwl-calendar-event-actions [event]=\"dayEvent.event\"></mwl-calendar-event-actions>\n        <mwl-calendar-event-title\n          [event]=\"dayEvent.event\"\n          view=\"day\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{dayEvent: dayEvent, tooltipPlacement: tooltipPlacement, eventClicked: eventClicked}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
CalendarDayViewEventComponent.ctorParameters = function () { return []; };
CalendarDayViewEventComponent.propDecorators = {
    'dayEvent': [{ type: Input },],
    'tooltipPlacement': [{ type: Input },],
    'customTemplate': [{ type: Input },],
    'eventClicked': [{ type: Output },],
};
//# sourceMappingURL=calendarDayViewEvent.component.js.map
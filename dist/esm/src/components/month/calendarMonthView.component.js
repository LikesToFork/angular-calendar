import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject } from '@angular/core';
import isSameDay from 'date-fns/is_same_day';
import setDate from 'date-fns/set_date';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import addSeconds from 'date-fns/add_seconds';
import { CalendarUtils } from '../../providers/calendarUtils.provider';
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * &lt;mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-month-view&gt;
 * ```
 */
var CalendarMonthViewComponent = (function () {
    /**
     * @hidden
     */
    function CalendarMonthViewComponent(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events || changes.excludeDays) {
            this.refreshBody();
        }
        if (changes.activeDayIsOpen || changes.viewDate || changes.events || changes.excludeDays) {
            this.checkActiveDayIsOpen();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.toggleDayHighlight = function (event, isHighlighted) {
        this.view.days.forEach(function (day) {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor = event.color.secondary;
            }
            else {
                delete day.backgroundColor;
            }
        });
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.eventDropped = function (day, event) {
        var year = getYear(day.date);
        var month = getMonth(day.date);
        var date = getDate(day.date);
        var newStart = setDate(setMonth(setYear(event.start, year), month), date);
        var newEnd;
        if (event.end) {
            var secondsDiff = differenceInSeconds(newStart, event.start);
            newEnd = addSeconds(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd });
    };
    CalendarMonthViewComponent.prototype.refreshHeader = function () {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays
        });
    };
    CalendarMonthViewComponent.prototype.refreshBody = function () {
        var _this = this;
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays
        });
        if (this.dayModifier) {
            this.view.days.forEach(function (day) { return _this.dayModifier(day); });
        }
    };
    CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = function () {
        var _this = this;
        if (this.activeDayIsOpen === true) {
            this.openDay = this.view.days.find(function (day) { return isSameDay(day.date, _this.viewDate); });
            var index = this.view.days.indexOf(this.openDay);
            this.openRowIndex = Math.floor(index / this.view.totalDaysVisibleInWeek) * this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    };
    CalendarMonthViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.checkActiveDayIsOpen();
    };
    return CalendarMonthViewComponent;
}());
export { CalendarMonthViewComponent };
CalendarMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-month-view',
                template: "\n    <div class=\"cal-month-view\">\n      <mwl-calendar-month-view-header\n        [days]=\"columnHeaders\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\">\n      </mwl-calendar-month-view-header>\n      <div class=\"cal-days\">\n        <div *ngFor=\"let rowIndex of view.rowOffsets\">\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"let day of view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)\"\n              [class.cal-drag-over]=\"day.dragOver\"\n              [ngClass]=\"day?.cssClass\"\n              [day]=\"day\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [customTemplate]=\"cellTemplate\"\n              (click)=\"dayClicked.emit({day: day})\"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              (dragEnter)=\"day.dragOver = true\"\n              (dragLeave)=\"day.dragOver = false\"\n              (drop)=\"day.dragOver = false; eventDropped(day, $event.dropData.event)\"\n              (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            [customTemplate]=\"openDayEventsTemplate\"\n            (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
            },] },
];
/** @nocollapse */
CalendarMonthViewComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: CalendarUtils, },
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
]; };
CalendarMonthViewComponent.propDecorators = {
    'viewDate': [{ type: Input },],
    'events': [{ type: Input },],
    'excludeDays': [{ type: Input },],
    'activeDayIsOpen': [{ type: Input },],
    'dayModifier': [{ type: Input },],
    'refresh': [{ type: Input },],
    'locale': [{ type: Input },],
    'tooltipPlacement': [{ type: Input },],
    'weekStartsOn': [{ type: Input },],
    'headerTemplate': [{ type: Input },],
    'cellTemplate': [{ type: Input },],
    'openDayEventsTemplate': [{ type: Input },],
    'dayClicked': [{ type: Output },],
    'eventClicked': [{ type: Output },],
    'eventTimesChanged': [{ type: Output },],
};
//# sourceMappingURL=calendarMonthView.component.js.map
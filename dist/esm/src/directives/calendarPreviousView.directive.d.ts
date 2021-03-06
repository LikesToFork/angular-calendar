import { EventEmitter } from '@angular/core';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * &lt;button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view"&gt;
 *  Previous
 * &lt;/button&gt;
 * ```
 */
export declare class CalendarPreviousViewDirective {
    /**
     * The current view
     */
    view: string;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    /**
     * @hidden
     */
    onClick(): void;
}

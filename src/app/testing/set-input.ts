import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

/** Set html form input value
 *
 * This helper makes sure that the input state is propagated and form validation
 * happens once change detection is triggered
 *
 * @params fixture: component fixture
 * @params selector: input element selector
 * @params value: value
 */
export function setInput(formDE: DebugElement, selector: string, value: string) {
    const inputDE = formDE.query(By.css(selector));
    inputDE.nativeElement.value = value;
    inputDE.triggerEventHandler('input', { target: inputDE.nativeElement });
}

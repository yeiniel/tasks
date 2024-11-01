import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { setInput } from "./set-input";
import { By } from "@angular/platform-browser";

/** Fill html form and submit
 * 
 * @params fixture: component testing fixture
 * @params values: array of selector, value pairs
 * @params formDE: form debug element
 */
export function fillFormAndSubmit(fixture: ComponentFixture<unknown>, values: [selector: string, value: string][], formDE?: DebugElement) {
    formDE = formDE ?? fixture.debugElement.query(By.css('form'));
    
    for(const [selector, value] of values) {
        setInput(formDE, selector, value);
    }

    fixture.detectChanges();

    formDE.triggerEventHandler('submit', null);

    fixture.detectChanges();
}
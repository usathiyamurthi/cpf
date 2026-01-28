import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHelperTextComponent } from './field-helper-text.component';

describe('FieldHelperTextComponent', () => {
    let component: FieldHelperTextComponent;
    let fixture: ComponentFixture<FieldHelperTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FieldHelperTextComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldHelperTextComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the text', () => {
        component.text = 'This is a helper text!';
        fixture.detectChanges();
        const helperText = fixture.debugElement.nativeElement.querySelector('div').textContent;
        expect(component.text).toBe(helperText);
    });

    it('should apply the styles to helper text', () => {
        component.text = 'This is a helper text!';
        component.styleClass = 'text-primary test1';
        fixture.detectChanges();
        const helperTextDiv: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('div');
        expect(component.styleClass).toBe(helperTextDiv.className);
    });

    it('should render empty text if text is not provided', () => {
        const helperText = fixture.debugElement.nativeElement.querySelector('div').textContent;
        expect(component.text).toBe(helperText);
    });

});

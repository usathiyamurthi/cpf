import { FileSelectDirective } from './file-select.directive';

describe('FileSelectDirective', () => {
  it('should create an instance', () => {
    const mockEl = { nativeElement: { files: [] } } as any;
    const directive = new FileSelectDirective(mockEl);
    expect(directive).toBeTruthy();
  });
});

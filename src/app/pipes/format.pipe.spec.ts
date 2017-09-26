import { FormatPipe } from './format.pipe';

describe('FormatPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatPipe('en-US');
    expect(pipe).toBeTruthy();
  });
});

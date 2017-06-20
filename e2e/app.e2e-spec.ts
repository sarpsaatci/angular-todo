import { PrimeTodoPage } from './app.po';

describe('prime-todo App', () => {
  let page: PrimeTodoPage;

  beforeEach(() => {
    page = new PrimeTodoPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

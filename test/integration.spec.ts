import {insert, query, disconnect} from "./helper";

describe('mongodb', () => {
  it('insert', (done) => {
    insert("test", [{ "test": "data" }], done);
  });

  it('query', (done) => {
    query("test", {}, (res) => {

    }, done);
  });

  after(() => {
    disconnect();
  });
});

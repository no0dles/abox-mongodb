import {Api} from "abox";
import chai = require("chai");
import * as mongodb from "../index";
import {Observable} from "rxjs";
import {InsertDocuments, QueryDocument} from "../src/actions";
import {getDb} from "../src/functions";

mongodb.config.uri = "mongodb://localhost/abox";

export function emitAction(action: any): Observable<any> {
  const api = new Api();

  api.use(mongodb.module);

  return api.emit(action);
}

export function query(collection: string, filter: any, callback: (res: any[]) => void, done: Function) {
  emitAction(new QueryDocument(collection, filter)).subscribe(res => {
    chai.expect(res.collection).to.be.equal(collection);

    callback(res.docs);
  }, err => {
    done(err);
  }, () => {
    done();
  });
}

export function insert(collection: string, docs: any[], done: Function) {
  emitAction(new InsertDocuments(collection, ...docs)).subscribe(res => {
    chai.expect(res.collection).to.be.equal(collection);
    chai.expect(res.result.ok).to.be.equal(1);
    chai.expect(res.result.n).to.be.equal(docs.length);
    chai.expect(res.docs.length).to.be.equal(docs.length);

    for(let i = 0; i < res.docs.length; i++) {
      chai.expect(res.docs[i]["_id"]).not.to.be.equal(undefined);

      for(let key in docs[i]) {
        chai.expect(res.docs[i][key]).to.be.equal(docs[i][key]);
      }
    }
  }, err => {
    done(err);
  }, () => {
    done();
  });
}

export function disconnect() {
  getDb().subscribe(db => {
    db.close(true);
  });
}

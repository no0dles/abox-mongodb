import {config} from "./config";
import {Observable} from "rxjs";
import {MongoClient, Collection, InsertWriteOpResult, Db, UpdateWriteOpResult, DeleteWriteOpResultObject} from "mongodb"

const client = new MongoClient();

let dbConnection = null;

export function getDb(): Observable<Db> {
  if(dbConnection !== null) return Observable.of(dbConnection);

  return Observable.create(observer => {
    client.connect(config.uri, (err, db) => {
      if(err) return observer.error(err);

      dbConnection = db;

      observer.next(db);
      observer.complete();
    });
  });
}

export function getCollection(name: string): Observable<Collection> {
  return getDb()
    .map(db => {
      return db.collection(name);
    });
}

export function findDocuments(collection: Collection, filter: any): Observable<any[]> {
  return Observable.create(observer => {
    collection.find(filter).toArray((err, docs) => {
      if(err) return observer.error(err);

      observer.next(docs);
      observer.complete();
    });
  });
}

export function insertDocuments(collection: Collection, docs: any[]): Observable<InsertWriteOpResult> {
  return Observable.create(observer => {
    collection.insertMany(docs, (err, res) => {
      if(err) return observer.error(err);

      observer.next(res);
      observer.complete();
    });
  });
}

export function updateDocuments(collection: Collection, filter: any, doc: any): Observable<UpdateWriteOpResult> {
  return Observable.create(observer => {
    collection.updateOne(filter, doc, (err, res) => {
      if(err) return observer.error(err);

      observer.next(res);
      observer.complete();
    });
  });
}

export function deleteDocument(collection: Collection, filter: any): Observable<DeleteWriteOpResultObject> {
  return Observable.create(observer => {
    collection.remove(filter, (err, res) => {
      if(err) return observer.error(err);

      observer.next(res);
      observer.complete();
    });
  });
}

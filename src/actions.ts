import {Required, String} from "abox-validator";
import {Action} from "abox";
import {
  DeleteWriteOpResultObject, UpdateWriteOpResult, ObjectID,
  InsertWriteOpResult
} from "mongodb";

export interface MongoResult {
  ok?: number;
  n?: number;
}

@Action({ name: "abox.mongodb.insert.documents" })
export class InsertDocuments {
  @Required()
  @String()
  public collection: string;

  @Required()
  public docs: any[];

  constructor(collection: string, ...docs: any[]) {
    this.collection = collection;
    this.docs = docs;
  }
}

@Action({ name: "abox.mongodb.insert.documents.result" })
export class InsertDocumentsResult {
  @Required()
  @String()
  public collection: string;

  @Required()
  public result: MongoResult;

  @Required()
  public docs: any[];

  constructor(collection: string, result: InsertWriteOpResult) {
    this.collection = collection;
    this.result = result.result;
    this.docs = result.ops;
  }
}

@Action({ name: "abox.mongodb.query.document" })
export class QueryDocument {
  @Required()
  @String()
  public collection: string;

  @Required()
  public filter: any;

  constructor(collection: string, filter: any) {
    this.collection = collection;
    this.filter = filter;
  }
}

@Action({ name: "abox.mongodb.query.document.result" })
export class QueryDocumentResult {
  @Required()
  @String()
  public collection: string;

  @Required()
  public docs: any[];

  constructor(collection: string, docs: any[]) {
    this.collection = collection;
    this.docs = docs;
  }
}

@Action({ name: "abox.mongodb.update.document" })
export class UpdateDocument {
  @Required()
  @String()
  public collection: string;

  @Required()
  public filter: any;

  @Required()
  public doc: any;
}

@Action({ name: "abox.mongodb.update.document.result" })
export class UpdateDocumentResult {
  @Required()
  @String()
  public collection: string;

  @Required()
  public result: MongoResult;

  public matchedCount: number;

  public modifiedCount: number;

  public upsertedCount: number;

  public upsertedId: { _id: ObjectID };

  constructor(collection: string, result: UpdateWriteOpResult) {
    this.collection = collection;
    this.result = result.result;
    this.matchedCount = result.matchedCount;
    this.modifiedCount = result.modifiedCount;
    this.upsertedCount = result.upsertedCount;
    this.upsertedId = result.upsertedId;
  }
}



@Action({ name: "abox.mongodb.delete.document" })
export class DeleteDocument {
  @Required()
  @String()
  public collection: string;

  @Required()
  public filter: any;
}



@Action({ name: "abox.mongodb.delete.document.result" })
export class DeleteDocumentResult {
  @Required()
  @String()
  public collection: string;

  @Required()
  public result: MongoResult;

  public deletedCount: number;

  constructor(collection: string, result: DeleteWriteOpResultObject) {
    this.collection = collection;
    this.result = result.result;
    this.deletedCount = result.deletedCount;
  }
}

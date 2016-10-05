import {Api} from "abox";
import {
  QueryDocument, QueryDocumentResult, InsertDocuments, InsertDocumentsResult, UpdateDocument,
  UpdateDocumentResult, DeleteDocument, DeleteDocumentResult
} from "./actions";
import {getCollection, findDocuments, insertDocuments, updateDocuments, deleteDocument} from "./functions";
import {Observable} from "rxjs";

export const module = new Api();

module
  .on(QueryDocument)
  .handle((context, data) => {
    return getCollection(data.collection)
      .flatMap(collection => {
        return findDocuments(collection, data.filter)
          .map(docs => {
            return new QueryDocumentResult(data.collection, docs)
          });
      });
  });

module
  .on(InsertDocuments)
  .handle((context, data) => {
    return getCollection(data.collection)
      .flatMap(collection => {
        return insertDocuments(collection, data.docs)
          .map(res => {
            return new InsertDocumentsResult(data.collection, res);
          });
      });
  });

module
  .on(UpdateDocument)
  .handle((context, data) => {
    return getCollection(data.collection)
      .flatMap(collection => {
        return updateDocuments(collection, data.filter, data.doc)
          .map(res => {
            return new UpdateDocumentResult(data.collection, res);
          });
      })
  });

module
  .on(DeleteDocument)
  .handle((context, data) => {
    return getCollection(data.collection)
      .flatMap(collection => {
        return deleteDocument(collection, data.filter)
          .map(res => {
            return new DeleteDocumentResult(data.collection, res)
          });
      })
  });

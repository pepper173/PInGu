/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3277267857")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.collectionName = \"lehrer\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3277267857")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.collectionName = \"lehrer\" && allelehrer ?= @request.auth.id"
  }, collection)

  return app.save(collection)
})

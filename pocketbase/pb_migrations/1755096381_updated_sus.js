/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564234370")

  // remove field
  collection.fields.removeById("relation1674853883")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3277267857",
    "hidden": false,
    "id": "relation64642113",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "klasse_",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564234370")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3596273526",
    "hidden": false,
    "id": "relation1674853883",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "klasse",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation64642113")

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564234370")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3564234370` ON `sus` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_3564234370` ON `sus` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_keLMYIVM5U` ON `sus` (`loginCode`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3827200358",
    "max": 0,
    "min": 0,
    "name": "loginCode",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564234370")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3564234370` ON `sus` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_3564234370` ON `sus` (`email`) WHERE `email` != ''"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("text3827200358")

  return app.save(collection)
})

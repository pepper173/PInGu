/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "name": "cubi_feedback",
    "type": "base",
    "fields": [
      {
        "hidden": false,
        "id": "text3208210256",
        "name": "id",
        "presentable": false,
        "required": true,
        "system": true,
        "type": "text",
        "primaryKey": true,
        "autogeneratePattern": "[a-z0-9]{15}",
        "min": 15,
        "max": 15,
        "pattern": "^[a-z0-9]+$"
      },
      {
        "hidden": false,
        "id": "text1780468801",
        "name": "studentId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "text",
        "max": 15,
        "min": 1,
        "pattern": "^[a-z0-9]+$"
      },
      {
        "hidden": false,
        "id": "text1780468802",
        "name": "levelId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "text",
        "max": 10,
        "min": 1,
        "pattern": "^[a-zA-Z0-9_\\-]+$"
      },
      {
        "hidden": false,
        "id": "select1780468803",
        "name": "rating",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": ["happy", "neutral", "sad"],
        "maxSelect": 1
      },
      {
        "hidden": false,
        "id": "bool1780468804",
        "name": "completed",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX idx_cubi_feedback_student_level ON cubi_feedback (studentId, levelId)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "system": false
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("cubi_feedback");
  return app.delete(collection);
})
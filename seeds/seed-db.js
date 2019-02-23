const db = require('../models');

const items = [
    {
        "id": 1,
        "productName": "3D Printer",
        "price": 8000,
        "stockQty": 42,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2019-02-23T00:27:55.000Z",
        "departmentId": 7
    },
    {
        "id": 2,
        "productName": "Programmable Disco Ball",
        "price": 99,
        "stockQty": 12,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2019-02-23T00:57:59.000Z",
        "departmentId": 7
    },
    {
        "id": 3,
        "productName": "Make Your Own Hawaiian Shirt Kit",
        "price": 95,
        "stockQty": 21,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 6
    },
    {
        "id": 4,
        "productName": "Gold and Silver polish by Mr. T",
        "price": 120,
        "stockQty": 5,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 6
    },
    {
        "id": 5,
        "productName": "A Complete Guide to the Fairly Oddparents Universe, vol III",
        "price": 5,
        "stockQty": 99,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 5
    },
    {
        "id": 6,
        "productName": "Jurassic Park",
        "price": 9,
        "stockQty": 300,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 5
    },
    {
        "id": 7,
        "productName": "Mr. Bucket",
        "price": 122,
        "stockQty": 66,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 4
    },
    {
        "id": 8,
        "productName": "Playstation 4",
        "price": 300,
        "stockQty": 8,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 4
    },
    {
        "id": 9,
        "productName": "Bacon Wrapped Filet Mignon",
        "price": 37,
        "stockQty": 33,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 3
    },
    {
        "id": 10,
        "productName": "Banana",
        "price": 1,
        "stockQty": 4222,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 3
    },
    {
        "id": 11,
        "productName": "Glass Slipper",
        "price": 120388,
        "stockQty": 1,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 2
    },
    {
        "id": 12,
        "productName": "Parka",
        "price": 322,
        "stockQty": 12,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 2
    },
    {
        "id": 13,
        "productName": "Colored Pencils",
        "price": 12,
        "stockQty": 200,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 1
    },
    {
        "id": 14,
        "productName": "3x10 Whiteboard",
        "price": 250,
        "stockQty": 110,
        "productSales": null,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z",
        "departmentId": 1
    }
];

const departments = [
    {
        "id": 1,
        "deptName": "OfficeSupplies",
        "overheadCost": 3200,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 2,
        "deptName": "Clothing",
        "overheadCost": 7040,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 3,
        "deptName": "Groceries",
        "overheadCost": 13000,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 4,
        "deptName": "Toys",
        "overheadCost": 8000,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 5,
        "deptName": "Books",
        "overheadCost": 435,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 6,
        "deptName": "Miscellaneous",
        "overheadCost": 903,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    },
    {
        "id": 7,
        "deptName": "Electronics",
        "overheadCost": 10000,
        "createdAt": "2000-01-01T12:00:00.000Z",
        "updatedAt": "2000-01-01T12:00:00.000Z"
    }
];

db.sequelize.sync({
    force: true
}).then(function(){
    db.department.bulkCreate(departments)
        .then(function(rows){
            console.log(`\n\nINSERTED into database\n\n`);
        }).catch(function(err){
            console.log("\n\nError:", err);
        });
    db.product.bulkCreate(items)
    .then(function(rows){
        console.log(`\n\nINSERTED into database\n\n`);
        db.sequelize.close();
    }).catch(function(err){
        console.log("\n\nError:", err);
    });
})
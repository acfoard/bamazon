module.exports = function(connection, dataType) {
    const product = connection.define('product', {
        productName: dataType.STRING,
        price: dataType.INTEGER,
        stockQty: dataType.INTEGER,
        productSales: dataType.INTEGER
    });

    product.associate = function(models) {
        product.belongsTo(models.department, {
        });
    };

    return product;
}
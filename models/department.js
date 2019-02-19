module.exports = function(connection, dataType) {
    const department = connection.define('department', {
        deptName: dataType.STRING,
        overheadCost: dataType.INTEGER
    });

    department.associate = function(models) {
        department.hasMany(models.product, {
            });
    };

    return department;
}
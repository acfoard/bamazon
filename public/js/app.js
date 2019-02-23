const populateProducts = function () {
    $('#itemList').empty();
    $.get('/api/product').then(
        function (products) {
            for (i = 0; i < products.length; i++) {
                item = $(`<tr>
                <td scope="col"><input type="number" id="${products[i].id}" min="0" style="width: 4em"></td>
                <td scope="col">${products[i].productName}</td>
                <td scope="col" id="qty${products[i].id}">${products[i].stockQty}</td>
                <td scope="col" id="price${products[i].id}">$${products[i].price}</td>
                <td scope="col"><button class="btn btn-info" id="${products[i].id}" qty=${products[i].stockQty}>Add to Cart</button></td></tr>     
            `);
                $('#itemList').append(item);
            }
        });
}

populateProducts();

let grandTotal = 0;

const calcTotal = function(num) {
    $('#grandTotal').empty();
    grandTotal += num;
    $('#grandTotal').append(`<h6>GRAND TOTAL: $${grandTotal}</h6>`);
};

const validate = function (num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    let valid = true;
    if (num1 > num2) {
        valid = false;
    };
    return valid;
}

const addOrUpdate = function (object) {
    return $.get('/api/tempOrder').then(function (response) {
        index = response.map(function (e) { return e.id; }).indexOf(object.id);
        return index
    })
};

const addToCart = function () {
    const i = $(this).attr('id');
    const numToBuy = $(`#${i}`).val();
    const qty = $(this).attr('qty');
    if (validate(numToBuy, qty)) {
        $.get(`/api/product/${i}`).then(function (item) {
            const total = numToBuy * item.price
            calcTotal(total);
            $('#alerts').append(`
            <div class="alert alert-success fade show" id="alert${i}">
            ${numToBuy} ${item.productName}(s) added to cart!
            </div>`);
            setTimeout(function () { $(`#alert${i}`).alert('close'); }, 2000);
            cartItem = $(`<tr>
            <td scope="col">${item.productName}</td>
            <td scope="col">${numToBuy}</td>
            <td scope="col">x</td>
            <td scope="col">$${item.price}</td>
            <td scope="col">$${total}</td></tr>        
            `);
            $('#cartList').append(cartItem);
            $(`#${i}`).val('');
            const orderPart = {
                id: i,
                qty: numToBuy
            };
            addOrUpdate(orderPart).then(function (ordIndex) {
                if (ordIndex === -1) {
                    $.post('/api/tempOrder', orderPart).then(function () {
                    });
                } else {
                    orderPart.index = ordIndex;
                    console.log(orderPart);
                    $.ajax({
                        url:'/api/tempOrder',
                        method: 'PUT',
                        data: orderPart
                    }).then(function(response) {
                    });
                }
            });
        });
    } else {
        $('#alerts').append(`
        <div class="alert alert-warning fade show" id="alert${i}">
        Insufficient Quantity. Please order ${qty} or less of the item.
        </div>`);
        setTimeout(function () { $(`#alert${i}`).alert('close'); }, 2000);
    };
};

const purchase = function() {
    $.get('/api/tempOrder').then(function(order) {
        $.get('/api/product').then(function(inventory){
            let valid = true;
            const qtyLeft = [];
            for (i=0; i<order.length; i++) {
                ordId = parseInt(order[i].id);
                const index = inventory.map(function(e) { return e.id; }).indexOf(ordId);
                const qty = inventory[index].stockQty - order[i].qty;
                const update = {
                    id: ordId,
                    stockQty: qty
                }
                qtyLeft.push(update);
                if (order[i].qty > inventory[index].stockQty) {
                    valid = false;
                }
            };
            console.log(qtyLeft);
            if (valid) {
                for (j=0; j<qtyLeft.length; j++){
                    const prodId = parseInt(qtyLeft[j].id);
                    console.log(qtyLeft[j]);
                    $.ajax({
                        url: `/api/product/${prodId}`,
                        method: 'PUT',
                        data: qtyLeft[j]
                    }).then(function(response){
                        populateProducts();
                        console.log(response);
                    });
                }; 
                $('#finalTitle').prepend(`<h5 class="modal-title" >Purchase Complete</h5>`);
                $('#finalBody').append(`<p>Thank you for your purchase!.</p>`)
            } else {
                $('#finalTitle').prepend(`<h5 class="modal-title" >Purchase Cancelled</h5>`);
                $('#finalBody').append(`<p>The quantity selected is unavailable at this time. Please check back later.</p>`)
            }
        });
    });
};

const dataEmpty = function () {
    $('#finalTitle').empty();
    $('#finalBody').empty();
    $('#cartList').empty();
    $('#grandTotal').empty();
    $.ajax({
        url: '/api/tempOrder',
        method: 'DELETE'
    });
};

$('#itemList').on('click', '.btn', addToCart);
$('#purchase').on('click', purchase);
$('#OK').on('click', dataEmpty);
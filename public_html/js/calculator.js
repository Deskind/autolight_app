var devliveryDocumentsPrice =[
                        /*1*/{local: 4.00, global: 5.00, weightLow: 0, weightHigh: 1},
                        /*2*/{local: 4.50, global: 6.00, weightLow: 1, weightHigh: 2}
                    ];
                    
var weightRange = function (weight, prices){
    for(i=0; i < prices.length; i++){
        if(weight >= prices[i].weightLow && weight <=prices[i].weightHigh) return  prices[i];
    }
};

var submitDocumentsForm = function (deliveryDocumentPrice){
    /**Get values of fields*/
    var cityFrom = $('#cityFromInput').val();
    var cityTo = $('#cityToInput').val();
    var docsWeight = $('#documentParcelWeigth').val();
    /**Chek on empty input and check weight*/
    if(cityFrom === '' || cityTo === '' || docsWeight === ''){
        alert('Неоходимо заполнить все поля.');
    }else if(docsWeight === '0'){
        alert('Укажите правильно вес.');
    }else{
        /**Calculate cost*/
        var price;
        if(cityFrom===cityTo){
            price = weightRange(docsWeight, devliveryDocumentsPrice);
            $('#resultCost').text("Стоимость доставки:  " +price.local+" р.");
        }else{
            price = weightRange(docsWeight, devliveryDocumentsPrice);
            $('#resultCost').text("Стоимость доставки:  " +price.global+" р.");
        }
    }
    
    
};
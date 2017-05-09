var devliveryDocumentsPrice =[
                        /*1*/{local: "4.00", global: "5.00", weightLow: 0, weightHigh: 1},
                        /*2*/{local: '4.50', global: '6.00', weightLow: 1, weightHigh: 2}
                    ];
                    
var deliveryCargoPrice = [
                        /*1*/{local: '6.00', global: '8.00', weightLow: 0, weightHigh: 1},
                        /*2*/{local: '7.00', global: '9.00', weightLow: 1, weightHigh: 2},
                        /*3*/{local: '7.50', global: '10.00', weightLow: 2, weightHigh: 3},
                        /*4*/{local: '8.00', global: '12.00', weightLow: 3, weightHigh: 5},
                        /*5*/{local: '8.50', global: '14.00', weightLow: 5, weightHigh: 10},
                        /*6*/{local: '9.00', global: '16.00', weightLow: 10, weightHigh: 15},
                        /*7*/{local: '10.00', global: '18.00', weightLow: 15, weightHigh: 20},
                        /*8*/{local: '11.50', global: '20.00', weightLow: 20, weightHigh: 25},
                        /*9*/{local: '12.50', global: '22.00', weightLow: 25, weightHigh: 30}
                    ];                     
                    
var weightRange = function (weight, prices){
    for(i=0; i < prices.length; i++){
        if(weight >= prices[i].weightLow && weight <=prices[i].weightHigh) return  prices[i];
    }
};

var submitDocumentsForm = function (prices){
    var isInList;
    /**Get list of cities from angular*/
    var cities = angular.element(document.getElementById('body')).scope().cities;
    /**Get values of fields*/
    var cityFrom = $('#cityFromInput').val();
    var cityTo = $('#cityToInput').val();
    var docsWeight = $('#documentParcelWeigth').val();
    /**Check if city from and city to is in list*/
    if(cities.indexOf(cityFrom)>=0 && cities.indexOf(cityTo)>=0){
        isInList = true;
    }else{
        isInList = false;
    }
    /**Chek on empty input and check weight*/
    if(cityFrom === '' || cityTo === '' || docsWeight === ''){
        alert('Необходимо заполнить все поля.');
    }else if(docsWeight === '0'){
        alert('Укажите правильно вес.');
    }else{
        /**Calculate cost*/
        var price;
        if(cityFrom===cityTo && isInList){
            price = weightRange(docsWeight, prices);
            $('#resultCostForDocuments').text("Стоимость доставки:  " +price.local+" р.");
        }else if(cityFrom !== cityTo && isInList){
            price = weightRange(docsWeight, prices);
            $('#resultCostForDocuments').text("Стоимость доставки:  " +price.global+" р.");
        }else if(cityFrom===cityTo && !isInList){
            price = weightRange(docsWeight, prices);
            $('#resultCostForDocuments').text("Стоимость доставки:  " +(price.local+8.40)+" р.");
        }else if(cityFrom !== cityTo && !isInList){
            price = weightRange(docsWeight, prices);
            $('#resultCostForDocuments').text("Стоимость доставки:  " +(price.global+8.40)+" р.");
        }
    }   
};

var submitCargoForm = function (prices){
    var isInList;
    /**Get list of cities from angular*/
    var cities = angular.element(document.getElementById('body')).scope().cities;
    /**Get values of fields*/
    var cityFrom = $('#cityFromInput').val();
    var cityTo = $('#cityToInput').val();
    var cargoWeight = $('#cargoParcelWeight').val();
    var cargoHeight = $('#parcelHeight').val();
    var cargoWidth = $('#parcelWidth').val();
    var cargoDepth = $('#parcelDepth').val();
    /**Conver strings to numbers for calculation*/
    var weight = parseFloat(cargoWeight);
    var height = parseInt(cargoHeight);
    var width = parseInt(cargoWidth);
    var depth = parseInt(cargoDepth);
    /**Calculate cargoGirth*/
    var cargoGirth = height*2+width*2+depth;
    /**Check if city from and city to is in list*/
    if(cities.indexOf(cityFrom)>=0 && cities.indexOf(cityTo)>=0){
        isInList = true;
    }else{
        isInList = false;
    }
    /**Chek on empty input and check weight*/
    if(cityFrom === '' || cityTo === '' || cargoWeight === '' || cargoHeight === '' || cargoWidth === '' || cargoDepth===''){
        alert('Необходимо заполнить все поля.');
    }else if(cargoWeight === '0'){
        alert('Укажите правильно вес.');
    }else if(cargoGirth > 270){
        alert('Обхват почтового отправления не должен превышать 270см');
    }else{
        /**Calculate cost*/
        var price;
        if(cityFrom===cityTo && isInList){
            price = weightRange(weight, prices);
            $('#resultCostForCargo').text("Стоимость доставки:  " +price.local+" р.");
        }else if(cityFrom !== cityTo && isInList){
            price = weightRange(weight, prices);
            $('#resultCostForCargo').text("Стоимость доставки:  " +price.global+" р.");
        }else if(cityFrom===cityTo && !isInList){
            price = weightRange(weight, prices);
            $('#resultCostForCargo').text("Стоимость доставки:  " +(price.local+8.40)+" р.");
        }else if(cityFrom !== cityTo && !isInList){
            price = weightRange(weight, prices);
            $('#resultCostForCargo').text("Стоимость доставки:  " +(price.global+8.40)+" р.");
        }
    }
};


module.exports = (product, template) => {
    let updatedTamplate = template.replace(/{%PRODUCT_NAME%}/g, product.productName)
                                    .replace(/{%QUANTITY%}/g, product.quantity)
                                    .replace(/{%ID%}/g, product.id)
                                    .replace(/{%IMAGE%}/g, product.image)
                                    .replace(/{%PRICE%}/g, product.price)
                                    .replace(/{%DESCRIPTION%}/g, product.description)
                                    .replace(/{%FROM%}/g, product.from)
                                    .replace(/{%NUTRIENTS%}/g, product.nutrients);
    if(!product.organic){
        updatedTamplate = updatedTamplate.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    else{
        updatedTamplate = updatedTamplate.replace(/{%NOT_ORGANIC%}/g, ''); 
    }

    return updatedTamplate;
};
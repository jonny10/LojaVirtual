console.log("minha script está funcionando");


checkform = {
    productName: false,
    productPrice: false,
    productDescription: false,
    productURL: false
}

console.log(checkform)


document.getElementById('nameProduct').addEventListener('input', function (e) {
    const productName = e.target.value
    if(productName.length>50){
        document.getElementById('productName-error').style.display = "block"
        checkform.productName = false;
    }else{
        document.getElementById('productName-error').style.display = "none"
        checkform.productName = true;
    }
    enableButton();
});

document.getElementById('productPrice').addEventListener('input', function (e) {
    const productPrice = e.target.value
    if(isNaN(productPrice)){
        document.getElementById('productPrice-error').style.display = "block"
        checkform.productPrice = false;
    }else{
        document.getElementById('productPrice-error').style.display = "none"
        checkform.productPrice = true;
    }
    enableButton();
});

document.getElementById('productDescription').addEventListener('input', function (e) {
    const productDescription = e.target.value
    if(productDescription.length>200 || productDescription.length<5){
        document.getElementById('productDescription-error').style.display = "block"
        checkform.productDescription = false;
    }else{
        document.getElementById('productDescription-error').style.display = "none"
        checkform.productDescription = true;
    }
    enableButton();
});

document.getElementById('productURL').addEventListener('input', function (e) {
    const productURL = e.target.value
    if(validURL(productURL)) {
        document.getElementById('productURL-error').style.display = "block"
        checkform.productURL = false;
    }else{
        document.getElementById('productURL-error').style.display = "none"
        checkform.productURL = true;
    }
    enableButton();
});

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !pattern.test(str);
  }

function enableButton(){
    const button = document.getElementById('ButtonCadastrar');
    if(checkform.productName && checkform.productDescription && checkform.productPrice && checkform.productURL){
        button.disabled = false;
    }else{
        button.disabled = true;
    }
}

const showProducts = (products) => {
    console.log('Cheguei no show products');
    //console.log(products);
    //console.log(products.length);

    for (let i=0; i < products.length; i++){
        console.log(products[i].name);

        let tagDivCard = document.createElement('div');
        tagDivCard.setAttribute('class', 'card mb-2');
        tagDivCard.setAttribute('style', 'width: 300px');


        let tagImage = document.createElement('img');
        tagImage.setAttribute('class', 'card-img-top');
        tagImage.setAttribute('src', products[i].urlProductImage);
        tagImage.setAttribute('alt', products[i].name);

        tagDivCard.appendChild(tagImage);

        let tagDivCardBody = document.createElement('div');
        tagDivCardBody.setAttribute('class', 'card-body');
        tagDivCard.appendChild(tagDivCardBody);


        let tagH5 = document.createElement('h5');
        tagH5.setAttribute('class','text-center');
        let textnode = document.createTextNode(products[i].name);
        tagH5.appendChild(textnode);
        tagDivCardBody.appendChild(tagH5);



        let tagP = document.createElement('p');
        tagP.setAttribute('class','card-text text-center');
        textnode = document.createTextNode(products[i].description);
        tagP.appendChild(textnode);
        tagDivCardBody.appendChild(tagP);


        tagP = document.createElement('p');
        tagP.setAttribute('class', 'text-center price');
        textnode = document.createTextNode(products[i].price);
        tagP.appendChild(textnode);
        tagDivCardBody.appendChild(tagP);


        let tagA = document.createElement('a');
        tagA.setAttribute('href', '#');
        tagA.setAttribute('class', 'btn btn-primary mx-auto');
        tagA.setAttribute('style', 'width: 100%');
        textnode = document.createTextNode('Adicionar ao carrinho');
        tagA.appendChild(textnode);
        tagDivCard.appendChild(tagA);

        let tagDivFemProducts = document.getElementById('femininoProducts');
        let tagDivColarProducts = document.getElementById('colarProducts');

        if(products[i].category == 1){
            tagDivFemProducts.appendChild(tagDivCard);
        }else if(products[i].category == 2){
            tagDivColarProducts.appendChild(tagDivCard);

        }
    }
}

const fetchProducts = () => {
    console.log('cheguei na script para carregar os produtos');
    fetch('http://localhost:8000/GetProducts.php')
        .then((response) => {
            if (response.status >= 200 && response.status<300){
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then((products) => {
            showProducts(products);
        })
        .catch((error) => {
            console.log(error);
        })
}
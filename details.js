$(function() {
    let url_string = location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    if(id){
        $.ajax({
            url: `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                console.log(res);
                if(res){
                    let resData = res;
                    let mainImage = document.getElementById("main-image");
                    mainImage.src = res.preview;
                    let productDetailWrapper = document.getElementById("product-detail-wrapper");
                
                    let getImageHTML = '';
                    for (let i = 0; i < res.photos.length; i++) {
                        let className = i == 0 ? 'active' : '';
                        getImageHTML += `<img class="thumbail ${className}" id="img-${res.id+i}" src="${res.photos[i]}" alt="Image Preview - ${i}">`;
                    }
                    let createProductHTML = `<h1 id="name">${res.name}</h1>
                                            <h4 id="brand">${res.brand}</h4>
                                            <h3>Price: Rs <span id="price">${res.price}</span></h3>
                                            <h3 id="descriptionHeading">Description</h3>
                                            <p>${res.description}</p>
                                            <h3>Product Preview</h3>
                                            <div class="previewImage">${getImageHTML}</div>
                                            <div ><button id="addToCart">Add to Cart</button></div>`;
                
                    productDetailWrapper.insertAdjacentHTML('beforeEnd', createProductHTML);
                
                    let getAllImageTag = document.querySelectorAll('.previewImage img');
                
                    for(let i=0; i<getAllImageTag.length; i++){
                        getAllImageTag[i].addEventListener('click', function(e){
                            let getActiveElem = document.querySelector('.previewImage .active');
                            getActiveElem.classList.remove('active');
                            mainImage.src = this.src;
                            this.classList.add('active');
                        });
                    }
                    $("#addToCart").click(function(){
                        let alreadyAddedInCard = false;
                        let getAllAddToCartItem = localStorage.getItem('addToCart')?JSON.parse(localStorage.getItem('addToCart')):[];
                        for(let i=0;i<getAllAddToCartItem.length;i++){
                            if(getAllAddToCartItem[i].id === resData.id){
                                alreadyAddedInCard = true;
                                getAllAddToCartItem[i].total++;
                            }
                        }
                        if(!alreadyAddedInCard){
                            getAllAddToCartItem.push({id:resData.id, name:resData.name, price:resData.price, total:1, img:resData.preview});
                        }
                        localStorage.setItem('addToCart', JSON.stringify(getAllAddToCartItem));
                        addToCardCount();
                    });
                }
                
            },
            error: function(err){
                console.log("Error", err);
            }
        });
    }
  

    // Add to cart count
    function addToCardCount(){
        let total = 0;
        let addToCartItemCount = localStorage.getItem('addToCart')?JSON.parse(localStorage.getItem('addToCart')):[];
        for (let i = 0; i < addToCartItemCount.length;i++){
            total += addToCartItemCount[i].total;
        }
        $("#addCartCount").text(total);
    }
    addToCardCount();
})
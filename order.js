$(function() {
    localStorage.setItem('addToCart', JSON.stringify([]));
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
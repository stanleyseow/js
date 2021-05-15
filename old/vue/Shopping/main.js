var app = new Vue({
    el: '#app',
    data: {
        product: 'Banana',
        image: 'bomb.png',
        inStock: true,
        inventory: 8,
        onSale: false,
        url: 'http://google.com',
        variants: [{
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'star.png'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'bomb.png'
            }
        ],
        cart: 0,
        details: ["80% cotton", "20% poly", "gender-neutral"],
        sizes: ["small", "medium", "large", "x-large"]
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    },

})
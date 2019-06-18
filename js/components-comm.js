window.Event = new Vue();

window.Event = new class {
    constructor(){
        this.vuw = new Vue(); 
    }
}

Vue.component('coupon', {
    template: '<input placeholder="Enter your coupon" @blur="onCouponApplied"/>',

    methods: {
        onCouponApplied(){
            Event.$emit('applied');
        }
    },
})

Vue.component('alert', {
    template: '<button @click="onCouponApplied">Click me</button>',

    methods: {
        onCouponApplied(){
            Event.$emit('applied');
        }
    },
})

new Vue({
    el: '#root',

    data: {
        couponApplied: false,
    },

    created() {
        Event.$on('applied', () => alert('Handling it'));
    },
});

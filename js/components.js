Vue.component('task-list', {
    template: `
    <ul>
        <task v-for="task in tasks">{{ task.description }}</task>
    </ul>`,

    data() {
        return {
            tasks: [
                { description: 'Finsh Vue Casts', completed: false},
                { description: 'Clear Pimples', completed: false },
                { description: 'Build Agency Website', completed: false },
                { description: 'Build eMaginations Website', completed: true },
                { description: 'Complete afromums Website', completed: false },
            ]
        }
    },
})


Vue.component('task', {

    template: '<li><slot></slot></li>',

})


Vue.component('message', {
    
    props: ['title', 'body'],

    data(){
        return{
            isVisible: true,
        }
    },

    template: `
    <article class="message" v-show="isVisible">
        <div class="message-header">
            {{title}}
    
            <button class="delete" @click="isVisible = false" aria-label="delete"></button>
    
        </div>

        <div class="message-body">
            {{body}}
        </div>
    </article>
    `,
})


Vue.component('test-modal', {

    data() {
        return {
            modalVisible: true,
        }
    },

    template: `
    <div class="modal" v-show="modalVisible">
        <div class="modal-background"></div>
        <div class="modal-content">
            <message title="My Vue Modal" body="The bluetooth device is ready to pair"></message>            
        </div>
        <button class="modal-close is-large" @click="modalVisible = false" aria-label="close"></button>
    </div>
    `
})

Vue.component('modal', {
    template: `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
    </div>
    `,

    /**
     * 1. We are creating a custom event (close) above (using `emit` keyword) to close the modal
     * The root instance will close the modal once it receives the close event listener
     * 
     * 2. Slots are used to represent content on the HTML side
     */
})

Vue.component('tabs', {
    template: `
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{'is-active' : tab.isActive}">
                    <a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a>
                </li>
            </ul>
        </div>

        <div class="tab-details">
            <slot></slot>
        </div>
    </div>`,

    data() {
        return {
            tabs: []            
        }
    },

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    },
})

Vue.component('tab', {
    props: {
        name: {required : true},
        selected: {default: false}
    },
 
    template: `<div v-show="isActive"><slot></slot></div>`,

    data() {
        return{
            isActive: false
        }
    },

    computed: {
        href(){
            return "#" + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected;
    },
})

new Vue({
    el: '#root',

    data: {
        showModal: false
    }
});
import router from "./router";
import store from './store';

router.beforeEach(async(to, from, next) => {
    if(to.path !== '/login' && store.state.user_name === '') {
        router.push({
            name: 'Login'
        });
    }
    else {
        next()
    }
    
})
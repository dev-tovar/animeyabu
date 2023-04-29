import axios from 'axios'
import { sha256, sha224 } from 'js-sha256';

export default {
   
    data() {
        return {
            timezoneApi: null,
            signatureApi: null,
        }
    },
    watch: {
    },
    created() {
       
    },
    methods: {
        isRequired(value) {
            return value ? true : 'Este campo es requerido';
        },
        isEmail(value) {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : 'Email Inválido';
        },
        getTimezone() {
            axios.get(process.env.VUE_APP_URLTIMEZONE)
                .then(res => {
                    this.timezoneApi = res.data.timezone;
                    this.signatureApi = sha256(process.env.VUE_APP_PRIVATE_KEY + "," + process.env.VUE_APP_PUBLIC_KEY + "," + this.timezoneApi);

                })
                .catch(err => {
                    console.error(err);
                })
        },
        logOut(){
            localStorage.removeItem('tokeOpperweb');
            localStorage.removeItem('infoUser');

            location.href = '/';
        }
    },
}

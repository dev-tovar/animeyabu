
<template>
    <div class=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:col-start-1 md:col-auto">
        <div class="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            <img width="145" class="w-auto" src="@/assets/images/icon-register.png" alt="Your Company" />
            <div class="self-center ">
                <h2 class="text-center text-3xl font-bold leading-9 tracking-tight text-white">ようこそ!</h2>
                <p class="text-center italic tracking-tight text-white">Bienvenidos(a)!</p>
            </div>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form @submit.prevent @keydown.enter="$event.preventDefault()" ref="formRegister" class="space-y-6" v-slot="{ errors }">
                <div class="flex items-center gap-x-3">
                    <label for="push-everything" class="block text-sm font-medium leading-6 text-white">Tipo persona</label>
                    &nbsp;
                    <input v-model="formAccount.type_user_id" value="2" id="p-natural" name="push-notifications"
                        type="radio" class="h-4 w-4 bg-gray-400 border-white text-gray-600 focus:ring-gray-600">
                    <label for="p-natural" class="block text-sm font-medium leading-6 text-white">Natural</label>

                    <input v-model="formAccount.type_user_id" value="1" id="p-juridica" name="push-notifications"
                        type="radio" class="h-4 w-4 bg-gray-400 border-white text-gray-600 focus:ring-gray-600">
                    <label for="p-juridica" class="block text-sm font-medium leading-6 text-white">Juridica</label>
                </div>
                <div v-if="formAccount.type_user_id == '2'">
                    <label for="nombre" class="block text-sm text-white ">Nombre</label>
                    <div class="mt-2">
                        <Field :class="errors.nombre ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.name" id="nombre" name="nombre" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.nombre }}</span>
                    </div>
                </div>
                <div v-if="formAccount.type_user_id == '2'">
                    <label for="apellido" class="block text-sm text-white ">Apellido</label>
                    <div class="mt-2">
                        <Field :class="errors.apellido ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.lastname" id="apellido" name="apellido" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.apellido }}</span>
                    </div>
                </div>

                <div v-if="formAccount.type_user_id == '1'">
                    <label for="razonsocial" class="block text-sm text-white "> Razón social </label>
                    <div class="mt-2">
                        <Field :class="errors.razonsocial ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.razon_social" id="razonsocial" name="razonsocial" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.razonsocial }}</span>
                    </div>
                </div>
                <div v-if="formAccount.type_user_id == '1'">
                    <label for="nit" class="block text-sm text-white ">NIT</label>
                    <div class="mt-2">
                        <Field :class="errors.nit ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.NIT" id="nit" name="nit" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.nit }}</span>
                    </div>
                </div>

                <div>
                    <label for="telefono" class="block text-sm text-white ">Teléfono</label>
                    <div class="mt-2">
                        <Field :class="errors.telefono ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.telephone" id="telefono" name="telefono" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.telefono }}</span>
                    </div>
                </div>
                <div>
                    <label for="num-id" class="block text-sm text-white ">Número de identificación</label>
                    <div class="mt-2">
                        <Field :class="errors.numid ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.identy_document" id="numid" name="numid" type="text" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.numid }}</span>
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm text-white ">Email</label>
                    <div class="mt-2">
                        <Field :class="errors.email ? 'border-2 border-red-500' : ''" :rules="isEmail"
                            v-model="formAccount.email" id="email" name="email" type="email" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.email }}</span>
                    </div>

                </div>



                <div>
                    <label for="password" class="block text-sm text-white">Contraseña</label>
                    <div class="mt-2">
                        <Field :class="errors.password ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.password" id="password" name="password" type="password"
                            autocomplete="current-password" required=""
                            class="block bg-gray-500 w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.password }}</span>
                    </div>
                </div>

                <div>
                    <label for="password-confirm" class="block text-sm text-white">Confirmar contraseña</label>
                    <div class="mt-2">
                        <Field :class="errors.passwordconfirm ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formAccount.password_confirmation" id="passwordconfirm" name="passwordconfirm"
                            type="password" autocomplete="current-password" required=""
                            class="block bg-gray-500 w-full font-semibold rounded-md border-0 py-4 text-white " />
                        <span class="text-red-500 float-right">{{ errors.passwordconfirm }}</span>
                    </div>
                </div>

                <div class="pt-8">
                    <button type="button" @click="saveDataUser" class="button-anime-fuchsia">
                        Registrar
                    </button>
                </div>

                <div class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 sm:col-start-1 md:col-auto">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <p class="text-center tracking-tight text-white">Regístrate también con</p>
                    </div>


                </div>
                <figcaption>

                    <div class="mt-4 flex items-center justify-center space-x-3 text-base">

                        <div class="text-gray-600"><img src="@/assets/images/social1.png" alt="" srcset=""></div>
                        <div class="text-gray-600"><img src="@/assets/images/social2.png" alt="" srcset=""></div>
                        <div class="text-gray-600"><img src="@/assets/images/social3.png" alt="" srcset=""></div>
                    </div>
                </figcaption>


            </Form>

            <p class="mt-10 text-center  text-white">
                Ya estás registrado?
                <router-link to="/login"
                    class="font-semibold leading-6 text-fuchsia-500 hover:text-fuchsia-400">Acceder</router-link>

            </p>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
import functionsCustom from '@/mix/function'
import { Field, Form } from 'vee-validate';


export default {
    name: 'Register',
    mixins: [functionsCustom],
    components: {
        Field, Form
    },
    data() {
        return {
            formAccount: {
                type_user_id: '2',
                name: null,
                lastname: null,
                razon_social: null,
                NIT: null,
                telephone: null,
                identy_document: null,
                verify_tc: "1",
                email: null,
                password: null,
                password_confirmation: null,
                apiKey: process.env.VUE_APP_PUBLIC_KEY,
                signature: null,
                utcTimeStamp: null,
            }

        }
    },
    watch: {
    },
    created() {
        this.getTimezone();
    },
    methods: {


        saveDataUser() {
            this.$refs.formRegister.validate().then(validate => {
                if (validate.valid) {
                    this.formAccount.signature = this.signatureApi;
                    this.formAccount.utcTimeStamp = this.timezoneApi;
                    axios.post(process.env.VUE_APP_REGISTERPJUR, this.formAccount)
                        .then(res => {
                            if (res.data.token) {
                                this.$swal.fire(
                                    '¡Buen trabajo!',
                                    'La información ha sido almacenada correctamente.',
                                    'success'
                                ).then(function () {
                                    window.location = "/login";
                                });
                            }
                        })
                        .catch(err => {
                            if (err.response.status == 422) {

                                var errores = '';

                                if (err.response.data.errors) {
                                    let erroresForm = err.response.data.errors;

                                    let claves = Object.keys(erroresForm); // claves = ["nombre", "color", "macho", "edad"]
                                    for (let i = 0; i < claves.length; i++) {
                                        let clave = claves[i];

                                        if (Array.isArray(erroresForm[clave])) {
                                            erroresForm[clave].forEach(element => {

                                                errores = errores.concat("<li>" + element + "</li>");
                                            });
                                        }
                                    }
                                }

                                this.$swal.fire({
                                    title: '<strong>¡Ups!</strong>',
                                    html: 'No se ha podido procesar la solicitud. <ul class="errores-form"> ' + errores + ' </ul>',
                                    icon: 'warning'
                                })

                            } else {
                                this.$swal.fire(
                                    '¡Ups!',
                                    'Algo ha salido mal, vuelve a intentarlo más tarde.',
                                    'error'
                                )
                            }

                        })
                }
            })

        }

    },
}
</script>
<style>
ul.errores-form {
    padding: revert;
    margin: revert;
    list-style: disc;
    text-align: left;
}
</style>




       




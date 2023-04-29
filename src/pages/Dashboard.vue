<template>
    <div class="relative min-h-screen md:flex" data-dev-hint="container">




        <aside id="sidebar"
            class="bg-fuchsia-950 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
            data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">
            <div class="flex flex-col space-y-6" data-dev-hint="optional div for having an extra footer navigation">
                <a href="/dashboard" class="text-white flex items-center justify-center space-x-2 px-4">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 mr-4">
                                <img class="h-8 w-8" src="@/assets/images/icon-header.png" alt="Your Company" />
                            </div>
                            <div class="flex-shrink-0 ">
                                <h1 class="text-2xl font-bold text-white">anime<span class="text-fuchsia-500">yabu</span>
                                </h1>

                            </div>
                        </div>
                    </div>
                </a>

                <nav data-dev-hint="main navigation">

                    <div class="">
                        <ul class="px-6">
                            <li class=""><span class="font-bold"> Categorías </span>
                                <ul class="menu-dashboard">
                                    <li class=""> <router-link to="/dashboard/categorias">Ver todas</router-link> </li>
                                    <li class=""><router-link to="/dashboard/categorianueva">Crear</router-link></li>
                                </ul>
                            </li>

                        </ul>
                        <ul class="px-6 mt-10">
                            <li class=""> <a @click="logOut" href="#"> <span class="font-bold"> Cerrar sesión </span> </a> 

                            </li>

                        </ul>
                    </div>



                </nav>
            </div>


        </aside>

        <main id="content" class="flex-1 p-6 lg:px-8 bg-black">

            <router-view :key="$route.path" />

        </main>
    </div>
</template>

<script>
import functionsCustom from '@/mix/function'

export default {

        mixins: [functionsCustom],

    name: 'dashboardComponent',
    components: {
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        

    },
    watch: {
    },
}
</script>

<style>
.menu-dashboard {
    list-style: disc !important;
    margin: inherit !important;
    padding: revert !important;

}

.menu-dashboard li {
    padding-top: 5px;
    padding-bottom: 5px;

}

a.active-menu {
    text-decoration: underline;
}
</style>

<template>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 h-full flex">
        <header class="absolute inset-x-0 top-0 z-50 hidden md:flex">
            <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 mr-4">
                            <img class="h-8 w-8" src="@/assets/images/icon-header.png" alt="Your Company" />
                        </div>
                        <div class="flex-shrink-0 ">
                            <h1 class="text-2xl font-bold text-white">anime<span class="text-fuchsia-500">yabu</span></h1>

                        </div>
                    </div>
                </div>





            </nav>
        </header>

        <!-- CONTENIDO -->


        <div class=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:col-start-1 md:col-auto   bg-gradient-to-b  from-fuchsia-700  sm:from-fuchsia-700 md:from-black  sm:to-black md:to-black to-black  ">

            <main class="h-full mt-10">

                <router-view :key="$route.path" />
            </main>

        </div>

        <!-- CONTENIDO -->


        <!-- ... -->
        <div class="carouselpage bg-fuchsia-950 flex flex-col justify-center hidden md:flex ">
            <div>
                <Carousel v-model="sliderLogin" class="m-auto" :autoplay="5000" :wrap-around="true">
                    <Slide v-for="(slide, index) in imgSlider" :key="index">
                        <div class="carousel__item">
                            <img :src="slide.src">
                            <div class="inline-flex	 pb-6">
                                <h1 class="text-6xl font-bold text-white"> {{ slide.title1 }} </h1>
                                <h1 class="text-6xl font-bold text-fuchsia-500" :class="animateClassTitle2"> <span
                                        class="text-fuchsia-500 ">{{
                                            slide.title2 }}</span></h1>
                            </div>

                            <br>
                        </div>

                    </Slide>



                    <template #addons>
                        <p class=" text-white leading-5	">Ver anime en línea en HD, subtitulado o doblado, <br> en tu
                            celular o computadora. <br> ¡Animeyabu, tu portal de anime en línea!</p>

                        <Pagination />
                    </template>
                </Carousel>
            </div>


        </div>
    </div>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: 'App',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            sliderLogin: 0,
            animateClassTitle2: 'animate__animated animate__fadeInRightBig',
            imgSlider: [
                { src: require('@/assets/images/imagen1_1.png'), title1: 'anime', title2: 'yabu.' },
                { src: require('@/assets/images/imagen2_2.png'), title1: 'anime', title2: 'Kyojuro.' },
                { src: require('@/assets/images/imagen3_3.png'), title1: 'anime', title2: 'Inosuke.' },
            ]
        }
    },
    watch: {
        sliderLogin: {
            immediate: true,
            handler(value) {
                // this.animateClassTitle2 = 'animate__animated animate__fadeOutRight';
                setTimeout(() => {
                    this.animateClassTitle2 = 'animate__animated animate__fadeInRightBig';
                }, 500);
                setTimeout(() => {
                    this.animateClassTitle2 = 'animate__animated animate__fadeOutRight';
                }, 4500);
            }
        }

    },
}
</script>
<style>
.carousel__pagination-button::after {
    background-color: #9b9b9b !important;
    width: 20px;
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
    background-color: #FFFFFF !important;

}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.carouselpage{
    position: fixed;
    right: 0px;
    width: 50%;
    height: 100%;
}

</style>



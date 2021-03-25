<template>
  <div>
    <div v-for="rowData in rowsData" :key="rowData.num" :class="rowData.className" class="swiper-container mx-auto">
      <div class="swiper-wrapper">
        <div v-for="col in rowData.cols" :key="col.num" class="swiper-slide my-auto">
          <div class="card h-100">
            {{col.name}}
            <b-progress :max="col.total">
              <b-progress-bar :value="col.completed">
                <span><strong>{{ col.completed }}/{{ col.total }}</strong></span>
              </b-progress-bar>
            </b-progress>
          </div>
        </div>
      </div>
      <!-- <div :class="rowData.prevButtonClassName" class="swiper-button-prev"></div>
      <div :class="rowData.nextButtonClassName" class="swiper-button-next"></div> -->
      <div :class="rowData.paginationClassName" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/config/api';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

export default {
  name: 'CategoryCarousel',
  props: {
    slidesPerView: {
      type: Number
    },
    columns: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data: function() {
    return {
      categories: null,
      rowsData: [],
      swipers: [],
      bruh: ''
    };
  },
  async created() {
    try {
      // Get all of the category data
      const allModules = (await api.get('/module/all')).data;
      const completedModules = await Promise.all(
        this.user.modulesCompleted
          .map(mod => {
            return api.get(`/module/${mod._id}`);
          })
      );
      this.categories = (await api.get('/category/all'))
        .data
        .map(cat => {
          return {
            name: cat.name,
            total: allModules.reduce((accumulator, mod) => {
              return accumulator + (mod.categories.includes(cat._id) ? 1 : 0);
            }, 0),
            completed: completedModules.reduce((accumulator, mod) => {
              return accumulator + (mod.categories.includes(cat._id) ? 1 : 0);
            }, 0)
          };
        });

      console.log(this.categories);

      const categoriesCopy = [...this.categories];
      let i = 0;
      while (categoriesCopy.length) {
        this.rowsData.push({
          num: i,
          className: `swiper-container-${i}`,
          prevButtonClassName: `swiper-button-prev-${i}`,
          nextButtonClassName: `swiper-button-next-${i}`,
          paginationClassName: `swiper-pagination-${i}`,
          cols: categoriesCopy.splice(0, this.columns !== undefined ? this.columns : categoriesCopy.length).map((elem, index) => {
            return {
              ...elem,
              num: index
            }
          })
        });
        ++i;
      }

      console.log(this.rowsData);


    } catch (err) {
      this.error({ message: `Error loading category carousel: ${err.message}`, redirect: false });
    }
  },
  updated() {
    console.log('haha', document.querySelector('.swiper-container-0'));
    for (let i = 0; i < this.rowsData.length; ++i) {
      this.swipers.push(new Swiper(
        `.swiper-container-${i}`,
        {
          slidesPerView: this.slidesPerView !== undefined ? this.slidesPerView : 3,
          spaceBetween: 30,
          // navigation: {
          //   nextEl: `.swiper-button-next-${i}`,
          //   prevEl: `.swiper-button-prev-${i}`
          // },
          pagination: {
            el: `.swiper-pagination-${i}`,
            clickable: true
          }
        }
      ));
    }
    console.log(this.swipers);
  },
  mounted() {
    this.bruh = 'dfadfa';
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    })
  }
};
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: inherit;
  }

  .swiper-slide {
    height: 50%;
    transition: 250ms all;

    &:hover {
      transform: scale(1.1);
      z-index: 1;
    }

    &:first-child:hover {
      margin: 0 40px;
    }

    &:last-child:hover {
      margin: 0 -40px;
    }

  }
</style>
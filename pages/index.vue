<template>
  <div>
    <div class="header--lofty">
      <button class="button--lofty" @click="form_check = !form_check">Sign up</button>
    </div>
    <div class="body--lofty">
      <div v-for="i in 6" :key="i"></div>
    </div>
    <form class="form--lofty" @submit.prevent="onSubmit" v-if="form_check">
      <input v-model="form.name" type="text" placeholder="USERNAME" name="name" required />
      <input v-model="form.pass" type="password" placeholder="PASSWORD" name="password" required />
      <button class="button--lofty" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IndexPage',
  data() {
    return {
      form_check: false,
      form: {
        name: '',
        pass: ''
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        let response = await axios.post('/api/submit', this.form);
        if (response.status === 200) {
          alert('Form submitted successfully');
          this.form.name = '';
          this.form.pass = '';
        } else {
          alert('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #535c68;
}

.button--lofty {
  height: 30px;
  width: 90px;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
}

.button--lofty:hover,
.button--lofty:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button--lofty:hover {
  transform: translateY(-1px);
}

.button--lofty:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

.header--lofty {
  width: 100vw;
  height: 50px;
  background-color: #130f40;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.body--lofty {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;

  >div {
    background-color: white;
    height: 100px;
    width: auto;
  }
}

@media (min-width: 760px) and (max-width: 1023px) {
  .body--lofty {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

@media (min-width: 0px) and (max-width: 759px) {
  .body--lofty {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}

.form--lofty {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 260px;
  background-color: #130f40;

  >input {
    width: 90%;
    height: 30px;
  }
}
</style>
<template>
  <vs-dialog v-model="isOpen" blur>
    <template #header>
      <h4 class="not-margin">
        Welcome to <b>{{ $config.app_name }}</b>
      </h4>
    </template>

    <div class="con-form">
      <vs-input v-model="email" placeholder="Email">
        <template #icon> @ </template>
      </vs-input>
      <vs-input type="password" v-model="password" placeholder="Password">
        <template #icon>
          <i class="bx bxs-lock"></i>
        </template>
      </vs-input>
      <div class='item'>
        <vs-checkbox v-model="remember">Remember me</vs-checkbox>
        <a href="#">Forgot Password?</a>
      </div>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button
          block
          @click="login()"
          :loading="isAuthLoading"
        >
          Sign In
        </vs-button>

        <div class="new">New Here? <a href="#">Create New Account</a></div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { auth, modals } from '@/store'

export default {
  name: 'login-modal',
  data: () => ({
    email: '',
    password: '',
    remember: false,
  }),

  computed: {
    isOpen: {
      get() {
        return modals.modalName === 'login'
      },
      set(val) {
        val || modals.close()
      },
    },
    isAuthLoading:()=>auth.authStatus === 'loading'
  },

  methods: {
    login: async function () {
      const { email, password } = this
      await auth.login({ email, password })
      if (auth.authStatus === 'success') {
        modals.close()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.not-margin {
  margin: 0;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 0.8rem;
      opacity: 0.7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 20px 0 0 0;
    padding: 0;
    font-size: 0.7rem;

    a {
      color: rgb(var(--vs-primary)) !important;
      margin-left: 6px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

<style lang="scss">
.con-form {
  .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .vs-input-content {
    margin: 10px 0;
    width: calc(100%);
    .vs-input {
      width: 100%;
    }
  }
  .vs-button {
    margin: 0;
  }
}
</style>

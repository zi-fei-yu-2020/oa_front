import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const USER_KEY = "OA_USER_KEY"
const TOKEN_KEY = "OA_TOKEN_KEY"

export const useAuthStore = defineStore('auth', () => {
    let _user = ref({})
    let _token = ref("")

    function setUserToken(user, token) {
        //保存到对象上(内存中)
        _user.value = user
        _token.value = token

        //存储在浏览器的localStorage中(硬盘中)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(TOKEN_KEY, token)

    }

    function clearUserToken() {
        _user.value = {}
        _token.value = ""
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    //计算属性
    let user = computed(() => {
        //如果_user是一个空对象,那么就试图从localStorage中读取
        //js中,空对象{}用if判断会返回true,空字符串"",用if判断,会返回false
        if (Object.keys(_user.value) == 0) {
            let user_str = localStorage.getItem(USER_KEY)
            if (user_str) {
                _user.value = JSON.parse(user_str)
            }

        }
        return _user.value
    })
    let token = computed(() => {
        if (!_token.value) {
            let token_str = localStorage.getItem(TOKEN_KEY)
            if (token_str) {
                _token.value = token_str
            }
        }
        return _token.value
    })

    let is_logined = computed(() => {
        if (Object.keys(user.value).length > 0 && token.value) {
            return true
        }
        return false
    })


    //想要让外面访问到的，就必须要返回
    return { user, token, setUserToken, is_logined, clearUserToken }
})

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from '~/lang/en'
import zhLocale from '~/lang/zh'
const cookieparser = process.server ? require('cookieparser') : undefined
const domain  = '.antway.cn'
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
}

export default ({app, store, req}, inject) => {
  let lang = 'zh'
  if(process.server){
    if (req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(req.headers.cookie)
        lang = parsed.lang || 'zh'        
      } catch (err) {
      }
    }
  }
  else{
    Cookies.remove('auth')

    lang = Cookies.get('lang', {domain})
    if (!lang){
      lang='zh'
      Cookies.set('lang', 'zh', {domain})
    }
  }  
  app.i18n = new VueI18n({
    locale: lang,
    fallbackLocale: 'zh',
    messages
  })

}

const HTTP = {
  get(url) {
    return new Promise((resolve, reject) => {
      const Http = new XMLHttpRequest()
      Http.open('GET', url)
      Http.send()
      Http.onloadend = e => {
        resolve(Http)
      }
      Http.onerror = e => reject
    })
  },
  post(url, body=null) {
    return new Promise((resolve, reject) => {
      const Http = new XMLHttpRequest()
      Http.open('POST', url)
      Http.send(body)
      Http.onloadend = e => {
        resolve(Http)
      }
      Http.onerror = e => reject
    })
  }
}
class BiliBiliApi {
  constructor(server = '//api.bilibili.com') {
    this.server = server;
  }
  setServer(server) {
    this.server = server
  }
  getSeasonInfoByEpId(ep_id) {
    return HTTP.get(`${this.server}/pgc/view/web/season?ep_id=${ep_id}`);
  }
  getSeasonInfo(season_id) {
    return HTTP.get(`${this.server}/pgc/view/web/season?season_id=${season_id}`);
  }
  getSeasonInfoByEpSsIdOnBangumi(ep_id, season_id) {
    return HTTP.get('//bangumi.bilibili.com/view/web_api/season?' + (ep_id != '' ? `ep_id=${ep_id}` : `season_id=${season_id}`)).then(res=>{
      return Promise.resolve(JSON.parse(res.responseText))
    });
  }
  getSeasonInfoByEpSsIdOnThailand(ep_id, season_id) {
    const params = '?' + (ep_id != '' ? `ep_id=${ep_id}` : `season_id=${season_id}`) + `&mobi_app=bstar_a&s_locale=zh_SG`;
    const newParams = generateMobiPlayUrlParams(params, 'th');
    return HTTP.get(`${this.server}/intl/gateway/v2/ogv/view/app/season?` + newParams);
  }
  getPlayURL(req, ak, area) {
    return HTTP.get(`//${this.server}/pgc/player/web/playurl?${req._params}&access_key=${ak}&area=${area}`).then(res=>{
      return Promise.resolve(JSON.parse(res.responseText || "{}"))
    });
  }
  getAccessToken() {
    const url = "https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=https%3A%2F%2Fwww.mcbbs.net%2Ftemplate%2Fmcbbs%2Fimage%2Fspecial_photo_bg.png&sign=04224646d1fea004e79606d3b038c84a"
    return HTTP.get(url).then(res => {
      const resp = JSON.parse(res.responseText)
      console.log("passport: ", resp)
      return HTTP.get(resp.data.confirm_uri)
    }).then(res=>{
      console.log('URL: ', res)
      const access_key = new URL(res.responseURL).searchParams.get('access_key')
      console.log("---hook--AT", access_key)
      return Promise.resolve(access_key)
    })
  }
}

var space_account_info_map = {
  "11783021": { "code": 0, "message": "0", "ttl": 1, "data": { "mid": 11783021, "name": "哔哩哔哩番剧出差", "sex": "保密", "face": "http://i0.hdslb.com/bfs/face/9f10323503739e676857f06f5e4f5eb323e9f3f2.jpg", "sign": "", "rank": 10000, "level": 6, "jointime": 0, "moral": 0, "silence": 0, "coins": 0, "fans_badge": false, "fans_medal": { "show": false, "wear": false, "medal": null }, "official": { "role": 3, "title": "哔哩哔哩番剧出差 官方账号", "desc": "", "type": 1 }, "vip": { "type": 0, "status": 0, "due_date": 0, "vip_pay_type": 0, "theme_type": 0, "label": { "path": "", "text": "", "label_theme": "", "text_color": "", "bg_style": 0, "bg_color": "", "border_color": "" }, "avatar_subscript": 0, "nickname_color": "", "role": 0, "avatar_subscript_url": "" }, "pendant": { "pid": 0, "name": "", "image": "", "expire": 0, "image_enhance": "", "image_enhance_frame": "" }, "nameplate": { "nid": 0, "name": "", "image": "", "image_small": "", "level": "", "condition": "" }, "user_honour_info": { "mid": 0, "colour": null, "tags": [] }, "is_followed": true, "top_photo": "http://i2.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png", "theme": {}, "sys_notice": {}, "live_room": { "roomStatus": 1, "liveStatus": 0, "url": "https://live.bilibili.com/931774", "title": "「梦之祭！部」 社团活动最终回", "cover": "http://i0.hdslb.com/bfs/live/c89c499096fa6527765de1fcaa021c9e2db7fbf8.jpg", "online": 0, "roomid": 931774, "roundStatus": 0, "broadcast_type": 0 }, "birthday": "", "school": { "name": "" }, "profession": { "name": "" }, "tags": null, "series": { "user_upgrade_status": 3, "show_upgrade_window": false } } },
  "1988098633": { "code": 0, "message": "0", "ttl": 1, "data": { "mid": 1988098633, "name": "b站_戲劇咖", "sex": "保密", "face": "http://i0.hdslb.com/bfs/face/member/noface.jpg", "sign": "提供bilibili港澳台地區專屬戲劇節目。", "rank": 10000, "level": 2, "jointime": 0, "moral": 0, "silence": 0, "coins": 0, "fans_badge": false, "fans_medal": { "show": false, "wear": false, "medal": null }, "official": { "role": 0, "title": "", "desc": "", "type": -1 }, "vip": { "type": 0, "status": 0, "due_date": 0, "vip_pay_type": 0, "theme_type": 0, "label": { "path": "", "text": "", "label_theme": "", "text_color": "", "bg_style": 0, "bg_color": "", "border_color": "" }, "avatar_subscript": 0, "nickname_color": "", "role": 0, "avatar_subscript_url": "" }, "pendant": { "pid": 0, "name": "", "image": "", "expire": 0, "image_enhance": "", "image_enhance_frame": "" }, "nameplate": { "nid": 0, "name": "", "image": "", "image_small": "", "level": "", "condition": "" }, "user_honour_info": { "mid": 0, "colour": null, "tags": [] }, "is_followed": true, "top_photo": "http://i0.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png", "theme": {}, "sys_notice": {}, "live_room": { "roomStatus": 0, "liveStatus": 0, "url": "", "title": "", "cover": "", "online": 0, "roomid": 0, "roundStatus": 0, "broadcast_type": 0 }, "birthday": "01-01", "school": { "name": "" }, "profession": { "name": "" }, "tags": null, "series": { "user_upgrade_status": 3, "show_upgrade_window": false } } },
  "2042149112": { "code": 0, "message": "0", "ttl": 1, "data": { "mid": 2042149112, "name": "b站_綜藝咖", "sex": "保密", "face": "http://i0.hdslb.com/bfs/face/member/noface.jpg", "sign": "提供bilibili港澳台地區專屬綜藝節目。", "rank": 10000, "level": 3, "jointime": 0, "moral": 0, "silence": 0, "coins": 0, "fans_badge": false, "fans_medal": { "show": false, "wear": false, "medal": null }, "official": { "role": 0, "title": "", "desc": "", "type": -1 }, "vip": { "type": 0, "status": 0, "due_date": 0, "vip_pay_type": 0, "theme_type": 0, "label": { "path": "", "text": "", "label_theme": "", "text_color": "", "bg_style": 0, "bg_color": "", "border_color": "" }, "avatar_subscript": 0, "nickname_color": "", "role": 0, "avatar_subscript_url": "" }, "pendant": { "pid": 0, "name": "", "image": "", "expire": 0, "image_enhance": "", "image_enhance_frame": "" }, "nameplate": { "nid": 0, "name": "", "image": "", "image_small": "", "level": "", "condition": "" }, "user_honour_info": { "mid": 0, "colour": null, "tags": [] }, "is_followed": true, "top_photo": "http://i0.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png", "theme": {}, "sys_notice": {}, "live_room": { "roomStatus": 0, "liveStatus": 0, "url": "", "title": "", "cover": "", "online": 0, "roomid": 0, "roundStatus": 0, "broadcast_type": 0 }, "birthday": "", "school": { "name": "" }, "profession": { "name": "" }, "tags": null, "series": { "user_upgrade_status": 3, "show_upgrade_window": false } } },
};

const URL_HOOK = {
  "https://api.bilibili.com/pgc/view/pc/season": async (req)=>{
    console.log('HOOK', req)
    const resp = JSON.parse(req.responseText || "{}")
    if(resp.code !== 0){
      // 状态码异常
      const api = new BiliBiliApi()
      sessionStorage.access_key = sessionStorage.access_key || await api.getAccessToken()
      console.log('upos: ', localStorage.upos)

      const serverList = JSON.parse(localStorage.serverList || "{}")
      console.log('serverList: ', serverList)

      let seasonInfo = null;
      const params = _params2obj(req._params)
      console.log('params: ', params)
      for (let area in serverList) {
        console.log("for ")
        const server = serverList[area] || ""
        if (server.length === 0) continue

        api.setServer(server)

        seasonInfo = await api.getSeasonInfoByEpSsIdOnBangumi(params.ep_id || "", params.season_id || "")
        console.log('area: ', area, ', seasonInfo: ', seasonInfo)
        if (seasonInfo.code !== 0) continue;
        // title id
        seasonInfo.result.episodes.forEach(ep => {
          ep.title = ep.title || `第${ep.index}话 ${ep.index_title}`
          ep.id = ep.id || ep.ep_id
        })
        break;
      }
      if ((seasonInfo?.code??-1) === 0){
        req.responseText = JSON.stringify(seasonInfo)
      }

    }
  },
  "https://api.bilibili.com/pgc/view/web/season/user/status": async (req)=>{
    const resp = JSON.parse(req.responseText)
    resp.result.area_limit = 0;
    req.responseText = JSON.stringify(resp)
  },
  // 获取播放链接
  "//api.bilibili.com/pgc/player/web/playurl": async (req)=>{
    const resp = JSON.parse(req.responseText)
    if(resp.code !== 0 && resp.message === "抱歉您所在地区不可观看！"){
      const serverList = JSON.parse(localStorage.serverList||"{}")
      const api = new BiliBiliApi()
      for(let area in serverList){
        const server = serverList[area] || ""
        console.log('getPlayURL from ', area, ' - ', server)
        if(server.length === 0)continue;
        api.setServer(server)
        
        const playURL = await api.getPlayURL(req, sessionStorage.access_key || "", area)
        if(playURL.code !== 0)continue
        req.responseText = JSON.stringify(playURL)
        break
      }
    }
  },
  // 用户信息
  "//api.bilibili.com/x/space/acc/info": async (req)=>{
    const resp = JSON.parse(req.responseText)
    if(resp.code !== 0){
      const params = _params2obj(req._params)
      const userInfo = space_account_info_map[params.mid]
      if(userInfo)req.responseText = JSON.stringify(userInfo)
    }
  }
}

/*请求响应修改器1.0*/
class HttpRequest extends window.XMLHttpRequest {
  constructor() {
    super(...arguments);
    this._url = "";
    this._params = "";
    this.onreadystatechange = null;
    this.onloadend = null;
    let responseText = "";
    let response = null
    Object.defineProperty(this, "responseText", {
      get() {
        return responseText
      },
      set(v) {
        responseText = v
      }
    })
    Object.defineProperty(this, "response", {
      get() {
        return response
      },
      set(v) {
        response = v
      }
    })
  }
  send() {
    const arr = [...arguments];
    if (arr[0]) {
      const params = null;
      if (params !== null) {
        arr[0] = params
      }
    }
    return super.send(...arr)
  }
  open() {
    const arr = [...arguments];
    const url = arr[1];
    if (url) {
      const [path, params] = url.split(/\?/);
      this._url = path;
      this._params = params;
      if (this._params) {
        const params = null;
        if (params !== null) {
          arr[1] = this._url + "?" + params
        }
      }
    }
    let fn = this.onreadystatechange;
    Object.defineProperty(this, "onreadystatechange", {
      set(v) {
        fn = v;
      }
    });
    super.onreadystatechange = () => {
      if (this.readyState === 4 && this.status === 200) {
        // console.log('onreadystatechange', this)
        switch (super.responseType) {
          case 'text':
          case '': {
            const responseText = super.responseText;
            if (responseText) {
              // console.log(responseText)
              const res = null;
              if (res !== null) {
                this.responseText = res
              } else {
                this.responseText = super.responseText
              }
            } else {
              this.responseText = super.responseText
            }
          }
          break;
        case 'json': {
          const response = super.response;
          if (response) {
              const res = null;
              if (res !== null) {
                  this.response = res
              } else {
                  this.response = super.response
              }
          } else {
              this.response = super.response
          }
        }
        break;
        default:
          break;
        }
      }
      // 用于arraybuffer等
      if(super.responseType === "arraybuffer")
        this.response = super.response
      if (fn) {
        if(this.readyState === 4 && URL_HOOK[this._url]) URL_HOOK[this._url](this).then(()=>fn())
        else
        fn();
      }
    };

    let fn1 = this.onloadend;
    Object.defineProperty(this, "onloadend", {
      set(v) {
        fn1 = v;
      }
    });
    super.onloadend = async () => {
      // console.log('onloadend', this)
      if (fn1) {
        if(URL_HOOK[this._url])await URL_HOOK[this._url](this)
        fn1();
      }
    };

    let fn2 = this.onload;
    Object.defineProperty(this, "onload", {
      set(v) {
        fn2 = v;
      }
    });
    super.onload = async () => {
      if (fn2) {
        // console.log('onload', this)
        if(URL_HOOK[this._url])await URL_HOOK[this._url](this)
        fn2();
      }
    };
    return super.open(...arr)
  }
  // onload(){
  //   console.log('onload', ...arguments)
  // }
}

function _deCode(params) {
  return params.split("&").map((a) => {
    const [key, value] = a.split("=");
    if (!key) return "";
    return decodeURIComponent(key) + "=" + decodeURIComponent(value)
  })
}

function _params2obj(params){
  const arr = params.split('&')
  const result = {}
  for(let param of arr){
    const [key, value] = param.split('=')
    result[key] = value
  }
  return result
}
window.XMLHttpRequest = HttpRequest;
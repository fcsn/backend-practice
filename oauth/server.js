const express = require('express')
const axios = require('axios')

const app = express()

app.set('view engine', 'ejs')

// facebook step 1
const appId = '1225526950936676'
const appSecret = '129692574a0f92692cf03ae44fd394b3'
const redirectUrl = 'http://localhost:3000/oauth/facebook'
const facebookDialogUrl = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&grant_type=authorization_code`

// twitch step 1
const twitchId = '8pym4hg5otx0f5bdl94ca6nbm8mkx5'
const twitchSecret = '7joi97d9lczao4bbyxcze7ah82ejzh'
const twitchRedirectUrl = 'http://localhost:3000/oauth/twitch'
const twitchDialogUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchId}&redirect_uri=${twitchRedirectUrl}&response_type=code`

app.get('/', (req, res) => res.render('index', {
    facebookUrl: facebookDialogUrl,
    twitchUrl: twitchDialogUrl
}))

// pinterest step 1

const pinterId = '5014128445100159925'
const pinterSecret = '9487fa72a09fb1fdfa5809fbfa2c69831e017534b361b42c14ba25de0f6fdb1c'
const redirectUrl = 'http://localhost:3000/oauth/pinterest'
const pinterDialogUrl = ``

//facebook step 2
// http://localhost:3000/oauth/facebook?code=AQBKG6CkJA2gY4KoufrBYZGnbbnjqEhiaRSih9A4o065DEqEjodFI2CElHgousgiqhzVRXKjq54illj6EQ54DV7f901UNe3CTkFEMM-aDIn5zzBk0VJcbgg8jJOoZ_Cac1_bmyHkD-1oo_c5enc0Tk7L0nvgy3WJch7I91XMMcZCuHRFjhMhkoKvdzpW6Gnypv1kvQswPosGPrinl1GdUvzNb9JFdzjmVV2rJAk13ubVtOXfit1DFj_CY_gnEZtUqpzdIWln756grDO75xcobvIlk28tcuphMcU5L4Kf8GasKNwPKFWc-K9yemC7K8JJEEx738fyIBYxT38YPm5cTMTE#_=_
app.get('/oauth/facebook', (req, res) => {
    const authorizationCode = req.query.code
    const tokenEndPoint = `https://graph.facebook.com/v3.2/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUrl}&client_secret=${appSecret}&code=${authorizationCode}`
    axios.get(tokenEndPoint).then(response => {
        axios.get(
            'https://graph.facebook.com/me',
            {
                headers: { Authorization: `Bearer ${response.data.access_token}` }
            }
        ).then(response2 => {
            res.json(response2.data)
            // 바로 리스폰스하는 것이 아니고!
            // 우리 디비에 저장! (있으면, 저장하지말고)
            // facebook 쪽 id는 provider_id로 provider_name=facebook
            // 우리쪽 user_id의 정보를 포함하는 accessToken(이거는 우리가 만드는 토큰!)을 리스폰스!
            // res.json({ accessToken: 'asdfasdfasdf' }) -> 이토큰으로는 cluedit api에 리퀘스트 가능!
        })
    })
})

// twitch step 2

app.get('/oauth/twitch', (req, res) => {
    const authorizationCode = req.query.code
    const tokenEndPoint = `https://id.twitch.tv/oauth2/token?client_id=${twitchId}&client_secret=${twitchSecret}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${twitchRedirectUrl}`
    axios.post(tokenEndPoint).then(response => {
        axios.get(
            'https://api.twitch.tv/kraken/',
            {
                headers: { Authorization: `OAuth ${response.data.access_token}` }
            }
        ).then(response2 => {
            res.json(response2.data)
        })
    })
})

app.listen(3000, () => console.log('hoho'))

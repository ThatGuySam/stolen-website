/* 
  This a helper for adding Facebook's Javascript SDK in a modern development environment with build tools.
  Runs as a promise so you can run:
  await const FB = facebook()
  OR
  facebook().then((FB) => {
    
  })
  and then know that your facebook SDK is initialized
  It also should work with fullstack frameworks like Next.js and Nuxt.js
*/

let hasJsLoaded = false

const init = async () => new Promise(function(resolve, reject) {
  window.FB.Event.subscribe('auth.statusChange', function(response) {
    if(response.status === 'connected') {
      resolve()
    }
  })
  
  window.FB.init({
    appId: process.env.FACEBOOK_APP_ID,
    cookie: true,
    version: 'v6.0',
    xfbml: true,
  })

})

const facebook = () => new Promise(function(resolve, reject) {
    // Cancel if there's no document
    if (typeof document !== 'object') reject('Is there a document?')

    // If the Facebook SDK is already initialized then return it
    if (hasJsLoaded) {
      init().then(() => {
        // Rerender all Facebook plugins on the page
        // window.FB.XFBML.parse()
        resolve(window.FB)
      })

      return
    }
  
    window.fbAsyncInit = function() {
      console.log('Facebook JS Loaded', window.FB)

      hasJsLoaded = true

      init().then(() => {
        resolve(window.FB)
      })
    }
  
    const id = 'facebook-jssdk'
    // const fbAppId = process.env.FACEBOOK_APP_ID
  
    if (document.getElementById(id)) reject('Facebook SDK already exists!')
    // Create the fbScriptTag that we're going to add to the DOM later
    const fbScriptTag = document.createElement('script')
    // Find the first script tag present, we'll add the fbScriptTag before this
    const anchorScriptTag = document.getElementsByTagName('script')[0]
  
    // Set attributes
    fbScriptTag.id = id
    // fbScriptTag.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=${fbAppId}`
    fbScriptTag.src = 'https://connect.facebook.net/en_US/all.js'
  
    // Insert into DOM
    if (typeof anchorScriptTag !== 'undefined') anchorScriptTag.parentNode.insertBefore(fbScriptTag, anchorScriptTag)
})

export default facebook
## Demo Link 

[https://twitter-clone-ecru-phi.vercel.app/](https://twitter-clone-ecru-phi.vercel.app/)

## screenshots

<img src="https://github.com/anishredddy/twitter-clone/blob/main/screenshots/Screenshot%20(72).png" width="768" height="480" alt="Image not found" />


![Image not found](<https://github.com/anishredddy/twitter-clone/blob/main/screenshots/Screenshot%20(72).png>)

![Image not found](<https://github.com/anishredddy/twitter-clone/blob/main/screenshots/Screenshot%20(73).png>)
![Image not found](<https://github.com/anishredddy/twitter-clone/blob/main/screenshots/Screenshot%20(74).png>)
![Image not found](<https://github.com/anishredddy/twitter-clone/blob/main/screenshots/Screenshot%20(75).png>)


## note to self / things to further do

use NextAuth or clerk to implement proper authentication

clear up the routes, some un-necessary prototype/ testing routes present

clear up some un-necessary UI

use sessions and cookies, to validate user maybe instead of displaying it on the url and allowing access to everyone

use a hook and store the user data in a cahce/ or a hook in general instead of fetching from database every single time

especially for profile photo which is used multiple times, fetching a large byte 64 value from DB every single time takes time and impacts performance , a hook to get the data and store in a global varible would be better maybe??

allow users to browse through the UI and prompt them to login/register only for specific actions

## how to run

go to folder =>

npm i => to install all packages

npm run dev => to run server on localhost

# Install Time Stamp

## 1. Clone the repo and install dependency
> You must have nodejs installed
```js
git clone https://github.com/ats1999/time-stamp.git

cd time-stamp

npm i
```

## 2. Create `.env` config
Create a file named `.env` in side `time-stamp` and paste the below contents
```js
GOOGLE_CLIENT_ID=
SECRET=
GOOGLE_CLIENT_SECRET=
MONGO_URI=
```

Now, you can get these value from here
- [GOOGLE_CLIENT_ID](https://www.ibm.com/docs/SS6KM6/com.ibm.appconnect.dev.doc/how-to-guides-for-apps/getting-oauth-credentials-for-google-applications.html)
- SECRET - it is a random string used to secure token
- [GOOGLE_CLIENT_SECRET](https://www.ibm.com/docs/SS6KM6/com.ibm.appconnect.dev.doc/how-to-guides-for-apps/getting-oauth-credentials-for-google-applications.html) 
- [MONGO_URI](https://docs.mongodb.com/manual/reference/connection-string/)

> Make sure to put this value in google OAuth console 

![Screenshot from 2022-01-15 07-00-57](https://user-images.githubusercontent.com/54087826/149603795-8292bf94-d6a4-482c-b298-97838925be1a.png)



## 3. Start the application
Type `npm run dev` in terminal

## 4. Open the application 
http://localhost:3000

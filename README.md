# HELLO EVERYONE! HOME OF THE SWERVE NATION!
## Developed By:
	Matthew Price, Austin Baggio, Noah Chait, Jimmy Domagala-Tang,
	Husayn Kara, Quentin Madruga, Connor McCauley

## Video Demo Series 

https://www.youtube.com/playlist?list=PLOLGcB_bJ07gToRURf_pRdEq3psjNWqzg

## Frameworks & enivornments

### Backend:
- Mongo w Express 
- Node.js

### Frontend:
- Angular 5

### Design Standards:
- material.angular.io

## To Setup:

Step 1) Download and unpack the provided files.
Step 2) Open CMD.
Step 3) CD into the "C:\Swerve2018\FrontEnd\SSBS\frontend\frontend-swerve-start" file directory
Step 4) Run command "npm install" in CMD
Step 5) CD into the "C:\Swerve2018\BackEnd\Swerve\backend" file directory
Step 6) Run command "npm install" in CMD
Step 7) Run command "npm i nodemon -g"
Step 8) Run command "npm install jsonwebtoken"
Step 9) Open a second CMD instance.
Step 10) On the second CMD instance, cd into wherever your MongoDB file is, such as "C:\Program Files\MongoDB\Server\3.6\bin"
Step 11) One the same instance, use command "mongod"
Step 9) On the first CMD - Run backend with command "npm run dev"
Step 10) Open a Third CMD instance.
Step 11) In third instance, CD into the "C:\Swerve2018\FrontEnd\SSBS\frontend\frontend-swerve-start"
Step 12) Run front end with "npm Start" command. 
Step 13) Connect to website with localhost:8081 in a web browser. Enjoy!

Information: All frontend and backend files are already in the exact hierarchy needed to run, no changes should be necessary. 


## TORUN 


### in backend

```
./rundb
mongo
npm run dev
```

### in frontend:

```
npm start
```

### Create new component
```
$ ng g component [<path>]/<name> --module app
$ ng g component <name> --module app
```


### admin login 
```
email: jimbusSupreme@gmail.com  
pass: ohboi

```

### checking and rerouting
```
// add this to the top as an import, may need to be ../../../
import { AuthManageService } from '../../services/auth-manage.service';
//add this as a variable in the ts class
token;
// add this to teh top of ngoninit()
this.token = localStorage.getItem('token');
//if only an admin should see this page, add this after the above line


```

### Sandbox accounts
| ID   | User                   | Pass             | First     | Last     |
| ---- | ---------------------- | ---------------- | --------- | ---------|
| Buy1 | davgren@selfstart.com  | sandBoxBuyAlpha  | David     | Greene   |
| Buy2 | kjaneway@selfstart.com | sandBoxBuyBeta   | Kathryn   | Janeway  |
| Buy3 | matcross@selfstart.com | sandBoxBuyGamma  | Matthew   | Cross    |
| Buy4 | gmolyn@selfstart.com   | sandBoxBuyDelta  | Gwenivere | Molyneux |

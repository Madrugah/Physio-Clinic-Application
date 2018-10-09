# HELLO EVERYONE! HOME OF THE SWERVE NATION!

## Frameworks & enivornments

### Backend:
- Mongo w Express 
- Node.js

### Frontend:
- Angular 5

### Design Standards:
- material.angular.io

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
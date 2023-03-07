@ECHO OFF 
cd %cd%/backend
start yarn run prod
start http://localhost:5005


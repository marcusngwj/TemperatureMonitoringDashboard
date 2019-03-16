## Description
A custom UI dashboard for a smart domitory with temperature monitoring. The purpose of this project is to practise on GUI design patterns and web frameworks. View [project requirements](docs/requirements.pdf) for more details.

## Set up
This project was setup on the Windows OS
1. Install `chocolatey` using the administrator command prompt
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
2. Install `meteor` via `chocolatey`
```
choco install meteor
```
3. Navigate to this project root directory and install all dependencies
```
meteor npm install
```
4. Start the application
```
meteor
```
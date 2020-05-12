# rumble-react
A react client for the rumble server

The official URL is: http://saarsayfan.pythonanywhere.com/static/rumble-react

## Deployment on PythonAnywhere
### First Time Prerequisites
Run the following commands in a [PythonAnywhere console](
https://www.pythonanywhere.com/user/saarsayfan/consoles):
```
pip install --user sh
git clone https://github.com/Bloblblobl/rumble-react.git
```

Install Node locally:
```
git clone https://github.com/creationix/nvm.git
source ~/nvm/nvm.sh
nvm install v9.6.1
nvm alias default v9.6.1
cd rumble-react
npm install
```
Or run `install_node.py` (Untested)

### General Deployment
```
cd rumble-react
python pythonanywhere_deploy.py
```
You may need to [clear your browser cache](https://kb.iu.edu/d/ahic) after deployment

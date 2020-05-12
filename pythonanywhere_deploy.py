import sh, shutil, glob, subprocess

def main():
    root = '/home/saarsayfan/'

    subprocess.Popen('nvm alias default v9.6.1')
    print(nvm.stdout)

    gp = sh.git('pull')
    if gp.stdout.startswith('Already up-to-date.'):
        continue = input('UP TO DATE. CONTINUE (Y/N)?')
        if continue.lower() != 'y':
            return

    nrb = sh.npm('run', 'build')
    if 'STDERR' in nrb.stdout:
        print(nrb.stdout)
        return

    print('BUILD SUCCESSFUL')

    cdbs = sh.cd(root + 'rumble-react/build/static')
    shutil.copytree('js', '../js')
    shutil.copytree('css', '../css')
    shutil.copytree('media', '../media')
    cdb = sh.cd(root + 'rumble-react/build')
    shutil.rmtree('static')

    with open('index.html', 'r+') as f:
        t = f.read()
        t = t.replace('favicon.ico', 'static/rumble-react/favicon.ico')
        f.seek(0)
        f.write(t)
        f.truncate()

    filename = glob.glob('js/*.js')[0]
    with open(filename, 'r+') as f:
        t = f.read()
        t = t.replace('/images/logo.png', 'rumble-react/images/logo.png')
        f.seek(0)
        f.write(t)
        f.truncate()

    with open('index.html', 'r+') as f:
        t = f.read()
        t = t.replace('static', 'static/rumble-react')
        f.seek(0)
        f.write(t)
        f.truncate()

    cdrr = sh.cd(root + 'rumble-react')

    shutil.rmtree(root + 'Rumble-React-Builds/build')
    shutil.copytree(root + 'rumble-react/build', root + 'Rumble-React-Builds/build')

    print('DEPLOYMENT SUCCESSFUL!!! (HOPEFULLY)')

if __name__ == '__main__':
    main()

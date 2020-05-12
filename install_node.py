import sh, subprocess

def main():
    sh.git('clone https://github.com/creationix/nvm.git')
    subprocess.Popen('source ~/nvm/nvm.sh')
    subprocess.Popen('nvm install v9.6.1')
    subprocess.Popen('nvm alias default v9.6.1')
    sh.cd('rumble-react')
    sh.npm('install')

if __name__ == '__main__':
    main()

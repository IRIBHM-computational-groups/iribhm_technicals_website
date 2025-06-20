# Tips and tricks

## Useful Commands

Here is a list of useful commands that you'll find on most Linux distributions. Feel free to ask other lab members about them or check their official documentation (Google search, `man` command, or `--help` argument).

- `htop` – Look at RAM and CPU usage  
- `nvidia-smi` – Look at GPU usage  
- `killall -u ${USER}` – Kill all your processes, to clean up  
- `kill` – When a process stops responding (or use `killall`)  
- `screen` or `tmux` – Terminal multiplexers, keep your processes running in background  
- `rsync` or `scp` – Transfer files or folders between machines  
- `chmod` – Define permissions for a file/folder  
- `df` – Statistics on disks  
- `du` – Evaluate folder/file size (do **not** use on `/mnt/iribhm`)  
- `getfattr -n ceph.dir.rbytes /mnt/iribhm/blabla` – Evaluate size of folder on `/mnt/iribhm`

Example usage to list folder sizes in `/mnt/iribhm`:

```bash
for i in $(ls /mnt/iribhm); do getfattr -n ceph.dir.rbytes /mnt/iribhm/$i; done
```

---

## Speed Up Your SSH Connections

If you're not a JupyterLab addict, you'll probably connect to Hyperion with SSH a lot. Thus, speeding up that process will save you time. One key improvement is to configure your `${HOME}/.ssh/config` file where you can define hostnames and other variables for each host.

Example config for Hyperion VMs:

```ssh
# ULB cluster ----------------------------------------------------------------------
Host gpu01 gpu02 gpu03 himem
    User atourneu
    ForwardX11 yes

Host builder
    User atourneu
    Hostname iribhm-builder.hpda.ulb.ac.be

Host gpu03
    Hostname iribhm-gpu03.hpda.ulb.ac.be

Host gpu02
    Hostname iribhm-gpu02.hpda.ulb.ac.be

Host gpu01
    Hostname so-iribhm-gpu01.hpda.ulb.ac.be

Host himem
    Hostname iribhm-himm01.hpda.ulb.ac.be
```

Another major speedup comes from SSH keys. They allow secure, password-less connections (if you don’t set a password for the key). You can find many tutorials online. Example:

[How to Set Up SSH Keys on Linux/Unix](https://www.cyberciti.biz/faq/how-to-set-up-ssh-keys-on-linux-unix/)

---

## Configure Your `.bashrc` Profile

The file `${HOME}/.bashrc` is automatically sourced every time you start a terminal. You can use it to define helper functions, variables, or automate tasks.

Define aliases:

```bash
alias csi='cd /mnt/iribhm/software/singularity'
alias singuR='singularity exec /mnt/iribhm/homes/atourneu/r_full.sif R'
```

Set a variable:

```bash
export PATH=${PATH}:/mnt/iribhm/software/bin
```

Automate tasks at each terminal startup:

```bash
chmod -R 750 ${HOME}
chmod 600 ${HOME}/.ssh/*
```

Backup your code with Git:

```bash
eval $(ssh-agent)
ssh-add ${HOME}/.ssh/id_rsa.github
cd ${HOME}/scripts/
git add -A
git commit -m "$(date)"
git push
```

Automate storage checks for `/mnt/iribhm` saturation:

```bash
PERCENTIRIBHM=`df -k /mnt/iribhm | grep "/mnt/iribhm" | awk '{print $(NF-1)}'`
if [ ${PERCENTIRIBHM::-1} -gt 95 ]; then 
  echo '### WARNING ### IRIBHM STORAGE HAS REACHED 95 PERCENT CAPACITY ### CLEANING IS ADVISED'; 
fi
```

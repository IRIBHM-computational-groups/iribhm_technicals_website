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
- `numfmt --to iec --format "%8.4f" $(getfattr -n ceph.dir.rbytes --only-values /absolute/path/to_directory )` – Evaluate size of folder on `/mnt/iribhm`

Example usage to list folder sizes in `/mnt/iribhm`:

```bash
# Iterate over items in /mnt/iribhm
for i in $(ls /mnt/iribhm); do 
    # Get the size attribute for the item
    SIZE=$(getfattr -n ceph.dir.rbytes --only-values /mnt/iribhm/$i 2>/dev/null)
    
    # Check if the size is available
    if [ -n "$SIZE" ]; then
        # Format the size in human-readable format
        FORMATTED_SIZE=$(numfmt --to=iec --format="%8.4f" "$SIZE")
        # Output the folder name and its size
        echo "$i: $FORMATTED_SIZE"
    else
        echo "No size attribute for $i"
    fi
done
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

### Define aliases:

```bash
alias csi='cd /mnt/iribhm/software/singularity'
alias singuR='singularity exec /mnt/iribhm/homes/atourneu/r_full.sif R'
```

### Set a variable:

```bash
export PATH=${PATH}:/mnt/iribhm/software/bin
```

### Automate tasks at each terminal startup:

```bash
chmod -R 750 ${HOME}
chmod 600 ${HOME}/.ssh/*
```

### Backup your code with Git:

```bash
eval $(ssh-agent)
ssh-add ${HOME}/.ssh/id_rsa.github
cd ${HOME}/scripts/
git add -A
git commit -m "$(date)"
git push
```

### Automate storage checks for `/mnt/iribhm` saturation:


```bash
#!/bin/bash

# Get the disk usage percentage for the specified mount point
USAGE=$(df /mnt/iribhm | grep /mnt/iribhm | awk '{ print $5 }' | sed 's/%//g')
if [ "$USAGE" -gt 95 ]; then
    # Prepare the warning message
    MESSAGE="Warning: Disk usage is at ${USAGE}% on $(hostname) for /mnt/iribhm. Please take action!"

    # Echo the message in red
    echo -e "\e[31m$MESSAGE\e[0m"
# Check if the usage is greater than 90% but less than or equal to 95%
elif [ "$USAGE" -gt 90 ]; then
    # Prepare the caution message
    CAUTION_MESSAGE="Caution: Disk usage is at ${USAGE}% on $(hostname) for /mnt/iribhm. Please monitor the situation."

    # Echo the message in yellow
    echo -e "\e[33m$CAUTION_MESSAGE\e[0m"
fi
```
(You can add this script in a file and call it when you login by add it in your .bashrc)

```bash
YOUR_SCRIPT="path_to_your_script.sh"
chmod +x $YOUR_SCRIPT
echo "$YOUR_SCRIPT" >> ~/.bashrc
```
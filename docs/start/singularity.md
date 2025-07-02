# Singularity Containers  

## What are singularity containers ? 
Singularity containers allow you to run your analyses in a reproducible manner on Hyperion. They are comparable to docker containers, except that they are designed to operate on scientific clusters such as Hyperion. You can consider them as a variant of virtual machines except that their goal is to isolate applications and not computer resources. They are also easier to create and use than virtual machines. The project was originally named Singularity but it was split in november 2021 in two separate entities, and the one we use is called Apptainer. Yet the apptainer and singularity commands can both be used interchangeably. The official documentation can be found on the [apptainer website](https://apptainer.org/documentation/)

To verify the version currently installed on Hyperion you can use the command :
```bash
apptainer --version
```

## Quickstart example

The machine to build containers can be accessed with :
```bash
ssh your_login@iribhm-builder.hpda.ulb.ac.be
```
Importantly, this virtual machine is not for compute and it has small storage, so clean up you homedir after use.
Once logged on this machine we build containers with apptainer, formerly singularity.
First, you need a sandbox. It can be build from an existing apptainer container image, `container_name.sif`, with
```bash
sudo apptainer build --sandbox container_name container_name.sif
```
Note that an image (sif file) can be created from an online docker container, e.g.
```bash
sudo apptainer build rapidsai-22.06.sif docker://rapidsai/rapidsai-core:22.06-cuda11.5-runtime-ubuntu20.04-py3.9
```
Once you’ve got your sandbox you can run it in writable mode with
```bash
sudo apptainer shell --writable container_name
```
Any install in this mode will be preserved. A good practice is to log every command you type in a .def file in order to automatically rebuild the VM later if needed. For an example of def file with install from within R, look at the example in `/mnt/iribhm/software/singularity/r_full.def`
To use the container in the actual compute environment, you need to build an image with
sudo apptainer build container_name.sif container_name
Then copy it to the desired hyperion folder with `rcp` or `rsync`.
To run code in the container log to any of our hyperion servers and run
```bash
apptainer shell --nv -B /mnt/scratch:/mnt/scratch /mnt/iribhm/software/singularity/container_name.sif
```
This will take you inside the container with all the packages you’ve installed readily available! It will work on hyperion but also any hardware with apptainer installed. 
They can of course also be used in `tmux` or `screen` sessions.

## Long format - How to use singularity containers ?
The containers can be used either via the command line or through the jupyterlab web interface. To use them through jupyterlab just connect to the URL of your desired VM and click on the container you need when starting a new notebook.

With the command line they can be used interactively (e.g. apptainer shell) or non-interactively (e.g. apptainer exec). The documentation describing how to use them can be found [here](https://apptainer.org/docs/user/latest/quick_start.html#interacting-with-images)

## Long format - How to build singularity containers ?
### Creating a new container on the builder VM
Containers are built on the builder VM using the "apptainer build" command. You always build a new container upon a pre-existing one, whether it is online or from one of yours. The proper way to build containers is to use definition files. These definition files are text files containing a set of instructions, very similar to the commands you would enter in your terminal to install software on a linux machine. The structure of those definition files and the proper way to use the build command is described [here](https://apptainer.org/docs/user/latest/build_a_container.html).

Personal or development containers can be built in your home folder on the builder VM. If you want to share the definition file of one of your containers, you can put it in the `/opt/common` folder of the builder VM. This folder contains a git repository that is set up to sync all files with the .def extension to the team github group.

>[!NOTE]
>sandboxes can be useful for debugging purposes when creating complex containers but they are not reproducible, use them at your own risks. If you have to use them, make sure that you track the changes you made in a separate text file.

### Enabling the newly created container
Once a container has been created on the builder VM it can be copied on the production VMs (himm and the 3 GPU VMs) using a command such as rsync or scp. You can copy them on the IRIBHM mount which is shared among those 4 VMs, either in your home folder or in the shared singularity folder : `/mnt/iribhm/software/singularity`

Once they are copied they can be used directly with the command line like this:
``` bash
apptainer shell /mnt/iribhm/software/singularity/my_apptainer.sif
```

 If you wish to use them on jupyterlab you must create a new kernel for this container. If you only want this kernel to show up on your home screen, store its settings folder here: `${HOME}/.local/share/jupyter/kernels`. You may need to create this folder the first time :
```bash
mkdir -p ${HOME}/.local/share/jupyter/kernels
```

To share your kernel with everybody, store its settings folder to `/opt/local/jupyter/kernels/`.

Each kernel is composed of a folder (named as you wish) containing at least a kernel.json file. You can adapt one of the examples kernel files provided below (depending on whether you want R or python). To do so just edit the path to your container in the kernel.json file as well as the display_name variable, which is the name that will be displayed in the jupyterlab interface. You may also need to adapt the path to the executable in your container. 

***Python example***
```json
{ 
 "argv": ["/usr/bin/singularity", 
   "exec", 
   "--writable-tmpfs", 
   "/home/joerodri/software/cell2location/cell2location-v0.05-alpha.sif", 
   "/opt/conda/envs/cellpymc/bin/python", 
   "-m", 
   "ipykernel", 
   "-f", 
   "{connection_file}" 
 ], 
 "display_name": "Cell2Loc",
 "language": "python"
}
```

***R example***
```
{
  "argv": ["/usr/bin/singularity",
    "exec",
    "--writable-tmpfs",
    "--nv",
    "/mnt/iribhm/software/singularity/r_full.sif",
    "/usr/lib/R/bin/R",
    "--slave",
    "-e",
    "IRkernel::main()",
    "--args",
    "{connection_file}"],
  "display_name": "R full",
  "language": "R"
}
```

Something else to keep in mind when building your container is that if you want to use it with jupyterlab you will need to install an extra packages to do so, IRkernel for R and ipykernel for python.

Optionally, you can give your kernel a logo in the form of an image or a gif. Save it in the kernel directory as `logo-32x32` or `logo-64x64`, with extension '.png' or '.gif', like this:
```
/opt/local/jupyter/kernels/  
└───my_kernel
    └───kernel.json
    └───logo-64x64.png
```
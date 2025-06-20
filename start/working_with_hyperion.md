# Hyperion

## What is Hyperion ? 
Welcome to the heart of our lab's digital ecosystem! Hyperion is an HPC cluster (High Performance Computing). A cluster is a network of connected computers, working together to tackle complex tasks. It's like a digital powerhouse that amplifies our ability to process data and run computationally intensive simulations.
Our cluster comprises five distinct servers, each with its own set of capabilities: 

## How to connect ? 
To connect to one of these servers, first of all, you will need to connect to the ulb VPN Global Protect.
Connection steps are described in [here](https://support.ulb.be/fr/web/support/-/comment-utiliser-ulb-vpn-)
> [!NOTE]
> If you using Linux you can set up your VPN with [this link](https://support.ulb.be/fr/web/support/-/how-to-connect-to-ulb-global-protect-vpn-on-linux-?inheritRedirect=true&redirect=%2Ffr%2Fweb%2Fsupport%2F-%2Fcomment-utiliser-ulb-vpn-) 

Once connected to the VPN, different options are available to you as listed below. Keep in mind that notebooks such as jupyter are designed to facilitate exploratory data analysis mixing code, outputs and comments. When running resource-intensive tasks or heavy pipelines that are designed to produce defined results without user inputs, terminal multiplexers such as screen or tmux should be preferred. 

<!-- tabs:start -->
### **Command Line Interface**
`ssh ulbid@<url>`

Your ulbid is the same as the one used to connect to the "Virtual University".
The URL depend on the server you want to connect to, as shown above. 


| Name    | Adress                        | Note                                                                                                                                                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Himm    | iribhm-himm01.hpda.ulb.ac.be  | Packed with numerous CPUs, the Himm server is a computational powerhouse, although it doesn't house GPUs. Ideal for CPU-intensive tasks                                                                                         |
| GPU01   | iribhm-gpu01.hpda.ulb.ac.b    | Equipped with both CPUs and GPUs, GPU01 is your go-to for tasks that demand the parallel processing might of graphical processing units.                                                                                        |
| GPU02   | iribhm-gpu02.hpda.ulb.ac.b    | Equipped with both CPUs and GPUs, GPU01 is your go-to for tasks that demand the parallel processing might of graphical processing units.                                                                                        |
| GPU03   | iribhm-gpu03.hpda.ulb.ac.b    | Equipped with both CPUs and GPUs, GPU01 is your go-to for tasks that demand the parallel processing might of graphical processing units.                                                                                        |
| Builder | iribhm-builder.hpda.ulb.ac.be | Dedicated to the construction of containers (a topic well delve into [here](start/singularity)), the Builder server plays a crucial role in crafting environments tailored to your specific needs. Accessible via command line only. |



### **Jupyter Lab Interface**
Just paste the link provided above in your browser and connect with your ulb credentials.
<!-- tabs:end -->

## Working together on Hyperion
As explained above each of the five virtual machines were designed with specific purposes in mind. The builder is not meant to run code. The GPU machines can run CPU tasks but priority should be given to GPU tasks on those VMs.
For resource intensive jobs, remember to use the  `nice` command to lower the priority of your process. This will allow others to connect to the server and use some of its resources. If you forgot to do so, you can still use the `renice`

Most resource intensive functions come with arguments to explicitly specify the number of threads and memory space you want to use. In addition to using those arguments properly, there are also langage-specific ways to avoid excessive resource usage.
For Python you can use this code at the beginning of your scripts : 
```python
import os

os.environ["OMP_NUM_THREADS"] = "10" # export OMP_NUM_THREADS=4
os.environ["OPENBLAS_NUM_THREADS"] = "10" # export OPENBLAS_NUM_THREADS=4
os.environ["MKL_NUM_THREADS"] = "10" # export MKL_NUM_THREADS=4
os.environ["VECLIB_MAXIMUM_THREADS"] = "10" # export VECLIB_MAXIMUM_THREADS=4
os.environ["NUMEXPR_NUM_THREADS"] = "10" # export NUMEXPR_NUM_THREADS=4
```

For R you can add the `unix` package to your containers and use to `rlimit_as` and `rlimit_nproc` functions with the `cur` argument. Those will interupt a function if gets too greedy without killing the whole process.


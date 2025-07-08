# Server rules

- **Do not use `du` on multi-terabyte directories like `/mnt/iribhm`.** This command looks at every individual file, which is fine for up to hundreds of gigabytes, but clogs up computational resources hugely on bigger directories. It could crash the server.
- **Regularly shut down jupyter notebooks.** When you close your browser after running a notebook on jupyterlab, the notebook is still running in the background. Go to the "Running terminals and kernels" tab (round symbol left side), and click "Shut down all".
- **Be considerate of others when running resource intensive scripts**. Set resource limits (RAM, amount of cores, etc.) if you run a large process. Consider if your job needs GPUs or not, and if so, check which GPU server is the least busy.
- **When building containers, don't leave behind large files**. Build all your containers in `/tmp`, which is regularly wiped. Then only store .def files under `/opt/common` and move .sif files over to one of the production VMs (see singularity guide).
- **TODO: GDPR compliance**
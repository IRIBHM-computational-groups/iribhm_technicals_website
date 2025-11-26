# Large language models in our lab

## L33t retreat 2025-11-26

### Openrouter.ai
Vincent and Maxime decided to trial openrouter.ai, which means:
* Access to all SOTA LLMs, VLLM, T2I, etc. and smaller/cheaper models​
* Access via chat or API​
* Individual credit/billing, 50EUR in API, not on chat (BE CAREFUL)​
* Cost control: credit is finite, you can see the cost of each query​
* Not that you have to use it, I use free ChatGPT for simple queries…​

Questions for a next l33t r3tr43t:​
* Does it help? How? What are the best models/use cases?​
* Is it financially viable? Can costs be reduced, capacity augmented?

Openrouter.ai is an AI provider integrator, ​
* It cannot not guaranty confidentiality of providers​
* It adds a layer of vulnerability (if any provider is private)​
* You cannot assume your interaction with non-local LLMs is private​

That means, DO NOT LEAK​
* Private/protected patient data <- ZERO-RISK STANCE HERE​
* Key code and ideas

### Running LLMs locally
* Most models can be fetched directly from huggingface.co, keep an eye on r/LocalLLaMA​
* The biggest bottleneck for running models locally is vRAM​
* Hence you should aim at looking for compressed models (format .gguf) which are compressed weights (weights learned from neural nets can be represented in different ways)​
* Big quantization team for .ggufs is unsloth (very active on r/Locallama and on huggingface)​
* There is an option on huggingface to add your configuration and it will automatically give you a compute estimate from which you can find the right model ​
* Best use case : you are working in a train and the 4g keeps coming off (OLLama, llama.cpp, …)

### Working with Claude
* Three models : Haiku, Sonnet and Opus with a daily/weekly cap​
* Opus consumes a lot [and was the best for months], but currently Sonnet 4.5 is better, faster and consumes less; suspicions of Opus release soon​
* Haiku is great for very small task and fast : I use it for plots / small snippets. ​
* Any of three can be activated with « Thinking » mode; which tends to produce better results​
* By default style is « normal » : the model is more verbose => more output tokens use => inflates your usage; switch whenever possible to « concise » style.​
* Some stuff I’ve observed for plotting, e.g., Claude always defaults to patchwork or pheatmap for heatmaps; I use more cowplot and ComplexHeatmap; so this is usually an imperative I give in my prompt to avoid re-prompting.​
* Vibe coding only really works if you know how to debug your code. 

### ULB resources
The ULB currently recommend the usage of their cloud instance of copilot. [More information here](https://portail.ulb.be/fr/enseignement/creer-et-innover-dans-un-enseignement/utiliser-le-numerique/outils-dintelligence-artificielle-generative-accessibles-a-la-communaute-universitaire)
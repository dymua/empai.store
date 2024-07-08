#   Реалізації роботи з Асистентом
Назва асистента та посилання

> [!NOTE]
> Гілки реалізацій доступні за адресою https://empai.store/assistants/DIR/SUBDIR/FILES



Варіанти реалізації чату з Асистентом

## chat-app - простий JS чат
простий приклад чату без асистента.

🗂 Код [/chat-app](chat-app)

🌐 Демонстрація [https://empai.store/assistants/chat-app/index.html](https://empai.store/assistants/chat-app/index.html)



## cfw - CloudFlare Workers
чат на базі коду  [CloudFlare Workers](https://workers.cloudflare.com)

🗂 Код 
- [openai](cfw/openai)
- [empai](cfw/empai) 

🌐 Демонстрація 
- ❌ [openai](https://empai.store/assistants/cfw/openai/index.html)
- ❌ [empai](https://empai.store/assistants/cfw/empai/index.html)



## jschat - JS чат
чат на базі JS коду  

🗂 Код 
- [openai](jschat/openai)
- [empai](jschat/empai) 

🌐 Демонстрація    
- ❌ [openai](https://empai.store/assistants/jschat/openai/index.html)   
- ❌ [empai](https://empai.store/assistants/jschat/empai/index.html)



## n8n - N8N.empai.store
чат на базі [Chat Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)  сервіса [N8N empAI Store](https://n8n.empai.store/)

🗂 Код 
- [openai](n8n/openai)
- [empai](n8n/empai)

🌐 Демонстрація  
- [openai](https://empai.store/assistants/n8n/openai/index.html)   
- ❌ [empai](https://empai.store/assistants/n8n/empai/index.html)



## bubble -  сервіс bubble.io
реалізація чату на сервісі [bubble](https://bubble.io/)

🗂 Код [openai](n8n/bubble)

🌐 Демонстрація 
- ❌ [openai](https://empai.store/assistants/bubble/openai.html)
- ❌ [cfwai](https://empai.store/assistants/bubble/cfwai.html)
- ❌ [empai](https://empai.store/assistants/bubble/empai.html)


> [!NOTE]
> Перелік реалізацій реалізацій
>  - **openia** - реалізація з підключенням напряму до API OpenAI Assistants 
>  - **empai** - реалізація з підключенням  REST APi EmpAI.store
>  - **empai** - реалізація з підключенням  REST APi EmpAI.store


## Структура директорій.
~~~ tree
├── chat-app
│   ├── index.html
│   ├── style.css
├── cfw
│   ├── openia
│   │   ├── index.html
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
│   ├── empai
│   │   ├── index.html
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
├── jschat
│   ├── openia
│   │   ├── index.html
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
│   ├── empai
│   │   ├── index.html
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
├── n8n
│   ├── openia
│   │   ├── index.html
│   │   ├── fullscreen.html
│   ├── empai
│   │   ├── index.html
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
├── bubble
│   ├── index.html
│   ├── openia.html
│   ├── empai.html

~~~

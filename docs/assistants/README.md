#   Реалізації роботи з Асистентом
Назва асистента та посилання

Ця гілка реалізацій доступна за адресою https://empai.store/assistants/DIR/SUBDIR/FILES

Варіанти реалізації чату на JS для роботи з Асистентом

## chat-app
простий приклад чату без асистента.

Код [/chat-app](chat-app)

Перегляд [https://empai.store/assistants/chat-app/index.html](https://empai.store/assistants/chat-app/index.html)


## cfw
чат на базі коду  [CloudFlare Workers](https://workers.cloudflare.com)

Код [openai](cfw/openai) [empai](cfw/empai) Перегляд [openai](https://empai.store/assistants/cfw/openai/index.html) [empai](https://empai.store/assistants/cfw/empai/index.html)


## jschat
чат на базі JS коду  

Код [openai](jschat/openai) [empai](jschat/empai) Перегляд [openai](https://empai.store/assistants/jschat/openai/index.html) [empai](https://empai.store/assistants/jschat/empai/index.html)


## n8n
чат на базі [Chat Trigger]([Chat Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/))  сервіса [N8N empAI Store](https://n8n.empai.store/)

Код [openai](n8n/openai) [empai](n8n/empai) Перегляд [openai](https://empai.store/assistants/n8n/openai/index.html) [empai](https://empai.store/assistants/n8n/empai/index.html)


## bubble
реалізація чату на сервісі [bubble](https://bubble.io/)

Код [openai](n8n/bubble) [empai](n8n/bubble) Перегляд [openai](https://empai.store/assistants/bubble/openai.html) [empai](https://empai.store/assistants/bubble.html)

використання реалізацій
**openia** - реалізація з підключенням напряму до API OpenAI Assistants 
**empai** - реалізація з підключенням  REST APi EmpAI.store

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
│   │   ├── chat
│   │   │   ├── code.js
│   │   │   ├── style.css
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

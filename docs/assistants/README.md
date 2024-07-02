#   Реалізації роботи з Асистентом
Назва асистента та посилання

Ця гілка реалізацій доступна за адресою https://empai.store/assistants/DIR/SUBDIR/FILES

Варіанти реалізації чату на JS для роботи з Асистентом

### chat-app
простий приклад чату без асистента.

Код [/chat-app](chat-app)

Перегляд [https://empai.store/assistants/chat-app/index.html](https://empai.store/assistants/chat-app/index.html)


/**cfw** - чат на базі коду  [CloudFlare Workers](https://workers.cloudflare.com)

/**jschat** - чат на базі JS коду  

/**n8n** -- чат на базі [Chat Trigger]([Chat Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/))  сервіса [N8N empAI Store](https://n8n.empai.store/)

/**bubble** - реалізація чату на сервісі [bubble](https://bubble.io/)

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

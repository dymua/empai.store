Посилання на вебсторінку спілкування із ассистентом: 
  https://ciso-assistant-empai.netlify.app/
Або запуск index.html із поточної директорії web

В акаунті cloudflare, у вкладці  Workers&Pages треба створити:
1. Settings/Variables/Environment Variables - apiKey (ключ OpenAI) та  assistant_id (ідентифікатор асистента);
2. Workers&Pages/create/worker.js;
3. В index.html у функції generateResponse запит fetch('https://ciso-assistant.qbb44z7whg.workers.dev/') повинен відправлятись на створений воркер(url можна взяти у вкладці 'Edit Code' воркера)

worker.js
    /**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


async function getRunMessages(thread_id, headers) {
    let answer=""
    await fetch(`https://api.openai.com/v1/threads/${thread_id}/messages`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data_messages => {
            const messages = data_messages.data
            answer = messages[0]?.content[0]?.text?.value;

        }).catch(error => console.log(error));
    return answer
}

async function listenRunComplete(thread_id, run_id, headers) {
    let answer_complete = '';

    while (true) {
        await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(async (data_run_thread) => {
            console.log("data_run_thread status>>> ", data_run_thread.status);
            if (data_run_thread.status === 'completed') {
                console.log("data_run_thread completed --> ", data_run_thread);
                answer_complete = await getRunMessages(thread_id, headers);
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }).catch(error => {console.log(error)});

        if (answer_complete) break;
    }
    
    return answer_complete;
}

export default {
  async fetch(request, env, ctx) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.apiKey}`,
        'OpenAI-Beta': 'assistants=v2',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }
    const query=await request.json()
    console.log("QUERY ===> ",query)
    let data_response=""
    await fetch('https://api.openai.com/v1/threads/runs', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            "assistant_id": env.assistant_id,
                            "thread": {
                                "messages": [{
                                    "role": "user",
                                    "content": query.prompt
                                }]
                            }
                        })
                    })
                    .then(response => {
                        console.log('status --->', response.status);
                        if (response.status === 200) return response.json()
                        throw response
                    })
                    .then(async data_run => {
                        console.log("DATA_RUN ---> ", data_run)
                        const thread_id = data_run.thread_id
                        const run_id = data_run.id
                        const answer = await listenRunComplete(thread_id, run_id, headers)
                        if (answer!=='')data_response = answer
                    })
                    .catch(error => console.log(error));
                    // .catch(error => showError(error));
    console.log("data_response ---> ", data_response)

    return new Response(JSON.stringify({"answer":data_response}),{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
  },
};
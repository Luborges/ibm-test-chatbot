const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

class ChatbotController {
    async send (req, res) {
        const assistantId = process.env.ASSISTANT_ID;
        const assistant = createAssistant();
        let session_id = req.session && req.session.session_id;

        if (!session_id) {
            session_id = await createSession(req);
        }

        const response = await assistant.message({
            assistantId: assistantId,
            sessionId: session_id,
            input: {
              'message_type': 'text',
              'text': req.body.message,
              }
            })
            .then(res => {
                return {
                    response: res.result.output.generic,
                    intent: res.result.output.intents[0] ? res.result.output.intents[0].intent : 'General_Greetings',
                }
            })
            .catch(err => {
              console.log(err);
        });

        return res.send( response );
    }
}

module.exports = ChatbotController;

const createAssistant = () => {
    const assistant = new AssistantV2({
        version: process.env.CHATBOT_VERSION,
        authenticator: new IamAuthenticator({
          apikey: process.env.CHATBOT_API_KEY,
        }),
        url: process.env.CHATBOT_URL,
      });

    return assistant;
}

const createSession = async (req) => {
    const assistant = createAssistant();
    const assistantId = process.env.ASSISTANT_ID;

    const sessionId = await assistant.createSession({
        assistantId,
    })
    .then (res => {
        return res.result.session_id;
    })        
    .catch(err => {
        console.log(err);
    });

    req.session.session_id = sessionId;
    return sessionId;
}
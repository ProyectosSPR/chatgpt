const fs = require('fs');
const axios = require('axios');

const OPENAI_API_KEY = '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'; // Reemplaza con tu propia clave de API

async function chatWithGPT3(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: message,
      max_tokens: 50, // Ajusta el número de tokens máximos según tus necesidades
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error al comunicarse con la API de OpenAI:', error.message);
    return 'Lo siento, no puedo responder en este momento.';
  }
}

// Función para obtener la conversación desde un archivo JSON
function getConversation() {
  try {
    const conversationData = fs.readFileSync('conversacion.json');
    return JSON.parse(conversationData);
  } catch (error) {
    console.error('Error al leer la conversación:', error.message);
    return [];
  }
}

// Función para guardar la conversación en un archivo JSON
function saveConversation(conversation) {
  try {
    fs.writeFileSync('conversacion.json', JSON.stringify(conversation, null, 2));
  } catch (error) {
    console.error('Error al guardar la conversación:', error.message);
  }
}

// Ejemplo de uso:
async function chat() {
  let conversation = getConversation();
  const userMessage = 'Usuario: de que estamos hablando';
  conversation.push(userMessage);

  const chatbotResponse = await chatWithGPT3(conversation.join('\n'));

  conversation.push('Chatbot: ' + chatbotResponse);
  saveConversation(conversation);

  // Imprimir la conversación completa
  console.log(conversation.join('\n'));
}

chat();

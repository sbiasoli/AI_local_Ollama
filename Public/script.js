document.getElementById('iaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const pergunta = document.getElementById('pergunta').value;
    console.log("Pergunta enviada:", pergunta);
    
    // Exibir pergunta no chat-box
    const chatBox = document.getElementById('chat-box');
    const userDiv = document.createElement('div');
    userDiv.classList.add('message', 'user-message');
    userDiv.textContent = pergunta;
    chatBox.appendChild(userDiv);
    
    // Mostrar o indicador de carregamento
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');

    try {
        const response = await fetch('/ia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: pergunta })
        });
        
        const data = await response.text();
        console.log("Resposta recebida:", data);
        
        // Exibir resposta no chat-box
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('message', 'ai-message');
        aiDiv.innerHTML = data; // Usar innerHTML para permitir formatação
        chatBox.appendChild(aiDiv);
        
        // Limpar o campo de entrada
        document.getElementById('pergunta').value = '';
        
        // Scroll para o fim
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Erro:', error);
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('message', 'ai-message');
        errorDiv.textContent = `Erro: ${error}`;
        chatBox.appendChild(errorDiv);
    } finally {
        // Esconder o indicador de carregamento
        loading.classList.add('hidden');
    }
});

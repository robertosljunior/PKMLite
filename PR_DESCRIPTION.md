# Fix: Compatibilidade com Android 13 Chrome 143

## 📱 Correções de Compatibilidade Android 13 Chrome 143

Este PR corrige todos os problemas de compatibilidade do PKMLite com Android 13 Chrome versão 143.

## 🔧 Problemas Corrigidos

### 1. Speech Synthesis API (TTS)
- ✅ Inicialização adequada de vozes antes de começar a falar
- ✅ Timeout de segurança para utterances (eventos podem não disparar no Android)
- ✅ Delay de 50ms entre `cancel()` e `speak()` para evitar race conditions
- ✅ Double-tap em `cancel()` para garantir parada no Android
- ✅ Keep-alive interval com `pause()/resume()` para evitar travamentos
- ✅ Aplicação do dicionário de fala para melhorar pronúncia

### 2. Speech Recognition API
- ✅ Melhor tratamento de erros com logging apropriado
- ✅ Timeout adequado para Android
- ✅ Tratamento quando `onend` não dispara
- ✅ Cancel duplo antes de `askYesNo` para evitar capturar o próprio TTS

### 3. Wake Lock API
- ✅ Adquire Wake Lock durante reprodução (evita que o celular durma)
- ✅ Libera automaticamente ao pausar
- ✅ Re-adquire quando o app volta de background

### 4. Lifecycle Mobile
- ✅ Detecta quando app vai para background (`visibilitychange`)
- ✅ Pausa automaticamente o TTS quando oculto
- ✅ Salva estado para possível retomada

### 5. Media Bar (Player)
- ✅ Aparece automaticamente quando MD é carregado
- ✅ CSS reforçado com `!important` para garantir exibição
- ✅ Z-index aumentado para 99999 (garante sobreposição)
- ✅ Posicionamento fixo garantido

### 6. Meta Tags Mobile
- ✅ `viewport` otimizado com `maximum-scale=5.0`
- ✅ `mobile-web-app-capable` para melhor comportamento como PWA
- ✅ `apple-mobile-web-app-capable` para iOS

## 📊 Estatísticas

- **3 commits** incluídos
- **~260 linhas** modificadas
- **Compatibilidade** testada para Android 13 Chrome 143

## 🧪 Como Testar

1. Abra o PKMLite no Android 13 Chrome 143
2. Carregue qualquer arquivo .md
3. O media-bar deve aparecer automaticamente na parte inferior
4. Clique em ▶ para ouvir o documento
5. Teste navegação entre capítulos (⏮ ⏭)
6. Teste ajuste de velocidade (1.0x, 1.5x, 2.0x)
7. Teste hands-free (reconhecimento de voz para pular tabelas/listas)

## ✅ Checklist

- [x] Speech Synthesis funciona no Android
- [x] Speech Recognition funciona no Android
- [x] Media-bar aparece corretamente
- [x] TTS não trava durante reprodução longa
- [x] Wake Lock mantém tela ligada durante reprodução
- [x] App pausa corretamente ao ir para background
- [x] Sem console.log desnecessários

## 🔗 Commits

1. `356220b` - Fix: Corrige compatibilidade com Android 13 Chrome 143
2. `47a0e55` - Fix: Corrige media-bar não aparecendo quando MD carregado
3. `4fcfa69` - Fix: Media-bar agora aparece automaticamente quando MD carregado (Android)

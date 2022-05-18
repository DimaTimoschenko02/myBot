const TelegramApi = require('node-telegram-bot-api') 

const token = '5310197247:AAHybYrrOzlHWaedUWF6tVvW9ykbxETEewE'
const bot = new TelegramApi(token , {polling: true})
const chats = {}
const  {gameOptions , startNewGame} = require('./options') 
bot.setMyCommands([
    {command: '/start' , description: 'че то есть'},
    {command: '/info' , description: 'че надо'},
    {command: '/game' , description: 'game'}
])
async function startGame(chatId){
    
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId , 'lets play a game' , gameOptions)
}

bot.on('message' , async data =>{
    const chatId = data.chat.id
    const mes = data.text
    console.log(mes)
    if(mes ==='/start'){
       return await bot.sendMessage(chatId , 'chel zdarova')
    }
    if(mes === '/info'){
       return await bot.sendMessage(chatId , 'пока сосем')
    }
    if(mes === '/game'){
        return startGame(chatId , gameOptions)
    }
    return bot.sendMessage(chatId , 'а вот щас не понял')
    //bot.sendMessage(chatId , 'пока сосем')
})
bot.on('callback_query', async mes => {
    const chatId = mes.message.chat.id
    const data = mes.data
    console.log(mes)
    if(data === '/again'){
        return startGame(chatId)
    }
    if(mes.data == chats[chatId]){

        return await bot.sendMessage(chatId , 'угадал лошара' , startNewGame)
    }
    else{
        await bot.sendMessage(chatId , `не угадал лошара, цирфа блыоа ${chats[chatId]}` , startNewGame)
    }
    
    
})

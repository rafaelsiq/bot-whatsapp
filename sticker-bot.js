const fs = require('fs')
const venom = require('venom-bot')

venom.create().then(client => {
	client.onMessage(async message => {
		if (message.type != 'chat') {
			if (message.chat.name == "Bruno" || message.chat.name == "Sticker Memes BR") {
				try {
					if (!['image', 'document'].includes(message.type)) throw ''
					if (!['image/jpeg', 'image/png', 'image/webp'].includes(message.mimetype)) throw ''
					if (message.size >= 5000000) throw ''
					//await client.sendText(message.from, '🕗 Aguarde um momento...')
					const id = Math.floor(1000000 + Math.random() * 1000000)
					const buffer = await client.decryptFile(message)
						.catch(err => { console.log(err); throw '' })
					const filename = `./tempImage${id}.${message.mimetype.split('/')[1]}`
					fs.writeFileSync(filename, buffer)
					await client.sendImageAsSticker(message.from, filename)
						.catch(err => { console.log(err); throw '' })
					fs.unlinkSync(filename)

				} catch (err) {
					await client.sendText(message.from, err)
				}
			}
		}//else{
		//await client.sendText(message.from, (" "+ ))
		//}
	})
})
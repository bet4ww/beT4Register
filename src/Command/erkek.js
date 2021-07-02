const { dc, MessageEmbed, User } = require('discord.js');
const db = require('quick.db');
const Settings = require('../Settings/Config.json');

exports.beta = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.Registerer)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

const sıra = await db.fetch('case')
const reglog = message.guild.channels.cache.find(r => r.id === (Settings.Channels.RegisterLog))
const tag = Settings.ServerSettings.Tag;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let uyarıembed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setColor(Settings.Colors.Red)
  if (!user) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişiyi etiketlemelisin.")).then(x => x.delete({ timeout: 4000 }));
  if (!isim) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin ismini yazmalısın.")).then(x => x.delete({ timeout: 4000 }));
  if (!yaş) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin yaşını yazmalısın.")).then(x => x.delete({ timeout: 4000 }));

user.setNickname(`${tag} ${isim} | ${yaş}`)
user.roles.add(Settings.Roles.BoyRole1)
user.roles.add(Settings.Roles.BoyRole2)
user.roles.remove(Settings.Roles.Unregister)
db.add(`sayı.${user.id}`, +1)
await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yaş,
    Rol: Settings.Roles.BoyRole1
  });

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)

  let embed = new MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true}))
  .setDescription(`${user} Adlı kişi ${message.author} tarafından <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}> Rolü verilerek kayıt edildi. \n  Kişinin yeni ismi: \`${isim}\` | \`${yaş}\``)
message.channel.send(embed);

const log = new MessageEmbed()
.setAuthor(message.member.nickname, message.author.avatarURL())
.setColor('BLUE')
.setTitle("KAYIT [ERKEK]")
.setDescription(`• Yetkili: ${message.author} (\`${message.author.id}\`) \n • Kullanıcı: ${user}(\`${user.id}\`) \n • Verilen Roller: <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}>`)
await reglog.send(log)

    db.push(`isim.${user.id}`, {
        userID: user.id,
        isimleri: isim,
        role: `<@&${Settings.Roles.BoyRole1}>`,
        teyitciid: message.author.id,
        teyitcisim: message.author.username
    })
};

module.exports.config = { 
    name: 'erkek',  
    aliases: ['e','man']
};

module.exports.config = { 
  name: 'erkek',
  aliases: ['erkek', 'e', 'man']
};
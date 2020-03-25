require("dotenv").config();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const axios = require('axios');
const jsonToTable = require('json-to-markdown-table');

const client = new Discord.Client();

const countryCodes = {
  "countries":
    [
      { "id": 278, "name": "USA", "acronym": "US" },
      { "id": 279, "name": "Iran", "acronym": "IR" }, { "id": 280, "name": "S. Korea", "acronym": "KR" }, { "id": 281, "name": "UK", "acronym": "GB" }, { "id": 282, "name": "Czechia", "acronym": "CZ" }, { "id": 283, "name": "Saudi Arabia", "acronym": "SA" }, { "id": 284, "name": "Russia", "acronym": "RU" }, { "id": 285, "name": "Hong Kong", "acronym": "HK" }, { "id": 286, "name": "South Africa", "acronym": "ZA" }, { "id": 287, "name": "San Marino", "acronym": "SM" }, { "id": 288, "name": "UAE", "acronym": "AE" }, { "id": 289, "name": "Costa Rica", "acronym": "CR" }, { "id": 290, "name": "Dominican Republic", "acronym": "DO" }, { "id": 291, "name": "Vietnam", "acronym": "VN" }, { "id": 292, "name": "Bosnia and Herzegovina", "acronym": "BA" }, { "id": 293, "name": "Faeroe Islands", "acronym": "FO" }, { "id": 294, "name": "North Macedonia", "acronym": "MK" }, { "id": 295, "name": "Brunei", "acronym": "BN" }, { "id": 296, "name": "Moldova", "acronym": "MD" }, { "id": 297, "name": "Sri Lanka", "acronym": "LK" }, { "id": 298, "name": "Venezuela", "acronym": "VE" }, { "id": 299, "name": "Burkina Faso", "acronym": "BF" }, { "id": 300, "name": "Palestine", "acronym": "PS" }, { "id": 301, "name": "New Zealand", "acronym": "NZ" }, { "id": 302, "name": "Trinidad and Tobago", "acronym": "TT" }, { "id": 303, "name": "Réunion", "acronym": "RE" }, { "id": 304, "name": "DRC", "acronym": "CD" }, { "id": 305, "name": "Puerto Rico", "acronym": "PR" }, { "id": 306, "name": "Bolivia", "acronym": "BO" }, { "id": 307, "name": "French Guiana", "acronym": "GF" }, { "id": 308, "name": "French Polynesia", "acronym": "PF" }, { "id": 309, "name": "Ivory Coast", "acronym": "CI" }, { "id": 310, "name": "Equatorial Guinea", "acronym": "GQ" }, { "id": 311, "name": "Tanzania", "acronym": "TZ" }, { "id": 312, "name": "U.S. Virgin Islands", "acronym": "VI" }, { "id": 313, "name": "Saint Martin", "acronym": "MF" }, { "id": 314, "name": "New Caledonia", "acronym": "NC" }, { "id": 315, "name": "Cayman Islands", "acronym": "KY" }, { "id": 316, "name": "Curaçao", "acronym": "CW" }, { "id": 317, "name": "Cabo Verde", "acronym": "CV" }, { "id": 318, "name": "CAR", "acronym": "CF" }, { "id": 319, "name": "El Salvador", "acronym": "SV" }, { "id": 320, "name": "St. Barth", "acronym": "BL" }, { "id": 321, "name": "Isle of Man", "acronym": "IM" }, { "id": 322, "name": "Saint Lucia", "acronym": "LC" }, { "id": 323, "name": "Antigua and Barbuda", "acronym": "AG" }, { "id": 324, "name": "Vatican City", "acronym": "VA" }, { "id": 325, "name": "Papua New Guinea", "acronym": "PG" }, { "id": 326, "name": "St. Vincent Grenadines", "acronym": "VC" }, { "id": 327, "name": "Sint Maarten", "acronym": "SX" }, { "id": 328, "name": "Eswatini", "acronym": "SZ" }, { "id": 140, "name": "China", "acronym": "CN" }, { "id": 141, "name": "Italy", "acronym": "IT" }, { "id": 142, "name": "Spain", "acronym": "ES" }, { "id": 143, "name": "Germany", "acronym": "DE" }, { "id": 144, "name": "France", "acronym": "FR" }, { "id": 145, "name": "Switzerland", "acronym": "CH" }, { "id": 146, "name": "Netherlands", "acronym": "NL" }, { "id": 147, "name": "Austria", "acronym": "AT" }, { "id": 148, "name": "Belgium", "acronym": "BE" }, { "id": 149, "name": "Norway", "acronym": "NO" }, { "id": 150, "name": "Sweden", "acronym": "SE" }, { "id": 151, "name": "Canada", "acronym": "CA" }, { "id": 152, "name": "Denmark", "acronym": "DK" }, { "id": 153, "name": "Portugal", "acronym": "PT" }, { "id": 154, "name": "Malaysia", "acronym": "MY" }, { "id": 155, "name": "Brazil", "acronym": "BR" }, { "id": 156, "name": "Australia", "acronym": "AU" }, { "id": 157, "name": "Japan", "acronym": "JP" }, { "id": 158, "name": "Turkey", "acronym": "TR" }, { "id": 159, "name": "Israel", "acronym": "IL" }, { "id": 160, "name": "Ireland", "acronym": "IE" }, { "id": 161, "name": "Diamond Princess", "acronym": "DP" }, { "id": 162, "name": "Luxembourg", "acronym": "LU" }, { "id": 163, "name": "Pakistan", "acronym": "PK" }, { "id": 164, "name": "Chile", "acronym": "CL" }, { "id": 165, "name": "Poland", "acronym": "PL" }, { "id": 166, "name": "Ecuador", "acronym": "EC" }, { "id": 167, "name": "Greece", "acronym": "GR" }, { "id": 168, "name": "Finland", "acronym": "FI" }, { "id": 169, "name": "Qatar", "acronym": "QA" }, { "id": 170, "name": "Iceland", "acronym": "IS" }, { "id": 171, "name": "Indonesia", "acronym": "ID" }, { "id": 172, "name": "Singapore", "acronym": "SG" }, { "id": 173, "name": "Thailand", "acronym": "TH" }, { "id": 174, "name": "Slovenia", "acronym": "SI" }, { "id": 175, "name": "Romania", "acronym": "RO" }, { "id": 176, "name": "India", "acronym": "IN" }, { "id": 177, "name": "Peru", "acronym": "PE" }, { "id": 178, "name": "Bahrain", "acronym": "BH" }, { "id": 179, "name": "Philippines", "acronym": "PH" }, { "id": 180, "name": "Estonia", "acronym": "EE" }, { "id": 181, "name": "Egypt", "acronym": "EG" }, { "id": 182, "name": "Lebanon", "acronym": "LB" }, { "id": 183, "name": "Iraq", "acronym": "IQ" }, { "id": 184, "name": "Croatia", "acronym": "HR" }, { "id": 185, "name": "Mexico", "acronym": "MX" }, { "id": 186, "name": "Panama", "acronym": "PA" }, { "id": 187, "name": "Colombia", "acronym": "CO" }, { "id": 188, "name": "Slovakia", "acronym": "SK" }, { "id": 189, "name": "Kuwait", "acronym": "KW" }, { "id": 190, "name": "Serbia", "acronym": "RS" }, { "id": 191, "name": "Bulgaria", "acronym": "BG" }, { "id": 192, "name": "Armenia", "acronym": "AM" }, { "id": 193, "name": "Argentina", "acronym": "AR" }, { "id": 194, "name": "Taiwan", "acronym": "TW" }, { "id": 195, "name": "Algeria", "acronym": "DZ" }, { "id": 196, "name": "Latvia", "acronym": "LV" }, { "id": 197, "name": "Uruguay", "acronym": "UY" }, { "id": 198, "name": "Hungary", "acronym": "HU" }, { "id": 199, "name": "Jordan", "acronym": "JO" }, { "id": 200, "name": "Lithuania", "acronym": "LT" }, { "id": 201, "name": "Morocco", "acronym": "MA" }, { "id": 202, "name": "Andorra", "acronym": "AD" }, { "id": 203, "name": "Cyprus", "acronym": "CY" }, { "id": 204, "name": "Albania", "acronym": "AL" }, { "id": 205, "name": "Belarus", "acronym": "BY" }, { "id": 206, "name": "Malta", "acronym": "MT" }, { "id": 207, "name": "Tunisia", "acronym": "TN" }, { "id": 208, "name": "Guadeloupe", "acronym": "GP" }, { "id": 209, "name": "Senegal", "acronym": "SN" }, { "id": 210, "name": "Kazakhstan", "acronym": "KZ" }, { "id": 211, "name": "Azerbaijan", "acronym": "AZ" }, { "id": 212, "name": "Cambodia", "acronym": "KH" }, { "id": 213, "name": "Oman", "acronym": "OM" }, { "id": 214, "name": "Georgia", "acronym": "GE" }, { "id": 215, "name": "Ukraine", "acronym": "UA" }, { "id": 216, "name": "Uzbekistan", "acronym": "UZ" }, { "id": 217, "name": "Cameroon", "acronym": "CM" }, { "id": 218, "name": "Martinique", "acronym": "MQ" }, { "id": 219, "name": "Liechtenstein", "acronym": "LI" }, { "id": 220, "name": "Channel Islands", "acronym": "GB-CI" }, { "id": 221, "name": "Bangladesh", "acronym": "BD" }, { "id": 222, "name": "Afghanistan", "acronym": "AF" }, { "id": 223, "name": "Honduras", "acronym": "HN" }, { "id": 224, "name": "Nigeria", "acronym": "NG" }, { "id": 225, "name": "Cuba", "acronym": "CU" }, { "id": 226, "name": "Ghana", "acronym": "GH" }, { "id": 227, "name": "Jamaica", "acronym": "JM" }, { "id": 228, "name": "Guyana", "acronym": "GY" }, { "id": 229, "name": "Paraguay", "acronym": "PY" }, { "id": 230, "name": "Macao", "acronym": "MO" }, { "id": 231, "name": "Monaco", "acronym": "MC" }, { "id": 232, "name": "Guatemala", "acronym": "GT" }, { "id": 233, "name": "Rwanda", "acronym": "RW" }, { "id": 234, "name": "Montenegro", "acronym": "ME" }, { "id": 235, "name": "Togo", "acronym": "TG" }, { "id": 236, "name": "Guam", "acronym": "GU" }, { "id": 237, "name": "Mauritius", "acronym": "MU" }, { "id": 238, "name": "Barbados", "acronym": "BB" }, { "id": 239, "name": "Kyrgyzstan", "acronym": "KG" }, { "id": 240, "name": "Maldives", "acronym": "MV" }, { "id": 241, "name": "Mayotte", "acronym": "YT" }, { "id": 242, "name": "Gibraltar", "acronym": "GI" }, { "id": 243, "name": "Mongolia", "acronym": "MN" }, { "id": 244, "name": "Ethiopia", "acronym": "ET" }, { "id": 245, "name": "Kenya", "acronym": "KE" }, { "id": 246, "name": "Seychelles", "acronym": "SC" }, { "id": 247, "name": "Gabon", "acronym": "GA" }, { "id": 248, "name": "Aruba", "acronym": "AW" }, { "id": 249, "name": "Suriname", "acronym": "SR" }, { "id": 250, "name": "Bahamas", "acronym": "BS" }, { "id": 251, "name": "Congo", "acronym": "CG" }, { "id": 252, "name": "Liberia", "acronym": "LR" }, { "id": 253, "name": "Madagascar", "acronym": "MG" }, { "id": 254, "name": "Namibia", "acronym": "NA" }, { "id": 255, "name": "Zimbabwe", "acronym": "ZW" }, { "id": 256, "name": "Sudan", "acronym": "SD" }, { "id": 257, "name": "Angola", "acronym": "AO" }, { "id": 258, "name": "Benin", "acronym": "BJ" }, { "id": 259, "name": "Bermuda", "acronym": "BM" }, { "id": 260, "name": "Bhutan", "acronym": "BT" }, { "id": 261, "name": "Fiji", "acronym": "FJ" }, { "id": 262, "name": "Greenland", "acronym": "GL" }, { "id": 263, "name": "Guinea", "acronym": "GN" }, { "id": 264, "name": "Haiti", "acronym": "HT" }, { "id": 265, "name": "Mauritania", "acronym": "MR" }, { "id": 266, "name": "Nicaragua", "acronym": "NI" }, { "id": 267, "name": "Zambia", "acronym": "ZM" }, { "id": 268, "name": "Nepal", "acronym": "NP" }, { "id": 269, "name": "Chad", "acronym": "TD" }, { "id": 270, "name": "Djibouti", "acronym": "DJ" }, { "id": 271, "name": "Eritrea", "acronym": "ER" }, { "id": 272, "name": "Gambia", "acronym": "GM" }, { "id": 273, "name": "Montserrat", "acronym": "MS" }, { "id": 274, "name": "Niger", "acronym": "NE" }, { "id": 275, "name": "Somalia", "acronym": "SO" }, { "id": 276, "name": "Timor-Leste", "acronym": "TL" }, { "id": 277, "name": "Uganda", "acronym": "UG" }
    ]
}

const prefix = "!";
const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}telogo`)) {
    message.channel.send("Ganda teloguinho!");
  } else if (message.content.startsWith(`${prefix}covid`)) {
    covid(message);
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}


function covid(message) {
  const args = message.content.split(" ");
  args.shift();
  let reply = '';
  const columns = [
    'Name',
    'Cases',
    'Active',
    'Deaths',
    'Recovered',
    'Critical',
    'CasesPerOneMillion'
  ];
  const obj = [];

  function requestCountry(country) {
    return axios.get('https://telog-corona-tracker.herokuapp.com/api/countries/' + country.acronym)
      .then(res => {
        const { last_record } = res.data
        console.log('last_record', last_record)
        message.channel.createMessage(
          {
            embed: {
              title: 'Covid-19 ' + country.name + ' Results',
              color: '0xff0000',
              fields: [
                { name: 'Cases', value: last_record.cases, inline: true },
                { name: 'Active', value: last_record.active, inline: true },
                { name: 'Deaths', value: last_record.deaths, inline: true },
                { name: 'Recovered', value: last_record.recovered, inline: true },
                { name: 'Critical', value: last_record.critical, inline: true },
                { name: 'Cases Per One Million', value: last_record.casesPerOneMillion, inline: true },
              ],
            }
          }
        );
        return {
          Name: country.name,
          Cases: last_record.cases,
          Active: last_record.active,
          Deaths: last_record.deaths,
          Recovered: last_record.recovered,
          Critical: last_record.critical,
          CasesPerOneMillion: last_record.casesPerOneMillion,
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function requestCountryPromise(args) {
    return new Promise(resolve => {
      args.map(c => {
        const countries = countryCodes.countries.filter(l => (l.name === c || l.acronym === c))
        if (countries.length > 0) {
          const country = countries[0]
          console.log('country', country)
          resolve(requestCountry(country))
        }
      })
    });
  }

  async function requestCountries(args) {
    return await requestCountryPromise(args)
      .then(data => {
        console.log('data', data)
        obj.push(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  requestCountries(args)
    .then(() => {
      console.log('obj', obj)

    })

    .catch(err => {
      console.log(err)
    })
  /* new Promise((resolve, reject) => {
    reply = '::: info \n Requested **Covid-19** information.';
    args.map((c, i) => {
      const countries = countryCodes.countries.filter(l => (l.name === c || l.acronym === c))
      if (countries.length > 0) {
        const country = countries[0]
        axios.get('https://telog-corona-tracker.herokuapp.com/api/countries/' + country.acronym)
          .then(res => {
            const { last_record } = res.data
            // reply = reply + `${country.name} Cases: ${last_record.cases} Active: ${last_record.active} Deaths: ${last_record.deaths} Recovered: ${last_record.recovered} Critical: ${last_record.critical} CasesPerOneMillion: ${last_record.casesPerOneMillion} \n`
            obj.push({
              'Name': country.name,
              'Cases': last_record.cases, 
              'Active': last_record.active,
              'Deaths': last_record.deaths,
              'Recovered': last_record.recovered,
              'Critical': last_record.critical,
              'CasesPerOneMillion': last_record.casesPerOneMillion,
            })
            if (i === args.length - 1)
              resolve(); // True, this is wrong, last request can be faster than others
          })
          .catch(err => {
            console.log(err)
            reject();
          })
          const table = jsonToTable(obj, columns);
          reply = reply + table;
      } else {
        reply = reply + `${c} is not a valid country! \n`
      }
    })
  }
  ).then(() => {
    reply = reply + ':::';
    message.channel.send(reply);
  }) */
  /* axios.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
    .then(res => {
      const { locations } = res.data
      const args = message.content.split(" ");
      let reply = '\`\`\`';
      args.map(c => {
        const countries = locations.filter(l => l.country === c || l.country_code === c)
        if(countries.length > 0) {
          const country = countries[0]
          reply = reply + `${country.country_code} Confirmed: ${country.latest.confirmed} ${country.country_code} Deaths: ${country.latest.deaths} ${country.country_code} Recovered: ${country.latest.recovered} \n`
        }
      })
      reply = reply + '\`\`\`';
      message.channel.send(reply);
    })
    .catch(err => console.log(err)) */

  // https://telog-corona-tracker.herokuapp.com/api/countries/GB
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(process.env.BOT_TOKEN);
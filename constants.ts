/* CONSTANTS */

// exports.skill = {
//   appId: '',
//   dynamoDBTableName: 'Audio-Player-Multi-Stream',
// };

exports.helpText = `Welcome to Family Radio, you can say,
“Open Family Radio”,
or "Ask Family Radio to Stream”,
or "Ask Family Radio to Play Through The Bible in a Year For Today”.
You can also ask Family Radio to read any chapter from the Bible.
For example, you can say "Ask Family Radio to read First Corinthians 15"`

exports.audioData = {

  /*  These are the new links I got from Stanislav
  1)Family_Radio_West AAC mount: 
  Redirect:
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_WESTAAC.aac
  PLS:
  https://playerservices.streamtheworld.com/pls/FAMILYRADIO_WESTAAC.pls
  2)Family_Radio_West MP3 mount: 
  Redirect:
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_WEST.mp3
  PLS:
  https://playerservices.streamtheworld.com/pls/FAMILYRADIO_WEST.pls
  3)Family_Radio_East AAC mount: 
  Redirect:
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_EASTAAC.aac
  PLS:
  https://playerservices.streamtheworld.com/pls/FAMILYRADIO_EASTAAC.pls
  4)Family_Radio_East MP3 mount: 
  Redirect:
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_EAST.mp3
  PLS:
  https://playerservices.streamtheworld.com/pls/FAMILYRADIO_EAST.pls

  Desktop Player
  http://player.listenlive.co/67401
  MP3 Mount URLs - ShoutCast PLS
  https://playerservices.streamtheworld.com/pls/FAMILYSTATIONS_NY.pls
  MP3 Mount URLs - ShoutCast Redirect
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYSTATIONS_NY.mp3
  AAC Mount URLs - ShoutCast PLS:
  https://playerservices.streamtheworld.com/pls/FAMILYSTATIONS_NYAAC.pls
  AAC Mount URLs - ShoutCast Redirect
  https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYSTATIONS_NYAAC.aac
  */

  // // Old links 2021
  // // eastStream: "https://16923.live.streamtheworld.com/FAMILYRADIO_EASTAAC.aac",  // Old hard link
  // // westStream: "https://14523.live.streamtheworld.com/FAMILYRADIO_WESTAAC.aac",  // Old hard link
  // eastStream: "https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_EASTAAC.aac",
  // westStream: "https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYRADIO_WESTAAC.aac",
  // // newYorkStream: "https://playerservices.streamtheworld.com/pls/FAMILYSTATIONS_NYAAC.pls", // Is pls better?
  // newYorkStream: "https://playerservices.streamtheworld.com/api/livestream-redirect/FAMILYSTATIONS_NYAAC.aac",

  // New 2022
  // The “Main Stream” is:
  //   ICY MP3: https://ais-sa3.cdnstream1.com/2712_128.mp3
  // ICY AAC: https://ais-sa3.cdnstream1.com/2712_64.aac
  // HLS MP3: https://ais-sa3.cdnstream1.com/2712_128.mp3/playlist.m3u8
  // HLS AAC: https://ais-sa3.cdnstream1.com/2712_64.aac/playlist.m3u8
  // The “West Stream” is:
  //   ICY MP3: https://ais-sa3.cdnstream1.com/2641_128.mp3
  // ICY AAC: https://ais-sa3.cdnstream1.com/2641_64.aac
  // HLS MP3: https://ais-sa3.cdnstream1.com/2641_128.mp3/playlist.m3u8
  // HLS AAC: https://ais-sa3.cdnstream1.com/2641_64.aac/playlist.m3u8
  // The “East Stream” is:
  //   ICY MP3: https://ais-sa3.cdnstream1.com/2640_128.mp3
  // ICY AAC: https://ais-sa3.cdnstream1.com/2640_64.aac
  // HLS MP3: https://ais-sa3.cdnstream1.com/2640_128.mp3/playlist.m3u8
  // HLS AAC: https://ais-sa3.cdnstream1.com/2640_64.aac/playlist.m3u8

  eastStream: "https://ais-sa3.cdnstream1.com/2640_64.aac",
  westStream: "https://ais-sa3.cdnstream1.com/2641_64.aac",

  yearBibleBase: "https://s3.amazonaws.com/ttbiay/",
  yearBibleExample: "https://s3.amazonaws.com/ttbiay/TTBIAY_04_25.mp3",
  chapterBibleBase: "https://s3.amazonaws.com/frbible/",
  chapterBibleExample: "https://s3.amazonaws.com/frbible/psalm_001.mp3"
};

exports.streamArea = [
  "east",
  "west"
]

exports.books = [
  {
    name: ["Genesis"],
    chapters: 50,
    prefix: "gen"
  },
  {
    name: ["Exodus"],
    chapters: 40,
    prefix: "exo"
  },
  {
    name: ["Leviticus"],
    chapters: 27,
    prefix: "lev"
  },
  {
    name: ["Numbers"],
    chapters: 36,
    prefix: "num"
  },
  {
    name: ["Deuteronomy"],
    chapters: 34,
    prefix: "deut"
  },
  {
    name: ["Joshua"],
    chapters: 24,
    prefix: "josh"
  },
  {
    name: ["Judges"],
    chapters: 21,
    prefix: "judg"
  },
  {
    name: ["Ruth"],
    chapters: 4,
    prefix: "ruth"
  },
  {
    name: ["1st Samuel", "First Samuel", "1 Samuel", "One Samuel"],
    chapters: 31,
    prefix: "1sam"
  },
  {
    name: ["2nd Samuel", "Second Samuel", "2 Samuel", "Two Samuel"],
    chapters: 24,
    prefix: "2sam"
  },
  {
    name: ["1st Kings", "First Kings", "1 Kings", "One Kings"],
    chapters: 22,
    prefix: "1kings"
  },
  {
    name: ["2nd Kings", "Second Kings", "2 Kings", "Two Kings"],
    chapters: 25,
    prefix: "2kings"
  },
  {
    name: ["1st Chronicles", "First Chronicles", "1 Chronicles", "One Chronicles"],
    chapters: 29,
    prefix: "1ch"
  },
  {
    name: ["2nd Chronicles", "Second Chronicles", "2 Chronicles", "Two Chronicles"],
    chapters: 36,
    prefix: "2ch"
  },
  {
    name: ["Ezra"],
    chapters: 10,
    prefix: "ezra"
  },
  {
    name: ["Nehemiah"],
    chapters: 13,
    prefix: "neh"
  },
  {
    name: ["Esther"],
    chapters: 10,
    prefix: "esther"
  },
  {
    name: ["Job"],
    chapters: 42,
    prefix: "job"
  },
  {
    name: ["Psalms", "Psalm"],
    chapters: 150,
    prefix: "psalm"
  },
  {
    name: ["Proverbs"],
    chapters: 31,
    prefix: "pro"
  },
  {
    name: ["Ecclesiastes"],
    chapters: 12,
    prefix: "eccl"
  },
  {
    name: ["Song of Solomon", "Song of Songs"],
    chapters: 8,
    prefix: "song"
  },
  {
    name: ["Isaiah"],
    chapters: 66,
    prefix: "isaiah"
  },
  {
    name: ["Jeremiah"],
    chapters: 52,
    prefix: "jere"
  },
  {
    name: ["Lamentations"],
    chapters: 5,
    prefix: "lame"
  },
  {
    name: ["Ezekiel"],
    chapters: 48,
    prefix: "eze"
  },
  {
    name: ["Daniel"],
    chapters: 12,
    prefix: "dan"
  },
  {
    name: ["Hosea"],
    chapters: 14,
    prefix: "hosea"
  },
  {
    name: ["Joel"],
    chapters: 3,
    prefix: "joel"
  },
  {
    name: ["Amos"],
    chapters: 9,
    prefix: "amos"
  },
  {
    name: ["Obadiah"],
    chapters: 1,
    prefix: "obadiah"
  },
  {
    name: ["Jonah"],
    chapters: 4,
    prefix: "jonah"
  },
  {
    name: ["Micah"],
    chapters: 7,
    prefix: "micah"
  },
  {
    name: ["Nahum"],
    chapters: 3,
    prefix: "nahum"
  },
  {
    name: ["Habakkuk"],
    chapters: 3,
    prefix: "habakkuk"
  },
  {
    name: ["Zephaniah"],
    chapters: 3,
    prefix: "zephaniah"
  },
  {
    name: ["Haggai"],
    chapters: 2,
    prefix: "haggai"
  },
  {
    name: ["Zechariah"],
    chapters: 14,
    prefix: "zechariah"
  },
  {
    name: ["Malachi"],
    chapters: 4,
    prefix: "malachi"
  },
  {
    name: ["Matthew", "Saint Matthew"],
    chapters: 28,
    prefix: "matthew"
  },
  {
    name: ["Mark", "Saint Mark"],
    chapters: 16,
    prefix: "mark"
  },
  {
    name: ["Luke", "Saint Luke"],
    chapters: 24,
    prefix: "luke"
  },
  {
    name: ["John", "Saint John"],
    chapters: 21,
    prefix: "john"
  },
  {
    name: ["Acts", "Acts of the Apostles"],
    chapters: 28,
    prefix: "acts"
  },
  {
    name: ["Romans"],
    chapters: 16,
    prefix: "rom"
  },
  {
    name: ["1st Corinthians", "First Corinthians", "1 Corinthians", "One Corinthians"],
    chapters: 16,
    prefix: "1cor"
  },
  {
    name: ["2nd Corinthians", "Second Corinthians", "2 Corinthians", "Two Corinthians"],
    chapters: 13,
    prefix: "2cor"
  },
  {
    name: ["Galatians"],
    chapters: 6,
    prefix: "gal"
  },
  {
    name: ["Ephesians"],
    chapters: 6,
    prefix: "ephs"
  },
  {
    name: ["Philippians"],
    chapters: 4,
    prefix: "philip"
  },
  {
    name: ["Colossians"],
    chapters: 4,
    prefix: "col"
  },
  {
    name: ["1st Thessalonians", "First Thessalonians", "1 Thessalonians", "One Thessalonians"],
    chapters: 5,
    prefix: "1thess"
  },
  {
    name: ["2nd Thessalonians", "Second Thessalonians", "2 Thessalonians", "Two Thessalonians"],
    chapters: 3,
    prefix: "2thess"
  },
  {
    name: ["1st Timothy", "First Timothy", "1 Timothy", "One Timothy"],
    chapters: 6,
    prefix: "1tim"
  },
  {
    name: ["2nd Timothy", "Second Timothy", "2 Timothy", "Two Timothy"],
    chapters: 4,
    prefix: "2tim"
  },
  {
    name: ["Titus"],
    chapters: 3,
    prefix: "titus"
  },
  {
    name: ["Philemon"],
    chapters: 1,
    prefix: "phil"
  },
  {
    name: ["Hebrews"],
    chapters: 13,
    prefix: "heb"
  },
  {
    name: ["James"],
    chapters: 5,
    prefix: "james"
  },
  {
    name: ["1st Peter", "First Peter", "1 Peter", "One Peter"],
    chapters: 5,
    prefix: "1peter"
  },
  {
    name: ["2nd Peter", "Second Peter", "2 Peter", "Two Peter"],
    chapters: 3,
    prefix: "2peter"
  },
  {
    name: ["1st John", "First John", "1 John", "One John"],
    chapters: 5,
    prefix: "1john"
  },
  {
    name: ["2nd John", "Second John", "2 John", "Two John"],
    chapters: 1,
    prefix: "2john"
  },
  {
    name: ["3rd John", "Third John", "3 John", "Three John"],
    chapters: 1,
    prefix: "3john"
  },
  {
    name: ["Jude"],
    chapters: 1,
    prefix: "jude"
  },
  {
    name: ["Revelation"],
    chapters: 22,
    prefix: "rev"
  }
];

exports.zones = [
  "America/Adak",
  "America/Anchorage",
  "America/Metlakatla",
  "America/Nome",
  "America/Sitka",
  "America/Yakutat",
  "America/Los_Angeles",
  "Canada/Saskatchewan",
  "America/Belize",
  "America/Regina",
  "America/Swift_Current",
  "America/Costa_Rica",
  "Pacific/Galapagos",
  "America/Guatemala",
  "America/Tegucigalpa",
  "America/Managua",
  "America/El_Salvador",
  "America/Shiprock",
  "Canada/Mountain",
  "Mexico/BajaSur",
  "US/Mountain",
  "America/Cambridge_Bay",
  "America/Edmonton",
  "America/Inuvik",
  "America/Yellowknife",
  "America/Chihuahua",
  "America/Mazatlan",
  "America/Ojinaga",
  "America/Boise",
  "America/Denver",
  "US/Arizona",
  "America/Creston",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Hermosillo",
  "America/Phoenix",
  "America/Ensenada",
  "America/Santa_Isabel",
  "Canada/Pacific",
  "Canada/Yukon",
  "Mexico/BajaNorte",
  "US/Pacific",
  "US/Pacific-New",
  "America/Dawson",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Tijuana",
  "America/Los_Angeles",
  "Pacific/Pitcairn",
  "US/Alaska",
  "America/Anchorage",
  "America/Juneau",
  "America/Metlakatla",
  "America/Nome",
  "America/Sitka",
  "America/Yakutat",
  "Pacific/Gambier",
  "America/Atka",
  "US/Aleutian",
  "America/Adak",
  "Pacific/Marquesas",
  "Pacific/Johnston",
  "US/Hawaii",
  "Pacific/Rarotonga",
  "Pacific/Tahiti",
  "Pacific/Honolulu",
  "Pacific/Samoa",
  "US/Samoa",
  "Pacific/Pago_Pago",
  "Pacific/Niue",
  "Pacific/Midway"
];

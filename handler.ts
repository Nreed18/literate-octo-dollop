import * as Ask from "ask-sdk";
import axios, { AxiosRequestConfig } from "axios";

// const db = require('./database');
import { db } from "./database";
const constants = require("./constants");
// import * as db from "./database";

// // Other fix for IntentRequest type
// interface MyHandlerInput extends Ask.HandlerInput {
//   handlerInput: {
//     requestEnvelope: {
//       request: any
//     }
//   }
// }

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle: async (handlerInput) => {
    console.info("Intent Name: LaunchIntent")
    // OLD DEFAULT TO HELP TEXT
    // return handlerInput.responseBuilder
    //   .speak(constants.helpText)
    //   // .reprompt("What would you like to play?")
    //   .withShouldEndSession(false)
    //   .getResponse()
    return await handleStreamIntent(handlerInput);
  }
};

// Play family radio stream
const StreamIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "StreamIntent"
      // && verifyValidStreamArea(handlerInput.requestEnvelope.request.intent.slots.streamArea.value) // This is why New York was not working... it was not in this list
    );
  },
  async handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    return await handleStreamIntent(handlerInput);
  }
};

// Play the 'date' bible reading
const PlayDateBibleReadingIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "PlayDateBibleReadingIntent"
      && verifyValidDate(handlerInput.requestEnvelope.request.intent.slots.Date.value)
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    try {
      let speechText = "Reading Through The Bible in a Year";
      const urlBase = constants.audioData.yearBibleBase;
      let url = constants.audioData.yearBibleExample;
      const today = todayDate();
      // console.log('today', today);
      try {
        url = `${urlBase}TTBIAY_${today}.mp3`;
        speechText = "Reading Through The Bible in a Year for today";
      } catch (e) {
        console.error(e);
      }
      const offset = 0;

      let date;
      let dateSpeak;

      if (handlerInput.requestEnvelope.request.intent.slots.Date.value && handlerInput.requestEnvelope.request.intent.slots.Date.value !== undefined) {
        const dateInput = handlerInput.requestEnvelope.request.intent.slots.Date.value;
        const dateA = dateInput.split("-");
        date = dateA[1] + "_" + dateA[2];
        dateSpeak = dateA[1] + "/" + dateA[2];

        url = `${urlBase}TTBIAY_${date}.mp3`;

        // speechText = `Reading ${date}`;
        // speechText = `Reading Through The Bible in a Year for ${date}`;
        speechText = `Reading Through The Bible in a Year for <say-as interpret-as="date" format="md">${dateSpeak}</say-as>`;
        // speechText = `<say-as interpret-as="date" format="md">${dateSpeak}</say-as>`;
        // speechText = "\<say-as interpret-as=\'date\'\>20191012\</say-as\>";
        // speechText = '<speak> <say-as interpret-as="date">20191012</say-as> </speak>  <say-as interpret-as="date">20191012</say-as>';

        // console.log("dateSpeak: ", dateSpeak);
        // console.log("speechText: ", speechText);

        // console.log("Intent: ", handlerInput.requestEnvelope.request.intent);
        // console.log("dateInput: ", dateInput);
        // console.log("Date: ", date);
      }

      // const offsetInMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds;
      // console.log('offset', offsetInMilliseconds);

      // If no date, set to today
      if (!date || date === undefined) date = today;

      return handlerInput.responseBuilder
        // .speak(speechText)
        // .withSimpleCard("Reading Through The Bible in a Year", `Reading for ${date}`)
        .addAudioPlayerPlayDirective("REPLACE_ALL", url, url, offset)
        .getResponse();
    } catch (error) {
      console.error(error);
    }
  }
};

// Read Multiple Chapter of the bible - WORK IN PROGRESS
const PlayMultipleChaptersIntentHandler = {
  canHandle(handlerInput: Ask.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "PlayMultipleChaptersIntent"
      && verifyValidBook(handlerInput.requestEnvelope.request.intent.slots.book.value)
    );
  },
  handle(handlerInput: Ask.HandlerInput) {
    // console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    console.log(handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent); // Type IntentRequest works this way

    if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
      console.log("Intent: ", handlerInput.requestEnvelope.request.intent);
      console.log("Slots: ", handlerInput.requestEnvelope.request.intent.slots);
      try {
        let speechText = "Reading Chapters";
        const urlBase = constants.audioData.chapterBibleBase;
        let url = constants.audioData.chapterBibleExample;
        const defaultBookPrefix = "mark";
        const defaultChapter = "01";
        let book: string = handlerInput.requestEnvelope.request.intent.slots.book.value;
        let chapter: number = parseInt(handlerInput.requestEnvelope.request.intent.slots.chapter.value);
        let bookPrefix: string;
        let chapterNumber;

        // clean Book And Chapter
        const res = cleanBookAndChapter(book, chapter);
        book = res.book;
        chapter = res.chapter;

        try {
          url = `${urlBase}${defaultBookPrefix}_${defaultChapter}.mp3`;
        } catch (e) {
          console.error(e);
        }

        const offset = 0;
        // console.log("Intent: ", handlerInput.requestEnvelope.request.intent);
        console.log("book: ", book);
        console.log("chapter: ", chapter);

        // // TODO:
        // const [return1, return2] = bookAndChapterToURL(book, chapter, bookPrefix, speechText);

        console.log(url);

        return (
          handlerInput.responseBuilder
            .speak(speechText)
            // .withSimpleCard("Reading Chapters", speechText)
            .addAudioPlayerPlayDirective("REPLACE_ALL", url, url, offset)
            // .addElicitSlotDirective("flavor")
            .getResponse()
        );
      } catch (error) {
        console.error("error: ", error);
      }
    }
  }
};

// Read a Chapter of the bible
const PlayChapterIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "PlayChapterIntent"
      // && verifyValidBook(handlerInput.requestEnvelope.request.intent.slots.book.value)
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    // console.log("Intent: ", handlerInput.requestEnvelope.request.intent);
    // console.log("Slots: ", handlerInput.requestEnvelope.request.intent.slots);
    try {
      let speechText = "Reading Chapter";
      const urlBase = constants.audioData.chapterBibleBase;
      let url = constants.audioData.chapterBibleExample;
      const defaultBookPrefix = "mark";
      const defaultChapter = "01";
      let book = handlerInput.requestEnvelope.request.intent.slots.book.value;
      let chapter = handlerInput.requestEnvelope.request.intent.slots.chapter.value;
      let bookPrefix;
      let chapterNumber;

      // clean Book And Chapter
      const res = cleanBookAndChapter(book, chapter);
        book = res.book;
        chapter = res.chapter;

      try {
        url = `${urlBase}${defaultBookPrefix}_${defaultChapter}.mp3`;
      } catch (e) {
        console.error(e);
      }

      const offset = 0;
      // console.log("Intent: ", handlerInput.requestEnvelope.request.intent);
      // console.log("book: ", book);
      // console.log("chapter: ", chapter);

      // Get book prefix
      try {
        if (book) {
          bookPrefix = getPrefix(book);
          // console.log("bookPrefix: ", bookPrefix);
          speechText = `Reading ${book} 1`;
          if (bookPrefix === "psalm") {
            url = `${urlBase}${bookPrefix}_001.mp3`;
          } else {
            url = `${urlBase}${bookPrefix}_01.mp3`;
          }
          // Get chapter number
          try {
            if (chapter) {
              if (verifyValidChapter(chapter, bookPrefix)) {
                chapterNumber = getChapterNumber(chapter, bookPrefix);
                speechText = `Reading ${book} ${chapter}`;
                // console.log("chapterNumber: ", chapterNumber);
                url = `${urlBase}${bookPrefix}_${chapterNumber}.mp3`;
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }

      // console.log(url);

      return (
        handlerInput.responseBuilder
          // .speak(speechText)
          // .withSimpleCard(speechText)
          .addAudioPlayerPlayDirective("REPLACE_ALL", url, url, offset)
          // .addElicitSlotDirective("flavor")
          .getResponse()
      );
    } catch (error) {
      console.error("error: ", error);
    }
  }
};

const StopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent";
    // return handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    const speechText = "Thank you for using family radio";
    return handlerInput.responseBuilder
      .speak(speechText)
      .addAudioPlayerStopDirective()
      .withShouldEndSession(true)
      .getResponse();
  }
};

const CancelIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent";
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    const speechText = "Canceled";
    return handlerInput.responseBuilder
      .speak(speechText)
      .addAudioPlayerStopDirective()
      .withShouldEndSession(true)
      .getResponse();
  }
};

// Pause current audio
const PauseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent";
    // return handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
  },
  async handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    const speechText = "Pause";
    // console.log("Pause");

    // const userId = handlerInput.context ? handlerInput.context.System.user.userId : handlerInput.session.user.userId;
    // const userId = handlerInput.requestEnvelope.session ?  handlerInput.requestEnvelope.session.user.userId : handlerInput.requestEnvelope.context.System.user.userId;

    // Get audio status: url and offset
    const audioStatus = handlerInput.requestEnvelope.context.AudioPlayer;
    const currentStream = audioStatus.token;
    let offsetInMilliseconds = handlerInput.requestEnvelope.context.AudioPlayer.offsetInMilliseconds;
    // const playerActivity = audioStatus.playerActivity;
    // console.log("audioStatus", audioStatus);
    // console.log("currentStream", currentStream);
    // console.log("offset", offsetInMilliseconds);

    // Offset to 0 if radio stream
    if (currentStream === constants.audioData.westStream 
      || currentStream === constants.audioData.eastStream
    ) {
      // console.log("stream offset reset to 0");
      offsetInMilliseconds = 0;
    }

    // // Set audioStatus in the session state
    // handlerInput.attributesManager.setSessionAttributes(audioStatus);

    // // console.log(process.env);
    // console.log('color= ', process.env.COLOR);

    try {
      // Get userId
      const userId = handlerInput.requestEnvelope.session.user.userId;
      // Store info in Database
      const query = `INSERT INTO alexaUsers (userId, lastURL, pauseOffset) VALUES ('${userId}', '${currentStream}', ${offsetInMilliseconds}) 
                    ON DUPLICATE KEY UPDATE lastURL='${currentStream}', pauseOffset=${offsetInMilliseconds};`;
      // const query = 'show tables;';
      const response = await db.query(query);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }

    console.log("returning from pause");
    return (
      handlerInput.responseBuilder
        // .speak(speechText)
        // .withSimpleCard('audioStatus', offsetInMilliseconds)
        .addAudioPlayerStopDirective()
        // .withShouldEndSession(false)
        .getResponse()
    );
  }
};

// Resume Last Audio
const ResumeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent";
  },
  async handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    const speechText = "Resume";
    // const userId = handlerInput.requestEnvelope.context ? handlerInput.requestEnvelope.context.System.user.userId : handlerInput.requestEnvelope.session.user.userId;  // use this?
    // const userId =  handlerInput.requestEnvelope.session.user.userId;
    // const url = lastPlayedURL !== '' ? lastPlayedURL : 'https://13983.live.streamtheworld.com/FAMILYRADIO_WESTAAC.aac';

    // console.log('handlerInput', handlerInput);
    // console.log('userId', userId);

    // Check if the session is new
    const newSession = handlerInput.requestEnvelope.session.new;
    // console.log("New session: ", newSession);

    // Try to resume audio
    try {
      // define variables
      let userId: String;
      let response = {};
      let timestamp;
      let url = "";
      let offset = 0;
      let data = {
        timestamp: 0,
        lastURL: "",
        pauseOffset: 0
      };

      // Get the current audioStatus  // Database way
      try {
        // Get userId
        userId = handlerInput.requestEnvelope.session.user.userId;
        // console.log("userId:  ", userId);
        // Get url and offset in Database
        const query = `SELECT timestamp, lastURL, pauseOffset from alexaUsers 
                      WHERE userId='${userId}';`;
        // const query = 'show tables;';
        response = await db.query(query);
        data = response[0];
        // console.log(data);

        // Get timestamp, url, and offset from return data
        timestamp = data.timestamp;
        url = data.lastURL;
        offset = data.pauseOffset;
        // console.log(url);
      } catch (error) {
        console.error(error);
      }

      // // Get the current audioStatus  // Session way
      // const audioStatus = handlerInput.attributesManager.getSessionAttributes();
      // console.log('Resume audioStatus: ', audioStatus);
      // const url = audioStatus.token;
      // console.log('url  ', url);
      // let offset = audioStatus.offsetInMilliseconds
      // console.log('offset  ', offset);

      // Offset to 0 if radio stream
      if (
        url === constants.audioData.westStream 
        || url === constants.audioData.eastStream
      ) {
        // console.log("stream offset reset: 0");
        offset = 0;
      }

      // Resume audio x second earlier
      const resumeRewindSeconds = 2;
      offset = offset > resumeRewindSeconds * 1000 ? offset - resumeRewindSeconds * 1000 : 0;

      // If not playing, resume audio
      // if (audioStatus.playerActivity !== 'PLAYING') {
      // }
      // console.log(audioStatus.playerActivity);
      return (
        handlerInput.responseBuilder
          // .speak(speechText)
          // .withSimpleCard(`audioStatus`, `${offset}  ${url}`)
          .addAudioPlayerPlayDirective("REPLACE_ALL", url, url, offset)
          // .withShouldEndSession(true)
          .getResponse()
      );
    } catch (error) {
      console.error(error);

      return (
        handlerInput.responseBuilder
          .speak("Could not resume audio")
          // .withShouldEndSession(true)
          .getResponse()
      );
    }
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    return (
      handlerInput.responseBuilder
        .speak(constants.helpText)
        .withSimpleCard("Help", constants.helpText)
        // .reprompt("What would you like to play?")
        .withShouldEndSession(false)
        .getResponse()
    );
  }
};

const DefaultHandler = {
  canHandle: (handlerInput) => true,
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    // console.log("Request: ", handlerInput.requestEnvelope.request);
    // console.log("Slots: ", handlerInput.requestEnvelope.request.intent.slots);
    return handlerInput.responseBuilder
      .speak("I do not understand your request.")
      .withShouldEndSession(false)
      .getResponse();
  }
};

const myErrorHandler = {
  canHandle(handlerInput, error) {
    return error.name.startsWith("AskSdk");
  },
  handle(handlerInput, error) {
    if (handlerInput.requestEnvelope.request.intent) console.info("Intent Name: ", handlerInput.requestEnvelope.request.intent.name)
    return handlerInput.responseBuilder
      .speak("An error was encountered while handling your request. Try again later")
      .withShouldEndSession(true)
      .getResponse();
  }
};

// HELPER FUNCTIONS

async function handleStreamIntent(handlerInput) {
  const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
  const accessToken = handlerInput.requestEnvelope.context.System.apiAccessToken;
  let timeZone: string; // 'America/Los_Angeles';
  // Default to east stream
  let url: string = constants.audioData.eastStream;
  let speechText: string = "Playing Family Radio Stream";
  let cardText: string = "";
  let data;

  const options: AxiosRequestConfig = {
    method: "get",
    url: `https://api.amazonalexa.com/v2/devices/${deviceId}/settings/System.timeZone`, // System.timeZone
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    data = await axios(options);
    // console.log('big response', data);
    // console.log("Time Zone: ", data.data);
    timeZone = data.data;
  } catch (error) {
    console.error(error);
  }

  const zones = constants.zones;

  // Check timezone
  try {
    for (let z of zones) {
      if (timeZone === z) {
        // If west timezone, play west stream
        url = constants.audioData.westStream;
        speechText = "Playing Family Radio Stream West";
      }
    }
    // console.log(speechText);
  } catch (error) {
    console.error(error);
  }

  // If streamArea input, stream requested area
  // Change to east/west stream on request
  try {
    if (handlerInput.requestEnvelope.request.intent?.slots?.streamArea?.value) {
      // Get east/west streamArea input
      const streamArea = handlerInput.requestEnvelope.request.intent.slots.streamArea.value;
      // console.log("streamArea= ", streamArea);
      cardText = streamArea;

      // East stream
      if (streamArea === "east") {
        url = constants.audioData.eastStream;
        speechText = "Playing Family Radio Stream East";
      }
      // West stream
      else if (streamArea === "west") {
        url = constants.audioData.westStream;
        speechText = "Playing Family Radio Stream West";
      }

      // Else invalid streamArea
      else {
        console.error("Invalid streamArea input.");
      }
    }
  } catch (error) {
    console.error(error);
  }

  return (
    handlerInput.responseBuilder
      // .speak(speechText)
      // .withSimpleCard("Time Zone", timeZone)
      // .withSimpleCard(cardText)
      .addAudioPlayerPlayDirective("REPLACE_ALL", url, url, 0)
      .getResponse()
  );
}

function todayDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let day: String;
  let month: String;
  // Add leading 0 if needed and convert to string
  day = dd < 10 ? "0" + dd.toString() : dd.toString();
  month = mm < 10 ? "0" + mm.toString() : mm.toString();

  return month + "_" + day;
}

// Verify stream area
function verifyValidStreamArea(streamArea: string) {
  // console.log('streamArea: ', streamArea);
  // If no stream area, return true
  if (streamArea === undefined) {
    return true;
  }
  // If area matches, return true
  for (const streamAreaCheck of constants.streamArea) {
    if (streamArea === streamAreaCheck) {
      return true;
    }
  }
  // Else false
  return false;
}

// Verify date input
function verifyValidDate(dateInput) {
  // console.log('dateInput: ', dateInput);
  // If no date, return true
  if (dateInput === undefined) {
    return true;
  }
  // If date is valid, return true
  // const check = /\d\d_\d\d/
  const check2 = /\d\d\d\d-\d\d-\d\d/;
  if (check2.test(dateInput)) {
    return true;
  }
  // Else false
  // console.log("verifyValidDate() returning false...")
  return false;
}

// verify Valid Chapter number
function verifyValidChapter(chapter: number, bookPrefix: string) {
  // Fast check
  if (chapter <= 0 || chapter > 150) {
    return false;
  }
  // Check book for number of chapters
  for (const book of constants.books) {
    if (bookPrefix === book.prefix) {
      if (chapter > 0 && chapter <= book.chapters) {
        return true;
      }
    }
  }
  return false;
}

// Get chapter number
function getChapterNumber(chapter: number, bookPrefix: string) {
  let outChapter = "none";
  if (bookPrefix === "psalm") {
    // Add leading 0 if needed and convert to string
    if (chapter < 10) outChapter = "00" + chapter.toString();
    else if (chapter < 100 && chapter >= 10) outChapter = "0" + chapter.toString();
    else outChapter = chapter.toString();
  } else {
    // Add leading 0 if needed and convert to string
    outChapter = chapter < 10 ? "0" + chapter.toString() : chapter.toString();
  }
  return outChapter;
}

// Check if chapter is at end of book name and remove number
function removeChapterOnBook(bookInput: string) {
  const regex = / \d+$/;
  const modifiedBookInput = bookInput.replace(regex, "");
  // console.log("Chapter Removed: ", modifiedBookInput);
  return modifiedBookInput;
}

// Check if chapter is at end of book name and get number
function getChapterOnBook(bookInput: string) {
  const regex = /\d+$/;
  const chapterNumber = bookInput.match(regex);
  // console.log("chapterNumber: ", chapterNumber);
  const outChapterNumber: number = chapterNumber ? parseInt(chapterNumber[0]) : undefined;
  return outChapterNumber;
}

// Verify valid book
function verifyValidBook(bookInput: string) {
  // console.log("original bookInput: ", bookInput);
  // Check if chapter is at end of book name and remove number
  const modifiedBookInput: string = removeChapterOnBook(bookInput);
  // console.log("modifiedBookInput: ", modifiedBookInput);

  let valid = false;
  for (const book of constants.books) {
    // console.log('bookList: ', book);
    for (const name of book.name) {
      // console.log('name: ', name);
      // console.log('modifiedBookInput: ', modifiedBookInput.toLowerCase());
      // console.log('checkMatchName: ', name.toLowerCase());
      if (modifiedBookInput.toLowerCase() === name.toLowerCase()) {
        valid = true;
        // console.log("Match: ", modifiedBookInput);
        return valid;
      }
    }
  }
  return valid;
}

// Clean Book and Chapter Input
function cleanBookAndChapter(bookInput: string, chapter: number) {
  const cleanBook = removeChapterOnBook(bookInput);
  const cleanChapter = getChapterOnBook(bookInput);
  // console.log("Chapter in book name: ", cleanChapter);
  const outChapter: number = cleanChapter ? cleanChapter : chapter;
  return  {
    book: cleanBook,
    chapter: outChapter
  };
};

// Convert book to prefix
function getPrefix(bookInput) {
  // console.log("bookInput: ", bookInput)
  let prefix = "none";
  for (const book of constants.books) {
    // console.log('book: ', book);
    for (const name of book.name) {
      // console.log('name: ', name);
      if (bookInput.toLowerCase() === name.toLowerCase()) {
        prefix = book.prefix;
        // console.log(prefix);
        return prefix;
      }
    }
  }
  return prefix;
}

// // TODO:
// // Convert text to audio url
// function bookAndChapterToURL(book: string, chapter, bookPrefix: string, speechText: string) {
//   try {
//     // Convert book to url
//     bookToURL(book, chapter, bookPrefix, speechText);
//   } catch (error) {
//     console.error(error);
//   }
//   return [1, 2];
// }

// // TODO:
// function bookToURL(book: string, chapter, bookPrefix: string, speechText: string) {
//   // Convert book to url
//   if (book) {
//     // Get book prefix
//     bookPrefix = getPrefix(book);
//     console.log("bookPrefix: ", bookPrefix);
//     speechText = `Reading ${book} 1`;
//     if (bookPrefix === "psalm") {
//       url = `${urlBase}${bookPrefix}_001.mp3`;
//     } else {
//       url = `${urlBase}${bookPrefix}_01.mp3`;
//     }
//     // Get chapter number
//     try {
//       if (chapter) {
//         if (verifyValidChapter(chapter, bookPrefix)) {
//           chapterNumber = getChapterNumber(chapter, bookPrefix);
//           speechText = `Reading ${book} ${chapter}`;
//           console.log("chapterNumber: ", chapterNumber);
//           url = `${urlBase}${bookPrefix}_${chapterNumber}.mp3`;
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// Export lambda handlers
export const alexa = Ask.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StreamIntentHandler,
    PlayDateBibleReadingIntentHandler,
    PlayMultipleChaptersIntentHandler,
    PlayChapterIntentHandler,
    StopIntentHandler,
    CancelIntentHandler,
    PauseIntentHandler,
    ResumeIntentHandler,
    HelpIntentHandler,
    DefaultHandler
  )
  .addErrorHandlers(myErrorHandler)
  .lambda();

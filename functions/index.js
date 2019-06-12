const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

exports.onAwardCreated = functions.firestore
  .document('cohorts/{cohortId}/awards/{awardId}')
  .onCreate(async (awardSnapshot, context) => {
    const award = awardSnapshot.data();

    const cohortId = context.params.cohortId;
    const cohortSnapshot = await admin.firestore()
      .doc(`cohorts/${cohortId}`)
      .get();
    const cohort = cohortSnapshot.data();

    const text = `${award.createdBy} has added a new ProGrammys award for ${cohort.name}\n*${award.name.toUpperCase()}*`;
    const attachments = [
      {
        fallback: 'Vote at https://the-programmys.web.app',
        actions: [
          {
            type: 'button',
            text: 'Vote ✔',
            url: 'https://the-programmys.web.app',
            style: 'primary'
          }
        ]
      }
    ];

    return axios.post(process.env.slackUrl, { text, attachments });
  });
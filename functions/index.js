const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const { buildMessage } = require('./slackMessageBuilder');

const slackURL = 'https://slack.com/api/chat.postMessage';

admin.initializeApp();

// set auth headers for slack requests
axios.interceptors.request.use((req) => {
  if (req.url.startsWith('https://slack.com')) {
    const token = process.env.SLACK_TOKEN;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

exports.onAwardCreated = functions.firestore
  .document('cohorts/{cohortId}/awards/{awardId}')
  .onCreate(async (awardSnapshot, context) => {
    const award = awardSnapshot.data();

    const { cohortId } = context.params;
    const cohortSnapshot = await admin.firestore()
      .doc(`cohorts/${cohortId}`)
      .get();
    const cohort = cohortSnapshot.data();

    const slackPayload = buildMessage(award, cohort);

    return axios.post(slackURL, slackPayload)
      .then(({ data }) => data);
  });

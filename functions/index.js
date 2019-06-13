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

exports.onVoteAdded = functions.firestore
  .document('cohorts/{cohortId}/awards/{awardId}/votes/{voteId}')
  .onCreate(async (voteSnapshot, context) => {
    const { cohortId, awardId } = context.params;
    const { voterId } = voteSnapshot.data();

    // update total vote count
    const awardRef = admin.firestore().doc(`cohorts/${cohortId}/awards/${awardId}`);
    const awardSnapshot = await awardRef.get();
    const award = awardSnapshot.data();
    const updatedCount = (award.totalVotes || 0) + 1;
    const awardUpdatePromise = awardRef.update({ totalVotes: updatedCount });

    // add awardId to users list of awards voted for
    const userRef = admin.firestore().doc(`users/${voterId}`);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data();
    const userVotes = user.votes || [];
    const updatedUserVotes = [awardId, ...userVotes];
    const userUpdatePromise = userRef.update({ votes: updatedUserVotes });

    return Promise.all([awardUpdatePromise, userUpdatePromise]);
  });

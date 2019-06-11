const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

    const message = `${award.createdBy} has added a new ProGrammys award for ${cohort.name}: ${award.name}`;
    console.log(message);

  });
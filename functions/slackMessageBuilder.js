exports.buildMessage = (award, cohort) => ({
  channel: cohort.slackChannel,
  text: 'New Award Added!',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `New Award added to *${cohort.name}* by _${award.createdBy}_`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:trophy: *${award.name}*\n${award.description}`,
      },
      accessory: {
        type: 'button',
        url: 'https://the-programmys.web.app', // Make this a more specific link
        style: 'primary',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Vote',
        },
      },
    },
  ],
});

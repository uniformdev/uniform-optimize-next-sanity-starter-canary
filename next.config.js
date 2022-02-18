module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA_UA_ID,
    segmentTrackingId: process.env.SEGMENT_ID,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

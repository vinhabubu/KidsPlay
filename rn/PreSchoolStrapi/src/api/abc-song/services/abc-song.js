'use strict';

/**
 * abc-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::abc-song.abc-song');

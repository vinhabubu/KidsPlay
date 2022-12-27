'use strict';

/**
 * numbers-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::numbers-song.numbers-song');

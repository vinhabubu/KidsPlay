'use strict';

/**
 * day-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::day-song.day-song');
